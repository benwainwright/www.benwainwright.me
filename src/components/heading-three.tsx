import { ReactNode } from "react"
import * as styles from "./heading-three.module.css"
import { getStyles } from "../utils/get-styles"

interface HeadingThreeProps {
  children: ReactNode
  className?: string
}

const HeadingThree = (props: HeadingThreeProps) => {
  const { heading } = getStyles(styles, "heading")

  const classes = props.className ? [heading, props.className] : [heading]

  return <h3 className={classes.join(" ")}>{props.children}</h3>
}

export default HeadingThree
