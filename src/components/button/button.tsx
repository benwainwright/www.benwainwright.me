import { MouseEventHandler, ReactNode } from "react"
import * as styles from "./button.module.css"

interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
}
export const Button = ({ disabled, children, onClick, type }: ButtonProps) => {
  const classes = disabled ? [styles.button, styles.disabled] : [styles.button]

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = event => {
    if (!disabled) {
      onClick?.(event)
    }
  }

  return (
    <button className={classes.join(" ")} onClick={onClickHandler} type={type}>
      {children}
    </button>
  )
}
