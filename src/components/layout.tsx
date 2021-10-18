import { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"

import Header from "./header"
import "./layout.css"
import Footer from "./footer"

const Grid = styled.div`
  display: grid;
  grid-template-rows: 10rem 1fr 5rem;
  grid-template-columns: repeat(2, 1fr);
  color: #393e41;
  min-height: 100vh;

  @media (max-width: 800px) {
    grid-template-rows: 5rem calc(100vh - 5rem);
  }
`

const MainContainer = styled.main`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 2;
  display: flex;
  height: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
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
      <MainContainer>{children}</MainContainer>
      <Footer />
    </Grid>
  )
}

export default Layout
