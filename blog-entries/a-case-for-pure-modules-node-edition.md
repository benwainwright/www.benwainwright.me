---
slug: "a-case-for-pure-modules-node-edition"
date: "2021-10-14"
last-modified: "2021-10-14"
title: "A case for pure modules - node edition"
description: "An article that explains why you should try to always use pure
modules in node applications where possible"
published: false
---

In a node application, a single JavaScript file forms a self-contained unit known as a 'module'.  When executing your program, each one of these modules is executed and loaded into memory each time you call `require` (for commonjs) or `import` (for ES6 modules). 

Fans of functional programming will be familiar with the idea of 'pure functions', that is "functions that don't have any side effects". We use this terminology in a similar way when referring to JavaScript modules, and it turns out that this is an important concept that you can use to make your code simpler and easier to test.

Note that most of my sample code is written in TypeScript as that's the language I mostly work in. Where I refer to 'execution' of a `.ts` file, it should be understood that I'm really referring to execution of the transpiled JavaScript. The syntax for TypeScript is closer to ES6, but everything in this article also applies to both `commonjs` and `es6` module systems.

## What is a pure module?

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

## Import caching

It is important to understand that modules in node are singletons. That is to say that because modules are *cached* by the runtime (using the file path as the cache key), the modules themselves are executed *once and only once* at the point of import. The runtime then stores the results of that execution in the cache and delivers it any time a further import is made for that file path.  Lets look at it in action

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

* `./file-one` is imported. There are no cached execution results, so `./file-one` is loaded, executed and the results are stored in the cache
	* As part of this execution, `./pure-uppercase` is imported. There are no cached execution results, so `./pure-uppercase.ts` is loaded, executed and the results are stored in the cache. In this instance, `./pure-uppercase` does nothing other than define a function
	* This cache entry is returned by the import statement, and the function that was defined is then utilised to log a message to the console
* `./file-two` is imported. There are no cached execution results, so `./file-two` is loaded, executed and the results are stored in the cache
	* As part of this execution, `./pure-uppercase` is imported. This time, we *do* have a cache entry, so `./pure-uppercase.ts` is not loaded/executed again.
	* Instead, the same function that was defined and stored in the cache in the first call is returned again. This function is then used to log a message to the console.

Now this seems interesting but fairly trivial; ultimately the cache isn't having an effect on the behaviour of the application. Let's now try again with our impure module.





