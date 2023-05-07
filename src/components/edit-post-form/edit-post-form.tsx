import { useFormik } from "formik"
import { Page } from "../../types/page"
import * as styles from "./edit-post-form.module.css"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

interface EditPostFormProps {
  page: Page
}

const EditPostForm = ({ page }: EditPostFormProps) => {
  const formik = useFormik({
    initialValues: {
      title: page.title,
      slug: page.slug,
      content: page.content,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    onSubmit: async values => {},
  })
  return (
    <form>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="title">
          Title
        </label>
        <input
          className={styles.formInput}
          name="title"
          id="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="slug">
          Slug
        </label>
        <input
          className={styles.formInput}
          name="slug"
          id="slug"
          value={formik.values.slug}
          onChange={formik.handleChange}
        />
      </div>

      <SimpleMDE
        className={styles.simpleMde}
        value={formik.values.content}
        onChange={formik.handleChange}
      />
    </form>
  )
}

export default EditPostForm
