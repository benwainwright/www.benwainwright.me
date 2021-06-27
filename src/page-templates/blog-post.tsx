import { FC, createElement } from "react"
import Layout from "../components/layout"
import { BsFillStarFill } from "react-icons/bs"
import styled from "@emotion/styled"
import HeadingOne from "../components/heading-one"
import HeadingTwo from "../components/heading-two"
import ParagraphText from "../components/paragraph-text"
import rehypeReact from "rehype-react"

interface BlogPostProps {
  pageContext: {
    entry: {
      htmlAst: any
      frontmatter: {
        date: string
        slug: string
        title: string
      }
    }
  }
}

const Container = styled.main`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  padding: 0 2rem 0 2rem;
  @media (min-width: 1400px) {
    margin: 0 auto;
    width: 70%;
  }
`

const DateBox = styled.div`
  font-family: "Milliard";
  align-self: flex-end;
  line-height: 2rem;
  font-size: 1.2rem;
  margin: 0 0 0 1rem;
  font-style: italic;
`

const HeadingContainer = styled.div`
  margin: 0 0 0 0.5rem;
  flex-grow: 999;
`

const ContentContainer = styled.div`
  margin: 1rem 0 0 0;
`

const BlogPost: FC<BlogPostProps> = props => {
  const renderAst = new rehypeReact({
    createElement,
    components: {
      h1: HeadingTwo,
      p: ParagraphText,
    },
  }).Compiler
  return (
    <Layout>
      <Container>
        <HeadingOne>
          <BsFillStarFill />
          <HeadingContainer>
            {props.pageContext.entry.frontmatter.title}
          </HeadingContainer>
          <DateBox>{props.pageContext.entry.frontmatter.date}</DateBox>
        </HeadingOne>
        <ContentContainer>
          {renderAst(props.pageContext.entry.htmlAst)}
        </ContentContainer>
      </Container>
    </Layout>
  )
}

export default BlogPost
