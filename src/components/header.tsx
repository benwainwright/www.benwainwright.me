import { FC } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

interface HeaderProps {
  siteTitle: string
}

const StyledHeader = styled.header`
  background: #3f88c5;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
`

const HomeLink = styled(Link)`
  flex-grow: 999;
`

const Container = styled.div`
  height: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-family: "Aileron";
  @media (max-width: 800px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 2rem;

  &:hover {
    color: black;
  }
`

const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <StyledHeader>
    <Container>
      <HomeLink
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </HomeLink>
      <MenuLink to="/">Home</MenuLink>
      <MenuLink to="/blog">Blog</MenuLink>
      <MenuLink to="/this-site">This Site</MenuLink>
    </Container>
  </StyledHeader>
)

export default Header
