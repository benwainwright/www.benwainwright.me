---
slug: "type-erasure-a-practical-example"
date: "2021-10-14"
last-modified: "2021-10-14"
title: "Type Erasure: A Practical Example"
description: "A writeup of some troubleshooting I did with a colleague that demonstrates one of the trickier concepts to get your head around in TypeScript"
published: false
---

A colleague asked for some help today with a piece of code they were working on. This is a minimal version of the test that was failing:

```TypeScript
// code.spec.ts
test("a test", async () => {
   const mockError: AxiosError = {
      message: 'Oh, noes!'
      // some other properties
   }
   
   aMockedDependency.mockRejectedValue(mockError)

   await functionUnderTest()
})
```
His test was failing, and he couldn't understand why. When looking at the implementation code, he showed me something like the below snippet and stepped through it with the VSCode debugger. An error was being thrown, but the type guard designed to check whether the error was *actually* an error or not (a sensible thing to do by the way, since it is perfectly legal JavaScript to throw something completely unexpected, like `throw NaN`)

```TypeScript
// code.ts
import aMockedDependency from "dependency"
import { isError } from "another-dependency"

export const functionUnderTest = () => {
   // some code
   try {
      aMockedDependency()
   } catch(error) {
      if(isError(error)) {
         // even more code
      }
   }
   // even more code
}
```

In explaining this to me he noted that he'd "tried casting it to Error". If you know TypeScript well, this should raise an eyebrow, for a reason I'll come to at the end.

The next thing I did was to ask my colleague if I could see the definition of `isError`. This came from an internal third party library and was defined like so:

```TypeScript
export const isError = (thing: unknown): thing is Error => thing instanceof Error;
```

The first thing to note is that this isn't a very useful function; the `instanceof` operator is [already going to narrow the type](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing) and so wrapping it in a function really only serves to obfuscate an operator that is a fundamental part of the language with well understood and documented semantics, all for the sake of about 7 fewer keystrokes.

The more interesting part of this is the apparent misapprehension here. My colleague had not understood something that many developers also struggle with when learning TypeScript; that is to say that **all type annotations are completely removed before any code is executed** (more formally as "Type Erasure"). In practice, that means that in the test above, what is actually executed by the node runtime is something akin to this:

```TypeScript
// code.spec.js
test("a test", async () => {
   const mockError = {
      message: 'Oh, noes!'
      // some other properties
   }
   
   aMockedDependency.mockRejectedValue(mockError)

   await functionUnderTest()
})
```

and 'isError' becomes this

```TypeScript
export const isError = (thing) => thing instanceof Error;
```

Consequently, what my colleague was trying to do boils down to the question 'is an object literal an instance of `Error`?'

```TypeScript
const mockError =  { 
  message:  'Oh, noes!'
}

if(mockError instanceof Error) {
   // Do something
}
```

The answer to which is very clearly 'no'.

The solution, for anyone interested, was to define a local es6 `class` within the test that extends `Error` (so `class MockError extends Error {}`), instantiate it, and return it from the mock.

# What's the key takeaway?

When writing TypeScript, any part of your code that forms a "type annotation" will be erased at runtime and so **cannot possibly change the behaviour of your code**. This means that this:


```TypeScript
const foo: string | number = 'This is a string but might also be a number'
const iReallyShouldntDoThisAnywayBecauseTypeAssertionsAreUsuallyBad = { thing: 'bar' } as MyOtherType
const foo = <T>(bar: string, arg: T): boolean => true
foo<T>(bar, arg)
class Foo<T> {}
```

will always be executed as

```JavaScript
const foo = 'this is a string but might also be a number'
const iReallyShouldntDoThisAnywayBecauseTypeAssertionsAreUsuallyBad =  { thing:  'bar'  }
const foo = (bar, arg) => true
foo(bar, arg)
class Foo {}
```

If you can get your head around this, and have a clear idea of which syntactic elements are 'type' annotations and which are not, it will help you understand two fundamental truths about TypeScript

* Modifying a type definition or annotation is **always** a safe operation in that it will **never change the behaviour of your application**. What it *might* do is reduce or (improve) your ability to spot *future* errors at build time.
* If your tests are failing, changing type definitions or annotations (such as the type cast referred to above) is not ever going to make them pass (unless the failures are type errors, which are easily spotted because they are always provided with a `TS-<number>` error code),  again because types never change the behaviour of your application.

# Recommended Reading

* [TypeScript Docs -
  Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
* [TypeScript FAQ](https://github.com/Microsoft/TypeScript/wiki/FAQ)
