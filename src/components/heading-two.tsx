import { FC } from "react"
import styled from "@emotion/styled"

const StyledH2 = styled.h2`
  font-family: "Aileron";
  font-weight: lighter;
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin: 3rem 0 0 0;
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    margin: 1.5rem 0 0 0;
  }
`

const HeadingTwo: FC = props => {
  return <StyledH2>{props.children}</StyledH2>
}

export default HeadingTwo
