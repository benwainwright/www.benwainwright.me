import { ReactNode } from "react"
import * as styles from "./anchor.module.css"

interface AnchorProps {
  href?: string
  children: ReactNode
}

export const Anchor = (props: AnchorProps) => {
  return (
    <a className={styles.anchor} {...props}>
      {props.children}
    </a>
  )
}
