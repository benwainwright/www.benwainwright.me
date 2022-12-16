import { ReactNode } from "react"
import * as styles from "./heading-three.module.css"

interface HeadingThreeProps {
  children: ReactNode
  className?: string
}

const HeadingThree = (props: HeadingThreeProps) => {
  const classes = props.className
    ? [styles.heading, props.className]
    : [styles.heading]

  return <h3 className={classes.join(" ")}>{props.children}</h3>
}

export default HeadingThree
