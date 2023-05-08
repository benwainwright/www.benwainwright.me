import { FC } from "react"
import { Link, graphql } from "gatsby"
import { TiPencil } from "@react-icons/all-files/ti/TiPencil"
import { Layout, BlogSummary, Heading } from "../components"

import * as styles from "./blog.module.css"

export interface BlogSummaryData {
  excerpt: string
  frontmatter: {
    published: boolean
    date: string
    slug: string
    title: string
  }
}

interface BlogProps {
  data: {
    allMarkdownRemark: {
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
          {props.data.allMarkdownRemark.nodes.map(entry => (
            <BlogSummary entry={entry} key={entry.frontmatter.slug} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      nodes {
        excerpt
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          published
          slug
          title
        }
      }
    }
  }
`
