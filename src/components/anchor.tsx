import { FC } from "react"
import styled from "@emotion/styled"

const StyledAnchor = styled.a`
  font-family: "Milliard";
  font-size: 1.15rem;
  margin: 0.5rem 0 1rem 0;
`

interface AnchorProps {
  href?: string
}

const Anchor: FC<AnchorProps> = props => {
  return <StyledAnchor {...props}>{props.children}</StyledAnchor>
}

export default Anchor
