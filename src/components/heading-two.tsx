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

interface HeadingTwoProps {
  icon: any
}

const HeadingTwo: FC<HeadingTwoProps> = props => {
  const StyledIcon = props.icon
    ? styled(props.icon)`
        margin: 0 0.5rem 0 0;
      `
    : null

  return (
    <StyledH2>
      {StyledIcon ? <StyledIcon /> : null}
      <div>{props.children}</div>
    </StyledH2>
  )
}

export default HeadingTwo
