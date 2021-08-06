---
slug: "hoist-away"
date: "2021-07-10"
last_modified: "2021-07-10"
title: "Hoist Away"
description: "An investigation into the differing hoisting behaviour ts-jest
compared to babel-jest"
published: false
---

This week I was working on a TypeScript project with a colleague and we hit upon
some code that did something unusual while looking at some of the tests. The
pattern was in numerous tests and it went something like this:

```TypeScript
jest.mock("dependency", () => ({
  someMockFunction: () => {}
}))

const mockFunction = jest.fn();

jest.doMock("otherDependency", () => ({
  thing: jest.fn(() => ({
    method: mockFunction
  }))
}))
```
