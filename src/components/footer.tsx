import styled from "@emotion/styled"
import { FC } from "react"

const FooterContainer = styled.footer`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 3;
  display: flex;
  background: #3f88c5;
`

const Footer: FC = () => <FooterContainer></FooterContainer>

export default Footer
