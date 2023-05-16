import { FC } from "react"
import { graphql } from "gatsby"
import { TiPencil } from "@react-icons/all-files/ti/TiPencil"
import { Layout, BlogSummary, Heading } from "../components"

import * as styles from "./blog.module.css"

export interface BlogSummaryData {
  description: string
  date: number
  slug: string
  title: string
}

interface BlogProps {
  data: {
    allBlog: {
      nodes: BlogSummaryData[]
    }
  }
}

const Blog: FC<BlogProps> = props => {
  return (
    <Layout title="Blog">
      <div className={styles.pageContainer}>
        <Heading level={1}>
          <TiPencil className={styles.icon} />
          Blog
        </Heading>
        <div className={styles.blogContainer}>
          {props.data.allBlog.nodes.map(entry => (
            <BlogSummary entry={entry} key={entry.slug} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allBlog(sort: { date: DESC }) {
      nodes {
        slug
        title
        date
        description
      }
    }
  }
`
