import { ChangeEventHandler } from "react"
import * as styles from "./input.module.css"
import { FieldContainer } from "../field-container"

interface InputProps {
  label: string
  name: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
}

export const Input = ({ name, onChange, value, label }: InputProps) => {
  return (
    <FieldContainer name={name} label={label}>
      <input
        className={styles.input}
        type="text"
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      />
    </FieldContainer>
  )
}
