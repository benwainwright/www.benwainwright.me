import { FC } from "react"
import { graphql } from "gatsby"
import { TiPencil } from "react-icons/ti"
import Layout from "../components/layout"
import BlogSummary from "../components/blog-summary"
import HeadingOne from "../components/heading-one"

import * as styles from "./blog.module.css"
import { getStyles } from "../utils/get-styles"

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
  const { blogContainer, pageContainer } = getStyles(
    styles,
    "blogContainer",
    "pageContainer"
  )
  return (
    <Layout title="Blog">
      <div className={pageContainer}>
        <HeadingOne>
          <TiPencil />
          Blog
        </HeadingOne>
        <div className={blogContainer}>
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
      sort: { order: DESC, fields: frontmatter___date }
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
