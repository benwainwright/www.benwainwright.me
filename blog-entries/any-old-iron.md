---
slug: "any-old-iron"
date: "2023-04-17"
last_modified: "2023-04-17"
title: "Any old iron"
description: "Guidance on when you can and cannot use any in TypeScript"
published: false
---

​
What is any?

If you've been an engineer working in Cinch a little while, you are probably pretty comfortable with the existance of any as a 'type we use when we aren't sure what type to use'. Hopefully you know by now that its really not a great idea to use it in production code, and if you haven't already got the relevant eslint rule configured or got 'strict' mode turned on in your tsconfig.json, well... you should.

But what actually is it and why is it a bad idea to use it? I wanted to write an article to address a common misconception I hear from other engineers quite a lot - that "using any is not a great idea (true) because you may as well be using un-typed JavaScript (well... not quite)".

In this article, I'm going to go into detail about the any type as well as the above assumption and try to help people understand it a bit better. I'm also going to follow this post up in the next few weeks with some guidance on things like

What do I actually do when I want to use any?
When is it actually ok to use any?
So let's get started.

What actually is any?
any is one of two 'top types' in TypeScript. That is to say - it is a type which is a supertype of all other types. In practice, that means that anything can be assigned to something which has been typed as any, regardless of its own type. any shares this property with TypeScript's other top type unknown, meaning that none of the following result in type errors:

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

declare const myAnyFunction: (anyArg: any) => void;
myAnyFunction(1)
myAnyFunction('adam')
myAnyFunction({baz: 'string'})

any differs from unknown when looking at the assignment behaviour in the other direction. While a variable typed with unknown can only be assigned to a variable or parameter that is also typed with unknown, any has the special property of being able to also be assigned to any other position regardless of the type of that position. To apply this to the above:

const myString: unknown = 'a string';
const myNumber: unknown = 1;

const myAnyString: any = 'another string';
const myAnyNumber: any = 1;

let bar: string = 'hello';

// Error! Type 'unknown' is not assignable to type 'string'
bar = myString

// No error
bar = myAnyNumber

You can see above that assigning myNumber to my explicitly typed variable bar has produced a type error. If you think about it this makes sense - my definition of a type annotation is simply a way of describing what possible values can be assigned to a given position. If we don't know what kind of values can be assigned to a variable (because it is typed unknown), then assigning that variable to a position that is supposed to only ever be a string is a potential source of unsoundness.

What does that mean? I'm glad you asked.

'Soundness' and any
When dealing with typed languages, a language can be described as 'sound' when the static type of every symbol is guaranteed to match the runtime type of that symbol. TypeScript is not a completely 'sound' language and although the details of this are a little outside of the scope of this article, you can see that we've effectively demonstrated at least one of the reasons why not above: if you copy the code above into an editor and hover your cursor over bar on the final line, you'll see the type is still number even though it is very clear from reading the code that the runtime value is going to be 'another string'.

So why is it important that the code you write is 'sound'? Because TypeScript is designed to allow developers to make assumptions about what they can and cannot do with values

To understand this better, let's drop back into JavaScript. You know what that means; its contrived example time!

const toPascalCase = (pascalCase) => {
  if(typeof pascalCase !== 'string') {
    throw new Error('toPascalCase expects a string');
  }

  return pascalCase
    .split("-")
    .map((word) => `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)}`)
    .join("");
};

This is a pretty standard utility function that takes a string separated by hyphens (e.g. "foo-bar") and converts it to PascalCase (e.g. "FooBar"). Note that since this is JavaScript, it's always good practice to assume that people will misuse your code (known as 'defensive programming') so I've done some runtime type checking at the start which ensures that the error that is thrown is as helpful as possible.

To write the above code in TypeScript, you'd probably do something like this:

const toPascalCase = (pascalCase: string) => {
  return pascalCase
   .split("-")
   .map((word) => `${word.slice(0, 1).toLocaleUpperCase()}${word.slice(1)}`)
   .join("");
};

The key thing to understand here is that because pascalCase is typed as string, I haven't done any runtime type checking because in most cases the TypeScript compiler provides me with a strong enough guarantee that I don't have to

Now let's think about our bar variable defined in the snippet above. Since TypeScript thinks its type is string, it will not prevent it from being passed into the function we have just written. We know however that this variable is not 'sound' (its runtime type is different from its static type) and so at runtime it is really a number. What happens when you try to pass this into our function?

let bar: string = 'foo-bar';
const myAnyNumber: any = 2;
bar = myAnyNumber
toPascalCase(bar)

Running this code results in the error message: TypeError: pascalCase.split is not a function; this is because toPascalCase() makes the reasonable assumption that bar: string is actually a string, and treats it like one by calling .split() on it. Since bar is actually a number, split doesn't exist and a much less helpful error is thrown. This leads me back to my key point. Using any when you don't know how to type something is actually worse than using untyped JavaScript because most TypeScript code is written with the assumption that types are sound.

So what do I actually do when I want to use any
Well - spoilers - I'm going to do a more detailed blog post on this subject coming soon, so I'm going to ask you to wait and see. But until that post drops, I'd encourage you to remember that you are (still) working in an environment full of loads of incredibly talented people who want to help. Please don't use any in production, and if you think you can't find an alternative, try reaching out. Not sure who to ask? Feel free to reach out to me directly (while I'm still here) or ask someone in the TypeScript community of Practice channel on Teams.

​
