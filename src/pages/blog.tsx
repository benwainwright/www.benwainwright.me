import { FC } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "@emotion/styled"
import BlogEntry from "../components/blog-entry"

const Container = styled.main`
  grid-column-start: 2;
  grid-row-start: 2;
  padding-left: 2rem;
`

export interface BlogEntryData {
  htmlAst: any
  frontmatter: {
    date: string
    slug: string
    title: string
  }
}

interface BlogProps {
  data: {
    allMarkdownRemark: {
      nodes: BlogEntryData[]
    }
  }
}

const Blog: FC<BlogProps> = props => {
  return (
    <Layout>
      <Container>
        {props.data.allMarkdownRemark.nodes.map(entry => (
          <BlogEntry entry={entry} key={entry.frontmatter.slug} />
        ))}
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      nodes {
        htmlAst
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
        }
      }
    }
  }
`
