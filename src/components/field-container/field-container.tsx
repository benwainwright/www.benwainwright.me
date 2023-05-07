import { ReactNode } from "react"
import * as styles from "./field-container.module.css"

interface FieldContainerProps {
  label: string
  name: string
  children: ReactNode
}

export const FieldContainer = ({
  label,
  name,
  children,
}: FieldContainerProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      {children}
    </div>
  )
}
