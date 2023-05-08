import { ChangeEventHandler } from "react"
import { FieldContainer } from "../field-container"
import * as styles from "./select.module.css"

interface SelectProps {
  name: string
  label: string
  options: string[] | { label: string; value: string }[]
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
}

export const Select = ({
  options,
  value,
  onChange,
  name,
  label,
}: SelectProps) => {
  return (
    <FieldContainer name={name} label={label}>
      <select onChange={onChange} value={value} className={styles.select}>
        {options.map(option =>
          typeof option === "string" ? (
            <option className={styles.option}>{option}</option>
          ) : (
            <option className={styles.option} value={option.value}>
              {option.label}
            </option>
          )
        )}
      </select>
    </FieldContainer>
  )
}
