const path = require("path")
const axios = require("axios")

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: "@linaria/babel-preset",
  })

  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Comment {
      author: String!
      email: String!
      message: String!
      timestamp: Int!
    }

    type MarkdownRemarkFields implements Node {
      comments: [Comment!]!
    }

    type FrontMatter {
      date: String!
      last_modified: String
      slug: String!
      published: Boolean!
      description: String!
    }
    
    type Entry {
      id: String!
      htmlAst: String!
      frontmatter: FrontMatter!
    }

    type Context {
      entry: Entry
    }

    type SitePage implements Node {
      pageContext: Context
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(
    `
      query {
        allMarkdownRemark {
          nodes {
            id
            htmlAst
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              last_modified
              slug
              published
              description
              title
            }
            fields {
              comments {
                author
                message
                timestamp
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const blogPost = path.resolve(__dirname, "./src/page-templates/blog-post.tsx")

  result.data.allMarkdownRemark.nodes.forEach(entry => {
    actions.createPage({
      path: `/blog/${entry.frontmatter.slug}`,
      component: blogPost,
      context: {
        entry,
      },
    })
  })
}

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `/blog${value}`,
    })

    const apiPath = value.replace(/\//g, "")

    // const { data } = await axios.get(
    //   `https://api.benwainwright.me/comments/${apiPath}`
    // )

    createNodeField({
      name: `comments`,
      node,
      value: [],
    })
  }
}
