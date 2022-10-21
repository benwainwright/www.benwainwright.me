import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import * as styles from "./layout.module.css"
import Footer from "./footer"
import { getStyles } from "../utils/get-styles"
import Seo, { SeoProps } from "./seo"
import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
} & SeoProps

const Layout = (props: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { mainContainer, pageGrid } = getStyles(
    styles,
    "mainContainer",
    "pageGrid"
  )

  const { children, ...seoProps } = props

  return (
    <div className={pageGrid}>
      <Seo {...seoProps} />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className={mainContainer}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
