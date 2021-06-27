const path = require("path")

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
              slug
              title
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
        entry: entry,
      },
    })
  })
}
