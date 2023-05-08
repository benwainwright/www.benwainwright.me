import DatePicker from "react-datepicker"
import * as styles from "./date-field.module.css"
import { FieldContainer } from "../field-container"

interface DateFieldProps {
  label: string
  name: string
  onChange: (date: Date | null) => void
  value: Date
}

export const DateField = ({ label, name, onChange, value }: DateFieldProps) => {
  return (
    <FieldContainer label={label} name={name}>
      <DatePicker
        wrapperClassName={styles.dateFieldWrapper}
        selected={value}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={onChange}
        className={styles.dateField}
        name={name}
        dateFormat="d MMM yyyy"
        id={name}
      />
    </FieldContainer>
  )
}
