import { FC } from "react"
import styled from "@emotion/styled"

const StyledH1 = styled.h1`
  font-family: "Aileron";
  font-weight: lighter;
  font-size: 1.9rem;
  letter-spacing: 2px;
  margin: 3rem 0 0.3rem 0;
  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    margin: 2rem 0 1rem 0;
  }

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`

StyledH1.displayName = "h1"

const HeadingOne: FC = props => {
  return <StyledH1>{props.children}</StyledH1>
}

export default HeadingOne
