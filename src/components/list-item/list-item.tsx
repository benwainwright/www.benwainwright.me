import { ReactNode } from "react"
import * as styles from "./list-item.module.css"

interface ListItemProps {
  children: ReactNode
}

export const ListItem = (props: ListItemProps) => (
  <li className={styles.li}>{props.children}</li>
)