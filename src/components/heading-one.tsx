import { ReactNode } from "react"
import * as styles from "./heading-one.module.css"

interface HeadingOneProps {
  children: ReactNode
  className?: string
}

const HeadingOne = (props: HeadingOneProps) => {
  const classes = props.className
    ? [styles.heading, props.className]
    : [styles.heading]

  return <h1 className={classes.join(" ")}>{props.children}</h1>
}

export default HeadingOne
