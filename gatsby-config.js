const siteUrl = `https://benwainwright.me`
const plugins = [
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      query: `
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          site_url: siteUrl
        }
      }
    }
    `,

      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            const result = allMarkdownRemark.edges.map(edge => {
              return {
                ...edge.node.frontmatter,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }],
              }
            })
            console.log(result)
            return result
          },
          query: `{
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___date]}
            filter: {frontmatter: {published: {eq: true}}}
          ) {
            edges {
              node {
                excerpt
                html
                fields {
                  slug
                }
                frontmatter {
                  title
                  date
                }
              }
            }
          }
        }`,
          output: "/rss.xml",
          title: "benwainwright.me",
        },
      ],
    },
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      query: `
    {
      allSitePage(filter: {context: {entry: {frontmatter: {published: {ne: false}}}}}) {
        nodes {
          path
          context {
            entry {
              frontmatter {
                last_modified
              }
            }
          }
        }
      }
    }
    `,
      resolveSiteUrl: () => siteUrl,
      serialize: ({ path, lastmod }) => ({ url: path, lastmod }),
      resolvePages: ({ allSitePage }) => {
        return allSitePage.nodes.map(node => {
          const lastmod = node.context.entry
            ? node.context.entry.frontmatter.last_modified
            : null

          return {
            path: node.path,
            lastmod,
          }
        })
      },
    },
  },
  `gatsby-plugin-emotion`,
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-image`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `markdown-pages`,
      path: `${__dirname}/blog-entries`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            showLineNumbers: true,
          },
        },
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-gatsby-cloud`,
]

if (process.env.GOOGLE_TRACKING_ID) {
  plugins.push({
    resolve: `gatsby-plugin-google-tagmanager`,
    options: {
      id: process.env.GOOGLE_TRACKING_ID,
      includeInDevelopment: false,
      defaultDataLayer: { platform: "gatsby" },
      enableWebVitalsTracking: true,
      selfHostedOrigin: "https://benwainwright.me",
    },
  })
}

module.exports = {
  siteMetadata: {
    title: `Ben Wainwright`,
    description: `Full stack JavaScript/Typescript engineer`,
    author: `Ben Wainwright`,
    siteUrl,
  },
  plugins,
}
