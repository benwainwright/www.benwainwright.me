import { Comment as CommentType } from "../comments/utils/comment"
import { renderAst } from "../utils/render-ast"
import * as styles from "./blog-post.module.css"

import "./prism-theme.css"
import { ReactNode } from "react"
import { Comments, Heading, Layout } from "../components"

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

  return (
    <Layout
      title={props.pageContext.entry.frontmatter.title}
      description={props.pageContext.entry.frontmatter.description}
    >
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Heading className={styles.headerH1} level={1}>
            {props.pageContext.entry.frontmatter.title}
          </Heading>
          <div className={styles.dateBox}>
            {props.pageContext.entry.frontmatter.date}
          </div>
        </header>
        <div className={styles.contentContainer}>
          {!isPublished && (
            <div className={styles.unpublishedNotice}>
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
