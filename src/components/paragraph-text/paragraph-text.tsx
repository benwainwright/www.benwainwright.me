import { ReactNode } from "react"
import * as styles from "./paragraph-text.module.css"

export interface ParagraphTextProps {
  role?: string
  children: ReactNode
}

export const ParagraphText = (props: ParagraphTextProps) => {
  return (
    <p className={styles.paragraphText} {...props}>
      {props.children}
    </p>
  )
}
