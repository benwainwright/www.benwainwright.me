import { useStaticQuery, graphql } from "gatsby"

import { Header } from "../header"
import "./layout.css"
import * as styles from "./layout.module.css"
import { Footer } from "../footer"
import { Seo, SeoProps } from "../seo"
import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
} & SeoProps

export const Layout = (props: LayoutProps) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { children, ...seoProps } = props

  return (
    <div className={styles.pageGrid}>
      <Seo {...seoProps} />
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <main className={styles.mainContainer}>{children}</main>
      <Footer />
    </div>
  )
}
