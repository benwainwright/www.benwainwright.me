import React, { ReactNode } from "react"
import * as styles from "./heading.module.css"
import { titleCase } from "title-case"

const headingSizes = {
  1: "1.9rem",
  2: "1.5rem",
  3: "1.1rem",
} as const

interface HeadingProps {
  level: keyof typeof headingSizes
  children: ReactNode
  className?: string
}

export const Heading = (props: HeadingProps) => {
  const classes = props.className
    ? [props.className, styles.heading]
    : [styles.heading]

  const children =
    typeof props.children === "string"
      ? titleCase(props.children)
      : props.children

  return React.createElement(
    `h${props.level}`,
    {
      className: classes.join(" "),
      style: {
        fontSize: headingSizes[props.level],
      },
    },
    children
  )
}
