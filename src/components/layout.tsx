import { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import Header from "./header"
import "./layout.css"

const Grid = styled.div`
  display: grid;
  grid-template-rows: 10rem calc(100vh - 10rem);
  grid-template-columns: repeat(2, 1fr);
  color: #393e41;
`

const Layout: FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <Grid>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      {children}
    </Grid>
  )
}

export default Layout
