import { FC, DetailedHTMLProps, MetaHTMLAttributes } from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface SeoProps {
  description?: string
  lang?: string
  meta?: DetailedHTMLProps<
    MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[]
  title: string
}

const Seo: FC<SeoProps> = ({ description, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description ?? site.siteMetadata.description
  const defaultMeta = [
    {
      name: `description`,
      content: metaDescription
    },
    {
      property: `og:title`,
      content: title
    },
    {
      property: `og:description`,
      content: metaDescription
    },
    {
      property: `og:type`,
      content: `website`
    },
    {
      name: `twitter:card`,
      content: `summary`
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata?.author || ``
    },
    {
      name: `twitter:title`,
      content: title
    },
    {
      name: `twitter:description`,
      content: metaDescription
    }
  ]

  const helmetMeta = meta ? [...defaultMeta, ...meta] : defaultMeta

  const defaultTitle = site.siteMetadata?.title

  const htmlAttributes = { lang: "en" }

  return defaultTitle ? (
    <Helmet
      htmlAttributes={htmlAttributes}
      title={title}
      titleTemplate={`%s | ${defaultTitle}`}
      meta={helmetMeta}
    />
  ) : (
    <Helmet htmlAttributes={htmlAttributes} title={title} meta={helmetMeta} />
  )
}

export default Seo
