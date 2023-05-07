import { useFormik } from "formik"
import { Page } from "../../types/page"
import * as styles from "./edit-post-form.module.css"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "../input"
import { DateField } from "../date-field/date-field"

interface EditPostFormProps {
  page: Page
}

const EditPostForm = ({ page }: EditPostFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: page.title,
      slug: page.slug,
      content: page.content,
      date: page.date,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    onSubmit: async values => {},
  })
  return (
    <form>
      <Input
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
      />

      <Input
        name="slug"
        label="Slug"
        value={formik.values.slug}
        onChange={formik.handleChange}
      />

      <DateField
        label="Date"
        value={formik.values.date}
        onChange={async date => formik.setFieldValue("date", date)}
        name="date"
      />

      <SimpleMDE
        className={styles.simpleMde}
        value={formik.values.content}
        onChange={formik.handleChange}
      />
    </form>
  )
}

export default EditPostForm
