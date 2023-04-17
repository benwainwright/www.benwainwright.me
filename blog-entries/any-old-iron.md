---
slug: "any-old-iron"
date: "2023-04-17"
last_modified: "2023-04-17"
title: "Any old iron"
description: "Guidance on when you can and cannot use any in TypeScript"
published: false
---

If you are reading this article, I'm going to assume you've been working with TypeScript a little while, but you aren't an expert. I'm going to assume you are pretty comfortable with the syntax of TypeScript and that you are familiar with the concept of `any` and more specifically, you know that you probably shouldn't use it.

Its that last assumption I'm interested in in this article, so I'd like to help you dig into it in a little more detail. Specifically, I'd like to talk about

- What actually is `any`
- _Why_ you really shouldn't use `any` in _most_ circumstances, but in particular that doing so is actually **_more_ dangerous than using un-typed JavaScript**
- When it is actually _fine_ to use `any`
- What you might want to do when you are tempted to use `any` in situations when you shouldn't

Note that in this article, I use the word 'position' to refer to 'anywhere that a value can be assigned'. So that can mean a function argument, variable, or object property.

## What is `any`

The `any` type is a 'top type' - a type that is a _supertype_ of all other types. In practice, that means that anything can be assigned to something typed as `any`, regardless of its type. `any` shares this property with TypeScript's other top type `unknown`, meaning that none of the following result in type errors:

```TypeScript
const myString: unknown = 'a string';
const myNumber: unknown = 1;
const myAnyString: any = 'another string';
const myAnyNumber: any = 1;

// Note: the 'declare' keyword is a way of telling the TypeScript
// compiler that 'this does exist - honest!' without declaring the implementation
// I'm using it here because I don't really care about the implementation code for
// the sake of my examples. You probably won't use it in your production code though
declare const myUnknownFunction: (unknownArg: unknown) => void;
myUnknownFunction('foo')
myUnknownFunction(1)
myUnknownFunction({ foo: 'bar' })

declare  const myAnyFunction: (anyArg: any) => void;
myAnyFunction(1)
myAnyFunction('adam')
myAnyFunction({baz: 'string'})
```

`any` differs from `unknown` when looking at the assignment behaviour in the other direction. While a variable typed with `unknown` can only be assigned to a variable or parameter that is also typed with `unknown`, `any` has the special property of being able to also be assignable to any other position _regardless of the type of that position_. To apply this to some of my examples above:

```TypeScript
const myString: unknown = 'a string';
const myNumber: unknown = 1;

const myAnyString: any = 'another string';
const myAnyNumber: any = 1;

let bar: number = 2;

// Error! Type 'unknown' is not assignable to type 'number'
bar = myNumber

// No error
bar = myAnyString
```

You can see above that assigning `myNumber` to my explicitly typed variable `bar` has produced a type error.

If you think about it _this makes sense_ - my definition of a type annotation is simply a way of describing **what possible values can be assigned to a given position**. If we _don't know what kind of values can be assigned to a variable_ (because it is typed `unknown`), then assigning that variable to a position that is supposed to only ever be a `number` is a potential source of _unsoundness_.

## 'Soundness' and `any`

If you copy the code above into an editor and hover your cursor over `bar` on the final line, you'll see the type is still `number`, even though it is very clear from reading the code that the runtime value is going to be `'another string'`. When dealing with typed languages, a language can be described as 'sound' when the static type of every symbol is guaranteed to match the runtime type of that symbol. [TypeScript is not a completely 'sound' language](https://effectivetypescript.com/2021/05/06/unsoundness/) and although the details of this are a little outside of the scope of this article, you can see that we've effectively demonstrated at least one of the reasons why not above.

So why is it important that the code you write is 'sound'? Well that is because **TypeScript is designed to allow developers to make assumptions about what they can and cannot do with values** and if those assumptions do not hold, the circumstances can be catastrophic. What do I mean by that? To understand this better, lets drop back into JavaScript. You know what that means; its contrived example time!

```JavaScript
const toPascalCase = (pascalCase) => {
  if(typeof pascalCase !== 'string') {
    throw new Error('toPascalCase expects a string');
  }

  return pascalCase
    .split("-")
    .map((word) => `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)}`)
    .join("");
};
```

The above is a pretty standard utility function that takes a string separated by hyphens (e.g. "foo-bar") and converts it to PascalCase (e.g. "FooBar"). Note that since this is JavaScript, its always good practice to assume that people will misuse your code (this is known as 'defensive programming'), so I've done some runtime type checking at the start which ensures that the error that is thrown is as helpful as possible.
