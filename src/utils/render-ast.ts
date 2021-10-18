import { createElement } from "react"
import { unified } from "unified"
import HeadingThree from "../components/heading-three"
import HeadingTwo from "../components/heading-two"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"
import rehypeReact from "rehype-react"

const processor = unified().use(rehypeReact, {
  createElement,
  components: {
    h1: HeadingTwo,
    h2: HeadingThree,
    p: ParagraphText,
    li: ListItem
  }
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderAst = (ast: any): JSX.Element => {
  return processor.stringify(ast) as JSX.Element
}
