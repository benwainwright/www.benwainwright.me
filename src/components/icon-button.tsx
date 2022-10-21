import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"
import { IconType } from "react-icons/lib"
import { getStyles } from "../utils/get-styles"

import * as styles from "./icon-button.module.css"

type IconButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  icon: IconType
}

export const IconButton = (props: IconButtonProps) => {
  const { button, icon } = getStyles(styles, "button", "icon")
  const Icon = props.icon

  const classes = props.className ? [props.className, button] : [button]

  return (
    <button {...props} className={classes.join(" ")}>
      <Icon className={icon} />
    </button>
  )
}
