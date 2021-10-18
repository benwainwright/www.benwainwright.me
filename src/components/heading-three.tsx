import { FC } from "react"
import styled from "@emotion/styled"

const StyledH3 = styled.h3`
  font-family: "Aileron";
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 2px;
  margin: 2rem 0 0 0;
`

const HeadingThree: FC = props => {
  return <StyledH3>{props.children}</StyledH3>
}

export default HeadingThree
