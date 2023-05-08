import { MouseEventHandler, ReactNode } from "react"
import * as styles from "./button.module.css"

interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "button" | "submit" | "reset" | undefined
}
export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  )
}
