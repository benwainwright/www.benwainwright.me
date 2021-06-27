import { FC } from "react"
import styled from "@emotion/styled"

const StyledParagraph = styled.p`
  font-family: "Milliard";
  line-height: 2rem;
  font-size: 1.15rem;
  margin: 0.5rem 0 1rem 0;
`

const ParagraphText: FC = props => {
  return <StyledParagraph>{props.children}</StyledParagraph>
}

export default ParagraphText
