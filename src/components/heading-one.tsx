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

interface HeadingOneProps {
  icon: any
}

const HeadingContainer = styled.div`
  margin: 0 0 0 0.5rem;
`

const HeadingOne: FC<HeadingOneProps> = props => {
  return (
    <StyledH1>
      {props.icon ? <props.icon /> : null}
      <HeadingContainer>{props.children}</HeadingContainer>
    </StyledH1>
  )
}

export default HeadingOne
