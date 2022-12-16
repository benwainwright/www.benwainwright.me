import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { IconType } from "react-icons/lib"

import * as styles from "./icon-button.module.css"

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: IconType
}

export const IconButton = (props: IconButtonProps) => {
  const Icon = props.icon

  const classes = props.className
    ? [props.className, styles.button]
    : [styles.button]

  return (
    <button {...props} className={classes.join(" ")}>
      <Icon className={styles.icon} />
    </button>
  )
}
