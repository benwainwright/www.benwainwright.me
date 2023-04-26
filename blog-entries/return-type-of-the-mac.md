---
slug: "return-type-of-the-mac"
date: "2023-04-26"
last_modified: "2023-04-26"
title: "Return type of the Mac"
description: "Implicit or explicit return types in TypeScript. What is the right
thing to do?"
published: false
---

If you are reasonably familiar with TypeScript you'll know that _except in certain situations_, return types in TypeScript are optional - you can choose to explicitly specify them or to leave them out. So what is the _right_ thing to do? As with most of these kind of questions, the answer is "it depends". So let's explore that...

## Implicit Return Types

In TypeScript, return types are optional because in most cases the compiler is smart enough to work out ("infer") what the return type will be. Let's look at some examples:

```TypeScript
const myFunc = () => {
   console.log('hello world!')
}

const myStringFunc = () => {
  return "foobar" as const
}

const baz = (arg: boolean) => {
  if(arg) {
    return "foo"
  }

  return "baz"
}
```

If you put the above code into an editor, try hovering over each of the functions in turn. You'll see that TypeScript has "inferred" the following types

- `() => void` - A function that returns `void` (ie - doesn't return anything)
- `() => "foobar"` - A function that will only ever return the literal string `"foobar"`
- `(arg: boolean) => "foo" | "baz"` - A function with a single boolean argument that can only ever return the literal string `"foo"` or the literal string `"baz"`

This makes sense; you do not need to execute the last function to be absolutely certain that _whatever happens at runtime, the return value for this function will either be the string "foo" or the string "baz" and nothing else_. This is a cast iron guarantee and until the code changes it will always be the case.

If you assign the return value from the second and third function to variables, you'll find that those variables will be assigned the type that has been inferred as the return type of the function. So taking the last example:

```TypeScript
const baz = (arg: boolean) => {
  if(arg) {
    return "foo"
  }

  return "baz"
}

const returnVal = baz(true)
```

If you hover over `returnVal` you'll see it is typed as `"foo" | "baz"`.

So given this knowledge; what happens to the type of `returnVal` if I change the implementation code of `baz()`? Let's have a look:

```TypeScript
const baz = (arg: boolean) => {
  if(arg) {
    return 1
  }

  return "baz"
}

const returnVal = baz(true)
```

The above is a modified version of `baz()`. If you hover your mouse over `returnVal` now you'll see that the type has been inferred as `1 | "baz"` (a value that represents either the literal number `1` or the literal string `"baz"`). This is the key take away from this section - _when you do not specify return types, changes to implementation code can impact types **outside** of your function implementation._ Hold on to that thought, we'll be needing it later.

## Explicit return types

As an alternative to the above, if we want to we can explicitly specify the return type of a function. So let's use the same examples as the ones we have used above, but this time we'll specify the return type:

```TypeScript
const myFunc = (): void => {
   console.log('hello world!')
}

const myStringFunc = (): "foobar" => {
  return "foobar"
}

const baz = (arg: boolean): "foo" | "baz" => {
  if(arg) {
    return "foo"
  }

  return "baz"
}
```

Note that I've chosen to use the literal type `"foo" | "baz"`, but I could have also used the type `string` (since the values `"foo"` and `"baz"` are both assignable to `string`). What's really interesting here (honest!), is what happens when you change the implementation code. Let's try it:

```TypeScript
const baz = (arg: boolean): "foo" | "baz" => {
  if(arg) {
    // Error: Type '1' is not assignable to type "foo" | "baz"
    return 1
  }

  return "baz"
}

const returnVal = baz(true)
```

Now we've specified an explicit return type, changing the implementation code has produced a type error _inside the function_.

## So what should I choose?

To summarise the above - if you use an _implicit_ return type, the compiler "infers" the return type, and so changes in implementation code **_can_ _change types outside the function._** If you use an _explicit_ return type, types outside the function remain static, but changes in implementation code **_can produce errors inside the function._**

### When you control everything

When you control _all_ of the impacted code, implicit return types are almost always the right thing to do. This is because usually when you change implementation code in such a way that the return type of a function changes, _that is what you meant to do_. When a variable outside of your function changes its type and this results in cascading build errors _elsewhere in the application,_ this is generally helpful because it tells you _exactly where to make changes that you need to make to stop the application being broken_.

### API Boundaries

When the function you are writing is part of an API boundary (that is - it's going to be used by someone else), you should consider using _explicit_ return types. This is because generally, it is good practice to keep APIs stable or to at least be very deliberate about changes. If you are the maintainer of a package library and you export a function that calls an API and then returns a data object, consumers of your library are going to have a hard time if the shape of that data object suddenly changes when you export a new version. It's worth noting that this consideration also applies to shared code in monorepo contexts.

To use a concrete example from my work, there is a widely used function in the frontend that has the job of interpolating strings with react components. This function does the right thing and declares an _explicit_ return type. If its return type were _implicit_, and I were to make changes to the implementation that resulted in the compiler inferring a different return type, because it is used _all_ over the website, I would likely find myself in a situation where I have to change _hundreds_ of files owned by dozens of different teams.

## Final Thoughts

There are a few other cases; for example - when you are writing recursive functions (which **must** have an explicit return type) or when you want your function to return a type that is broader or narrower than the inferred type. In these cases, however, the compiler will make it pretty clear exactly what you need to do. As always for this kind of post, the right choice is always the one that _works best for your use-case_. If you aren't sure or you'd like to ask about another TypeScript related question, please feel free to ask for help - either by replying to any of my posts, emailing me directly.
