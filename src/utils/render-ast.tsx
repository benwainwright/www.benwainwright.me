import { createElement, ReactNode } from "react"
import { unified } from "unified"
import rehypeReact from "rehype-react"
import { Heading, ParagraphText, ListItem, Anchor } from "../components"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const processor = unified().use(rehypeReact, {
  createElement,
  components: {
    h1: (props: { children: ReactNode }) => (
      <Heading level={2}>{props.children}</Heading>
    ),
    h2: (props: { children: ReactNode }) => (
      <Heading level={3}>{props.children}</Heading>
    ),
    h3: (props: { children: ReactNode }) => (
      <Heading level={4}>{props.children}</Heading>
    ),
    p: ParagraphText,
    li: ListItem,
    a: Anchor,
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderAst = (ast: any): JSX.Element => {
  return processor.stringify(ast) as JSX.Element
}
