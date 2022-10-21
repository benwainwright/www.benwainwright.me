import { ReactNode } from "react"
import { getStyles } from "../utils/get-styles"
import * as styles from "./heading-two.module.css"

interface HeadingTwoProps {
  children: ReactNode
  className?: string
}

const HeadingTwo = (props: HeadingTwoProps) => {
  const { heading } = getStyles(styles, "heading")

  const classes = props.className ? [heading, props.className] : [heading]

  return <h2 className={classes.join(" ")}>{props.children}</h2>
}

export default HeadingTwo
