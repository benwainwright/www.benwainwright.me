import { ReactNode } from "react"
import * as styles from "./heading-two.module.css"

interface HeadingTwoProps {
  children: ReactNode
  className?: string
}

const HeadingTwo = (props: HeadingTwoProps) => {
  const classes = props.className
    ? [styles.heading, props.className]
    : [styles.heading]

  return <h2 className={classes.join(" ")}>{props.children}</h2>
}

export default HeadingTwo
