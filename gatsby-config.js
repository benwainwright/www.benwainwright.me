const siteUrl = `https://benwainwright.me`
const plugins = [
  // {
  //   resolve: `gatsby-plugin-feed`,
  //   options: {
  //     query: `
  //   {
  //     site {
  //       siteMetadata {
  //         title
  //         description
  //         siteUrl
  //         site_url: siteUrl
  //       }
  //     }
  //   }
  //   `,
  //   },
  // },
]

// },
// },
// {
// resolve: `gatsby-plugin-sitemap`,
// options: {
// query: `
// {
// allSitePage(
//   filter: {pageContext: {entry: {frontmatter: {published: {ne: false}}}}}
// ) {
//   nodes {
//     path
//     pageContext {
//       entry {
//         frontmatter {
//           last_modified
//         }
//       }
//     }
//   }
// }
// }
// `,
// resolveSiteUrl: () => siteUrl,
// serialize: ({ path, lastmod }) => ({ url: path, lastmod }),
// resolvePages: ({ allSitePage }) => {
//   return allSitePage.nodes.map(node => {
//     const lastmod = node.pageContext.entry
//       ? node.pageContext.entry.frontmatter.last_modified
//       : null

//     return {
//       path: node.path,
//       lastmod,
//     }
//   })
// },
// },
// },
// `gatsby-plugin-react-helmet`,
// `gatsby-plugin-image`,
// {
// resolve: `gatsby-source-filesystem`,
// options: {
// name: `images`,
// path: `${__dirname}/src/images`,
// },
// },
// {
// resolve: `gatsby-source-filesystem`,
// options: {
// name: `markdown-pages`,
// path: `${__dirname}/blog-entries`,
// },
// },
// {
// resolve: `gatsby-transformer-remark`,
// options: {
// plugins: [
//   {
//     resolve: `gatsby-remark-prismjs`,
//     options: {
//       showLineNumbers: true,
//     },
//   },
// ],
// },
// },
// `gatsby-transformer-sharp`,
// `gatsby-plugin-sharp`,
// `gatsby-plugin-gatsby-cloud`,
// ]

// if (process.env.GOOGLE_TRACKING_ID) {
// plugins.push({
// resolve: `gatsby-plugin-google-tagmanager`,
// options: {
// id: process.env.GOOGLE_TRACKING_ID,
// includeInDevelopment: false,
// defaultDataLayer: { platform: "gatsby" },
// enableWebVitalsTracking: true,
// selfHostedOrigin: "https://benwainwright.me",
// },
// })
// }

module.exports = {
  siteMetadata: {
    title: `Ben Wainwright`,
    description: `Full stack JavaScript/TypeScript engineer`,
    author: `Ben Wainwright`,
    siteUrl,
  },
  plugins,
}
