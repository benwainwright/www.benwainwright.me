---
slug: "a-closer-look-at-index-access-types"
date: "2021-08-06"
last-modified: "2021-08-06"
title: "A Closer Look at Index Access Types"
description: "A followup from a question I did in a recent talk about why an
array type indexed with the type 'number' resolves to a union type"
published: true
---

I recently gave a talk at work about some advanced TypeScript techniques (which I imagine I'll blog about at some point). During that talk, I used a lesser
known feature called [Index Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html), allowing you to index a type with another type to get back a further type. I was indexing a readonly array type that was limited to a particular set of values with the type `number` in order to produce a union type. The question that came back was more or less... "wha...a..t did you just do?". Its an interesting trick, and one that provides a helpful illustration of what a type system actually is.

Here is a simplified version of the code in question:

```TypeScript
type TupleOfKeys<T> = ReadonlyArray<keyof T>          
// Keyof T produces a union type containing all the keys of T

type UnionOfKeys<T extends ReadonlyArray[]> = T[number]
// Produces a union type containing all the possible array entries

type LetsGetThoseEntries = UnionOfKeys<["foo", "bar">
// Type is "foo" | "bar"
```

To understand **why** this works, it helps first to keep in mind exactly what a
type is. My personal definition is that a type is a **description of all the
possible values that are permitted to be assigned to a given property, variable or
function argument**. Note that in this post, I use the word "position" as a
shorthand for property, variable or function argument.

This ranges from the incredibly specific, to incredibly general. For example: `1` (a type which can only ever be assigned the numeric value 1), `1 | 2` (a type which can be assigned the values 1 or 2 and nothing else), all the way through to `number` (a type which represents all the legal values that a number can take in JavaScript) and more complex types representing objects.

So keeping this in mind, when I'm indexing type `A` with type `B`
(so `A[B]`), what I'm really asking for is **all the possible values I might get
back if I index a position with type `A` with any of the values that might be
represented by type `B`**.

Still confused? Lets break this down with a simple example. Consider the
following type:

```TypeScript
type SimpleArray = [
  1,
  2,
  3
]
```

This type represents a fixed length array of three items only (sometimes known
as a 'tuple type'), where the three values **must** be the numbers 1, 2 or 3.

What happens if I index a value where the type declares its second item must be the number 2, with a value whose type declares it can only ever be the number 1? Well the only possible result in this case is 2, so here, the type of `SimpleArray[1]` is simply `2`
This looks like a pointless example. But now lets try indexing it with the type `1 | 2`. If the index value can be one of the two values ‘1’ or ‘2’, then we know we can get back either the numbers ‘1’ or ‘2’ and nothing else. Following the same logic as above, the type of `SimpleArray[1 | 2]` must be `2 | 3`.

We can then take this a step further and infer that the type of `SimpleArray[number]` is `1 | 2 | 3`, because if you index something typed with `SimpleArray` with a variable that can represent any valid number, then the possible values you can get back are either 1, 2 or 3. So the type is `1 | 2 | 3`
