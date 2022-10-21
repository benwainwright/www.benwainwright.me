import { ReactNode } from "react"
import { getStyles } from "../utils/get-styles"
import * as styles from "./heading-one.module.css"

interface HeadingOneProps {
  children: ReactNode
  className?: string
}

const HeadingOne = (props: HeadingOneProps) => {
  const { heading } = getStyles(styles, "heading")
  const classes = props.className ? [heading, props.className] : [heading]
  return <h1 className={classes.join(" ")}>{props.children}</h1>
}

export default HeadingOne
