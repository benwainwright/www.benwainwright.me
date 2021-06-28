const siteUrl = `https://benwainwright.me`
module.exports = {
  siteMetadata: {
    title: `Ben Wainwright`,
    description: `Full stack JavaScript/Typescript engineer`,
    author: `Ben Wainwright`,
    siteUrl,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
        {
          allSitePage {
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
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
