import { FC } from "react"
import * as styles from "./anchor.module.css"

interface AnchorProps {
  href?: string
}

const Anchor: FC<AnchorProps> = props => {
  return (
    <a className={styles.anchor} {...props}>
      {props.children}
    </a>
  )
}

export default Anchor
