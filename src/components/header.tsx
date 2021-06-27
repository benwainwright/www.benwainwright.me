import { FC } from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"

interface HeaderProps {
  siteTitle: string
}

const Container = styled.div`
  font-family: "Penna";
  font-size: 5rem;
  text-align: center;
  padding: 2rem 0 2rem 0;
`

const StyledHeader = styled.header`
  background: #3f88c5;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
`

const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <StyledHeader>
    <Container>
      <Link
        to="/"
        style={{
          color: `white`,
          textDecoration: `none`,
        }}
      >
        {siteTitle}
      </Link>
    </Container>
  </StyledHeader>
)

export default Header
