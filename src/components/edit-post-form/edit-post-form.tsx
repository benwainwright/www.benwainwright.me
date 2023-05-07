import { useFormik } from "formik"
import { Page } from "../../types/page"
import * as styles from "./edit-post-form.module.css"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "../input"
import { DateField } from "../date-field/date-field"
import { useEffect, useRef } from "react"
import { useToken } from "../../hooks/use-token/use-token"
import { useConfig } from "../../hooks/use-config/use-config"
import { makeFetcher } from "../../utils/make-fetcher"

interface EditPostFormProps {
  page: Page
}

const EditPostForm = ({ page }: EditPostFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: page.title,
      slug: page.slug,
      content: page.content,
      description: page.description,
      date: page.date,
    },

    onSubmit: async values => {
      console.log(values)
      await fetcher({
        method: "PUT",
        body: JSON.stringify({ ...values, date: values.date.getTime() }),
      })
      formik.resetForm({ values })
    },
  })

  const interval = useRef<NodeJS.Timer | undefined>()
  const token = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = makeFetcher(config, `page/${page.slug}`, token)

  useEffect(() => {
    const dirty = formik.dirty
    interval.current = setInterval(async () => {
      console.log({ dirty })
      if (dirty) {
        console.log("submitting")
        await formik.submitForm()
      }
    }, 5000)
    return () => clearInterval(interval.current)
  }, [])

  return (
    <form>
      {formik.dirty ? "Edited" : "Saved"}
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
      <Input
        name="description"
        label="Description"
        value={formik.values.description}
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
