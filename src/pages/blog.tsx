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
  html: string
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
  console.log(JSON.stringify(props.data, null, 2))
  return (
    <Layout>
      <Container>
        {props.data.allMarkdownRemark.nodes.map(entry => (
          <BlogEntry entry={entry} key={entry} />
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
        html
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          slug
          title
        }
      }
    }
  }
`
