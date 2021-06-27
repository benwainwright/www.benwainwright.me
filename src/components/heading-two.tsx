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
`

const HeadingContainer = styled.div`
  margin: 0 0 0 0.5rem;
`

interface HeadingTwoProps {
  icon: any
}

const HeadingTwo: FC<HeadingTwoProps> = props => {
  return (
    <StyledH2>
      <props.icon />
      <HeadingContainer>{props.children}</HeadingContainer>
    </StyledH2>
  )
}

export default HeadingTwo
