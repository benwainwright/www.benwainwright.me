import { ReactNode } from "react"
import * as styles from "./field-container.module.css"

interface FieldContainerProps {
  label: string
  name: string
  children: ReactNode
  vertical?: boolean
  className?: string
}

export const FieldContainer = ({
  label,
  name,
  children,
  vertical,
}: FieldContainerProps) => {
  const classes = vertical ? [styles.field, styles.vertical] : [styles.field]

  const labelClasses = vertical
    ? [styles.label, styles.vertical]
    : [styles.label]

  return (
    <div className={classes.join(" ")}>
      <label className={labelClasses.join(" ")} htmlFor={name}>
        {label}
      </label>
      {children}
    </div>
  )
}
