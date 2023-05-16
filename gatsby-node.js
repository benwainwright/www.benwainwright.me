const path = require("path")
const axios = require("axios")

exports.onCreateBabelConfig = ({ actions }) => {
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

const { createFilePath } = require(`gatsby-source-filesystem`)
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Blog`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `/blog${value}`,
    })

    const apiPath = value.replace(/\//g, "")

    const { data } = await axios.get(
      `https://api.benwainwright.me/comments/${apiPath}`
    )

    createNodeField({
      name: `comments`,
      node,
      value: data,
    })
  }
}
