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

const Header: FC<HeaderProps> = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
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
  </header>
)

export default Header
