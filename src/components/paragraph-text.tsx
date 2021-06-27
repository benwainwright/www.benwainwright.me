import { FC } from "react"
import { css } from "@linaria/core"

const paragraphCss = css`
  font-family: "Milliard";
`

const ParagraphText: FC = props => {
  return <p className={paragraphCss}>{props.children}</p>
}

export default ParagraphText
