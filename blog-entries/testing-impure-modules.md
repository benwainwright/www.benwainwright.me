---
slug: "testing-impure-modules"
date: "2021-10-15"
last-modified: "2021-10-15"
title: "Testing impure modules"
description: "Testing 'impure' JavaScript modules in NodeJS is tricker than you
might expect. This post takes you through why its difficult, and how to do it
correctly"
published: false
---

In a node application, a single JavaScript file forms a self-contained unit known as a 'module'.  When executing your program, each one of these modules is executed and loaded into memory each time you call `require` (for commonjs) or `import` (for ES6 modules). 

Fans of functional programming will be familiar with the idea of 'pure functions', that is "functions that don't have any side effects". We use this terminology in a similar way when referring to JavaScript modules, and it turns out that this is an important concept that you can use to make your code simpler and easier to test.

Note that most of my sample code is written in TypeScript as that's the language I mostly work in. Where I refer to 'execution' of a `.ts` file, it should be understood that I'm really referring to execution of the transpiled JavaScript. The syntax for TypeScript is closer to ES6, but everything in this article also applies to both `commonjs` and `es6` module systems. For testing, I use [jest](https://github.com/facebook/jest) - the problems  I'm discussing here apply equally to other testing frameworks, but you might need to use different mechanisms to get around them.

# What is a pure module?

A pure module is a JavaScript module that *only exports functions and variables* but has no actual logic of its own. For example:

```TypeScript
// pure-uppercase.ts
const uppercaseFirstLetter = (name: string) => `${name.substring(0, 1).toUpperCase()}${name.slice(1)}`

export uppercaseFirstLetter
```

this module when imported will define a single function, then export the reference to that function. It *doesn't actually do anything until the function itself is called*.

Here is an example of an _impure_ module that I wrote recently. 

```TypeScript
// impure-set-tag.ts
import tracer from 'third-party-tracing-library';

tracer.init();

export const setTag = (tagName: string, tagValue: unknown) => {
  const span = tracer.scope().active();

  if (!span) {
    throw new Error('Active span not available');
  }

  span.setTag(tagName, tagValue);
};
```

Note the use of `tracer.init()` at the top level of the module. This module is *impure* because the simple act of importing it will cause `tracer.init()` to be executed which very clearly has the side effect of initialising the tracer.

In this particular case, there was a good reason why the module was written in this way as I'm taking advantage of the very mechanism that often trips people up in this area. However; in this article I will show you that _in general_, unless you know what you are doing, avoiding impure modules like the plague will give you a happier life.

# Import caching

Modules in node are singletons; that is to say that because modules are *cached* by the runtime (using the file path as the cache key), the modules themselves are executed *once and only once* at the point of import. The runtime then stores the results of that execution in the cache and delivers it any time a further import is made for that file path.  Lets look at this in action

First the pure module. Consider the following program:

```TypeScript
// program.ts
import "./file-one"
import "./file-two"
```

```TypeScript
// file-one.ts
import { uppercaseFirstLetter } from "./pure-uppercase" // execution

console.log(uppercaseFirstLetter('foo'))
```

```TypeScript
// file-two.ts
import { uppercaseFirstLetter } from "./pure-uppercase" // no-execution

console.log(uppercaseFirstLetter('bar'))
```

When you execute `program.ts` from the command line, the following happens

* `./file-one` is imported. There are no cached executions, so `./file-one` is loaded and executed. This first imports a function from `./pure-uppercase`. Since that module isn't in our cache yet it is executed, and so defines and exports the function which is then used to log to the console.
* `./file-two` is imported. There are no cached executions, so `./file-two` is loaded and executed. Again, this imports a function from `./pure-uppercase`. This time the result *is* in our cache, so we reuse the same function to log a message to the console with executing `./pure-uppercase` again.


While interesting, this is fairly trivial since the caching mechanism doesn't impact the behaviour of the application. Lets now try again with our impure module. Consider the following program:

```TypeScript
// program.ts
import "./file-one"
import "./file-two"
```

```TypeScript
// file-one.ts
import { setTag } from "./impure-set-tag"

setTag('foo', 'bar')
```

```TypeScript
// file-two.ts
import { setTag } from "./impure-set-tag"

setTag('bar', 'baz')
```

When you execute `program.ts` from the command line, the following happens


* `./file-one` is imported. There are no cached executions, so `./file-one` is loaded and executed. This imports a function from `./impure-set-tag`. Again, this is not in the cache so it is executed. As part of *this* execution, a `tracer` is imported from `third-party-tracing-library`, and `tracer.init()` is called. Finally, we define an export a function that captures a reference to `tracer` within its scope.
* `./file-two` is imported. There are no cached executions, so `./file-two` is loaded and executed. Again, this imports a function from `./impure-set-tag`. The result is already in our cache so instead of executing the module a second time the already defined `setTag` function is returned.

Because this module is impure, there are two interesting consequences - regardless of how many times you import/call `setTag`:

1. The `setTag` function is always acting on the same instance of `tracer`
2. `tracer.init()` will only ever be called once

In the case of our distributed tracing library, this is useful, as we only
*want* the tracer to be initialised once. Writing modules in this way however,
has consequences for testing which we will explore in the next section.

# Testing Impure Modules

Since the above single initialisation behavior sounds useful, lets test it. Consider the following
test

```TypeScript
import tracer, { Scope } from "third-party-tracing-library"

import { mock } from 'jest-mock-extended';
import { mocked } from 'ts-jest/utils';

import { setTag } from "./impure-set-tag"

jest.mock("third-party-tracing-library")

beforeEach(() => jest.resetAllMocks())

test("the impure setTag function only calls tracer.init method once", () => {
  const mockScope = mock<Scope>();
  mockScope.active.mockReturnValue(mock());

  mocked(tracer.scope).mockReturnValue(mockScope);

  setTag('foo', 'bar');
  setTag('baz', 'bash');

  expect(mocked(tracer.init)).toHaveBeenCalledTimes(1);
})
```

This seems like it should work... except it doesn't.

```
Expected number of calls: 1
Received number of calls: 0
```

Let's walk through what is happening here.

* Before `jest` executes the test, it first transpiles the code with either
  [babel-jest](https://www.npmjs.com/package/babel-jest) or [ts-jest](https://www.npmjs.com/package/ts-jest) depending on your configuration. In either case, this will result in the call to `jest.mock()` being moved ('hoisted') to the top of the file
* Consequently when the code is executed, the first thing that happens is
  `jest.mock('third-party-tracing-library')` automagically replaces any import
  of `third-party-tracing-library` with a `jest.fn()` instances (mock function), with all known
  properties replaced with further `jest.fn()` instances.
* When execution reaches `import { setTag } from "./impure-set-tag`, this
  immediately executes the code at the top level of the module. This calls
  `import tracer from "third-party-tracing-library"`, which returns the mock
  created above. `tracer.init()` is executed; since this is a mock function, it
  increments its call counts by one.
* A few lines later, we call `beforeEach(() => jest.resetAllMocks())` which
  resets the state of all jest automocks.
* The test then executes, expecting the call count to be 1 after calling `setTag` twice. Because we reset the mock state above, however, the call count is 0.

The problem here is that we are actually trying to test a behaviour that occurs
*at the point of import*, which is outside of the test. We could
of course change our `beforeEach` to an `afterEach` so that we don't reset that
state before the test runs, but we shouldn't have to do that; resetting mock state before each test is a best practise, and this solution is easily broken - if I add a second test before the one I've written, the state will get reset and the same issue will appear.

## Move the import into the test

So lets try to move the behaviour under test *into* the test. We can do this by
removing the original import, making the test callback asynchronous and importing the module dynamically
inside the test, like this:

```TypeScript
// ... stuff

test("the impure setTag function only calls tracer.init method once", () => {
  const { setTag } = await import("./impure-set-tag")

  // ...stuff
})
`````

Congratulations, you now have a passing test!

While this appears to work, there is a big problem with it. We can
demonstrate them by being diligent engineers and adding some more test coverage.
Lets start by adding the following test *above* our existing test (order is
important here).

```TypeScript
test('the impure setTag function if you pass in an empty string for the name of a tag', async () => {
  const { setTag } = await import('./impure-set-tag');

  expect(() => setTag('', 'bar')).toThrow();
});
```

Go ahead and change the implementation to make that test pass. Once you do, you'll find your *original* test
is failing again in exactly the same way.

If you think back to the section on
module caching, you'll understand why. When the first test executes it imports
`./impure-set-tag` which executes the module and calls `tracer.init()`. Since
this is a mock function, its call count is incremented by one. Before
our next test executes however, we reset all mock state so the count goes back to zero. In the next test,
`./impure-set-tag` **does not get executed again** which means `tracer.init()`
does not get called again, and thus the expectation fails.

## Clear the module cache

To resolve this problem, you need to ensure there is a fresh module cache for
every test. `jest` provides us with two APIs to do this

* `jest.resetModules()` - a single function call similar to `jest.clearMocks()`
* `jest.isolateModules()` - takes a callback function. When this function is
  executed, everything inside its scope gets a fresh module cache

If every test in the module needs a fresh cache, `jest.resetModules()` should
go into a `beforeEach` hook. If you only need this kind of isolation for a
single test, I'd encourage use of `jest.isolateModules()`, since it is more
explicit and calling `jest.resetModules()` half way through a test file may
cause surprising behaviour for subsequent tests.

Note that
`jest.isolatedModules()` _cannot_ accept an asynchronous callback which means
if your test is asynchronous (as ours is), you need to use `jest.resetModules()`. In our current
example, you could also overcome this by replacing `await import()` with `require()` (which is synchronous)

Lets try resetting the cache. Go ahead and add `beforeEach(() => jest.resetModules())` at the start of your test module and run jest. Settle down and watch as your tests... fail... again. 

## Move automocks

Lets look again at the test file and try to understand what is happening

```TypeScript
import tracer, { Scope } from 'third-party-tracing-library';

// ...imports

jest.mock('third-party-tracing-library');

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

test('the impure setTag function throws an error if you pass in an empty string for the name of a tag', async () => {
  const { setTag } = await import('./impure-set-tag');

  // ...stuff
});

test('the impure setTag function only calls tracer.init method once', async () => {
  const { setTag } = await import('./impure-set-tag');

  // ...call function

  expect(mocked(tracer.init)).toHaveBeenCalledTimes(1);
});
```

Walking through (hopefully for the last time) the relevant parts, we discover the following:

* First, because of hoisting, 'third-party-tracing-library' is automocked
* Next, the mocked `tracer` is imported from `third-party-tracing-library`
* We then call `jest.resetAllModules()`, which resets the module cache before
  each test
* In each test we import `./impure-set-tag`, which performs a fresh execution
  each time due to the reset
* Also because of the reset, `third-party-tracing-library` **is no
  longer automocked** and so returns the *real* tracer. This means that the
  mocked `tracer` that was returned earlier doesn't get any calls

To solve this problem, we need to perform automocking *inside* the test itself.
*Deep breath*... because we are doing this we cannot use `jest.mock()` as this is designed to be
used at the top level of a module. Instead we use `jest.doMock()` which 
doesn't get hoisted, and so we need to do it *before* the import, not after. Since you
are performing automocking *inside* the test, you also need to import the mock
`tracer` inside the test in order to set an expectation on it.

This is what the
final setup looks like:

```TypeScript
import { Scope } from 'third-party-tracing-library';

// ...imports

beforeEach(() => {
  jest.resetAllMocks();
  jest.resetModules();
});

// .. other test(s)

test('the impure setTag function only calls tracer.init method once', async () => {
  jest.doMock("third-party-tracing-library");
  const { default: tracer } = await import("third-party-tracing-library");
  const { setTag } = await import('./impure-set-tag');

  const mockScope = mock<Scope>();
  mockScope.active.mockReturnValue(mock());

  mocked(tracer.scope).mockReturnValue(mockScope);

  setTag('foo', 'bar');
  setTag('baz', 'bash');

  expect(mocked(tracer.init)).toHaveBeenCalledTimes(1);
});
```

## Final Thoughts

To summarise, if you want to test module level 'impure' logic, you need to

* Move the import and all automocking into the test and
* Ensure the module cache is fresh for each test

There are good reasons to write impure modules, as I have done. But I would
recommend not doing so unless you specifically want to make use of the module
caching mechanism, or the 'impure' behaviour is trivial enough that you are
happy not testing it.

As you have already seen, the resulting tests are verbose and more complicated
than they need to be considering the simplicity of the behaviour under test. Mistakes are very
easy to make, and they result in subtle and hard to understand failures
that eat up whole evenings.

Since you have read this post, you know how to handle them properly. But many
engineers don't and you can make their lives much easier in the first place by
favouring pure modules by default.
