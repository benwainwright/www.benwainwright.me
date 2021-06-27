import { FC } from "react"
import styled from "@emotion/styled"

const StyledParagraph = styled.p`
  font-family: "Milliard";
  line-height: 2rem;
  font-size: 1.15rem;
  margin: 0.5rem 0 1rem 0;
`

interface ParagraphTextProps {
  role?: string
}

const ParagraphText: FC<ParagraphTextProps> = props => {
  return <StyledParagraph role={props.role}>{props.children}</StyledParagraph>
}

export default ParagraphText
