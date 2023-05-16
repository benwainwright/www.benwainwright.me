import { graphql } from "gatsby"
import "./prism-theme.css"
import { Comments, Heading, Layout } from "../../components"
import ReactMarkdown from "react-markdown"
import * as styles from "./blog-post.module.css"
import { DateTime } from "luxon"
import { markdownComponents } from "./markdown-components"

interface BlogPostProps {
  data: {
    blog: {
      description: string
      title: string
      date: number
      content: string
      slug: string
    }
  }
}

const BlogPost = (props: BlogPostProps) => {
  const {
    data: { blog: post },
  } = props

  return (
    <Layout title={post.title} description={post.description}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Heading className={styles.headerH1} level={1}>
            {post.title}
          </Heading>
          <div className={styles.dateBox}>
            {DateTime.fromMillis(post.date).toLocaleString(DateTime.DATE_MED)}
          </div>

          <div className={styles.contentContainer}>
            <ReactMarkdown components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
            <Comments slug={post.slug} comments={[]} />
          </div>
        </header>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query($id: String) {
    blog(id: { eq: $id }) {
      description
      title
      date
      content
      slug
    }
  }
`
