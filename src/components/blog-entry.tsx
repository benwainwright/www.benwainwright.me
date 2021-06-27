import { FC, Fragment, createElement } from "react"
import { BlogEntryData } from "../pages/blog"
import rehypeReact from "rehype-react"
import HeadingTwo from "./heading-two"
import ParagraphText from "./paragraph-text"
import styled from "@emotion/styled"

const NewH1 = styled.h1`
  color: blue;
`

interface BlogEntryProps {
  entry: BlogEntryData
}

const BlogEntry: FC<BlogEntryProps> = props => {
  const renderAst = new rehypeReact({
    createElement,
    components: {
      h1: HeadingTwo,
      p: ParagraphText,
    },
  }).Compiler
  return <Fragment>{renderAst(props.entry.htmlAst)}</Fragment>
}

export default BlogEntry
