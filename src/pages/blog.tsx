import { FC } from "react"
import { graphql } from "gatsby"
import { TiPencil } from "react-icons/ti"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import BlogSummary from "../components/blog-summary"
import HeadingOne from "../components/heading-one"
import Seo from "../components/seo"

const Container = styled.div`
  padding: 0 2rem 0 2rem;

  @media (min-width: 1400px) {
    margin: 0 auto;
    width: 70%;
  }
`

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
    <Layout>
      <Container>
        <Seo title="Blog" />
        <HeadingOne>
          <TiPencil />
          Blog
        </HeadingOne>
        {props.data.allMarkdownRemark.nodes.map(entry => (
          <BlogSummary entry={entry} key={entry.frontmatter.slug} />
        ))}
      </Container>
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
