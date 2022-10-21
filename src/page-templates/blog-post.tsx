import Layout from "../components/layout"
import { BsFillStarFill } from "react-icons/bs"
import HeadingOne from "../components/heading-one"
import Comments from "../components/comments"
import { Comment as CommentType } from "../comments/utils/comment"
import { renderAst } from "../utils/render-ast"
import { getStyles } from "../utils/get-styles"
import * as styles from "./blog-post.module.css"

import "./prism-theme.css"
import { ReactNode } from "react"

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

interface BlogPostProps {
  children: ReactNode
}

const BlogPost = (props: BlogPostProps) => {
  const isPublished = props.pageContext.entry.frontmatter.published

  const {
    dateBox,
    pageContainer,
    header,
    headerH1,
    contentContainer,
    headingContainer,
    unpublishedNotice,
  } = getStyles(
    styles,
    "pageContainer",
    "header",
    "headerH1",
    "dateBox",
    "contentContainer",
    "headingContainer",
    "unpublishedNotice"
  )

  return (
    <Layout
      title={props.pageContext.entry.frontmatter.title}
      description={props.pageContext.entry.frontmatter.description}
    >
      <div className={pageContainer}>
        <header className={header}>
          <HeadingOne className={headerH1}>
            <BsFillStarFill />
            <div className={headingContainer}>
              {props.pageContext.entry.frontmatter.title}
            </div>
          </HeadingOne>
          <div className={dateBox}>
            {props.pageContext.entry.frontmatter.date}
          </div>
        </header>
        <div className={contentContainer}>
          {!isPublished && (
            <div className={unpublishedNotice}>
              This post has not yet been published. Please do not share the URL
              without my permission.
            </div>
          )}
          {renderAst(props.pageContext.entry.htmlAst)}
          <Comments
            slug={props.pageContext.entry.frontmatter.slug}
            comments={props.pageContext.entry.fields.comments}
          />
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
