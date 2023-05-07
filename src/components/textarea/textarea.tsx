import { ChangeEventHandler } from "react"
import * as styles from "./textarea.module.css"
import { FieldContainer } from "../field-container"

interface TextAreaProps {
  label: string
  name: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  value: string
}

export const TextArea = ({ name, onChange, value, label }: TextAreaProps) => {
  return (
    <FieldContainer label={label} name={name} vertical>
      <textarea
        className={styles.textarea}
        name={name}
        id={name}
        onChange={onChange}
        value={value}
      ></textarea>
    </FieldContainer>
  )
}
