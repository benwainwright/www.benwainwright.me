import { FC } from "react"
import styled from "@emotion/styled"

const StyledH1 = styled.h1`
  font-family: "Aileron";
  font-weight: lighter;
  font-size: 3rem;
  letter-spacing: 2px;
  margin: 2rem 0 0 0;
  display: flex;
  align-items: center;
`

StyledH1.displayName = "h1"

const HeadingOne: FC = props => {
  return <StyledH1>{props.children}</StyledH1>
}

export default HeadingOne
