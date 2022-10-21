import { FC } from "react"
import Layout from "../components/layout"
import { BsFillStarFill } from "react-icons/bs"
import styled from "@emotion/styled"
import HeadingOne from "../components/heading-one"
import Seo from "../components/seo"
import Comments from "../components/comments"
import { Comment as CommentType } from "../comments/utils/comment"
import { renderAst } from "../utils/render-ast"
import { getStyles } from "../utils/get-styles"
import * as styles from "./blog-post.module.css"

interface BlogPostProps {
  pageContext: {
    entry: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      htmlAst: any
      frontmatter: {
        published: boolean
        date: string
        slug: string
        title: string
        description: string
      }
      fields: {
        comments: CommentType[]
      }
    }
  }
}

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
  margin: 1rem 0 1rem 0;
`

const BlogPost: FC<BlogPostProps> = props => {
  const isPublished = props.pageContext.entry.frontmatter.published

  const { pageContainer } = getStyles(styles, "pageContainer")

  return (
    <Layout
      title={props.pageContext.entry.frontmatter.title}
      description={props.pageContext.entry.frontmatter.description}
    >
      <div className={pageContainer}>
        <header>
          <HeadingOne>
            <BsFillStarFill />
            <HeadingContainer>
              {props.pageContext.entry.frontmatter.title}
            </HeadingContainer>
            <DateBox>{props.pageContext.entry.frontmatter.date}</DateBox>
          </HeadingOne>
        </header>
        <ContentContainer>
          {!isPublished && (
            <UnPublishedNotice>
              This post has not yet been published. Please do not share the URL
              without my permission.
            </UnPublishedNotice>
          )}
          {renderAst(props.pageContext.entry.htmlAst)}
          <Comments
            slug={props.pageContext.entry.frontmatter.slug}
            comments={props.pageContext.entry.fields.comments}
          />
        </ContentContainer>
      </div>
    </Layout>
  )
}

export default BlogPost
