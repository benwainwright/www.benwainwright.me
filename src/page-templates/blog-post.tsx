import { FC, createElement } from "react"
import Layout from "../components/layout"
import { BsFillStarFill } from "react-icons/bs"
import styled from "@emotion/styled"
import HeadingOne from "../components/heading-one"
import HeadingTwo from "../components/heading-two"
import HeadingThree from "../components/heading-three"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"
import rehypeReact from "rehype-react"
import Seo from "../components/seo"

interface BlogPostProps {
  pageContext: {
    entry: {
      htmlAst: any
      frontmatter: {
        published: boolean
        date: string
        slug: string
        title: string
        description: string
      }
    }
  }
}

const Container = styled.div`
  padding: 0 2rem 0 2rem;
  @media (min-width: 1400px) {
    margin: 0 auto;
    width: 70%;
  }
`

const DateBox = styled.div`
  font-family: "Milliard";
  align-self: flex-end;
  font-weight: lighter;
  line-height: 2rem;
  font-size: 2rem;
  white-space: nowrap;
  margin: 0 0 0 1rem;
`

const UnPublishedNotice = styled.p`
  font-family: "Milliard";
  @media (max-width: 800px) {
    line-height: 1.7rem;
  }
  font-size: 1.15rem;
  line-height: 2rem;
  font-weight: bold;
  border-radius: 4px;
  padding: 0.5rem;
  border: 1px solid black;
  color: red;
`

const HeadingContainer = styled.div`
  margin: 0 0 0 0.5rem;
  flex-grow: 999;
  white-space: nowrap;
`

const ContentContainer = styled.div`
  margin: 1rem 0 0 0;
`

const BlogPost: FC<BlogPostProps> = props => {
  const isPublished = props.pageContext.entry.frontmatter.published
  const renderAst = new rehypeReact({
    createElement,
    components: {
      h1: HeadingTwo,
      h2: HeadingThree,
      p: ParagraphText,
      li: ListItem
    }
  }).Compiler
  return (
    <Layout>
      <Container>
        <Seo
          title={props.pageContext.entry.frontmatter.title}
          description={props.pageContext.entry.frontmatter.description}
        />
        <HeadingOne>
          <BsFillStarFill />
          <HeadingContainer>
            {props.pageContext.entry.frontmatter.title}
          </HeadingContainer>
          <DateBox>{props.pageContext.entry.frontmatter.date}</DateBox>
        </HeadingOne>
        <ContentContainer>
          {!isPublished && (
            <UnPublishedNotice>
              This post has not yet been published. Please do not share the URL
              without my permission.
            </UnPublishedNotice>
          )}
          {renderAst(props.pageContext.entry.htmlAst)}
        </ContentContainer>
      </Container>
    </Layout>
  )
}

export default BlogPost
