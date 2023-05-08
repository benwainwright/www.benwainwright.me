import { Page } from "../../types/page"
import * as styles from "./edit-post-form.module.css"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import "react-datepicker/dist/react-datepicker.css"
import { IoMdAlert } from "@react-icons/all-files/io/IoMdAlert"
import { IoMdCheckmarkCircleOutline } from "@react-icons/all-files/io/IoMdCheckmarkCircleOutline"
import { Input } from "../input"
import { DateField } from "../date-field/date-field"
import { Select } from "../select/select"

interface EditPostFormProps {
  page: Page
  setPage: (callback: (page: Page | undefined) => Page | undefined) => void
  dirty: boolean
  setDirty: (dirty: boolean) => void
}

const EditPostForm = ({
  page,
  dirty,
  setDirty,
  setPage,
}: EditPostFormProps) => {
  return (
    <form className={styles.form}>
      <div className={styles.dirtyText}>
        {dirty ? (
          <>
            <IoMdAlert />
            <span className={styles.dirtyDescription}>Edited</span>
          </>
        ) : (
          <>
            <IoMdCheckmarkCircleOutline />
            <span className={styles.dirtyDescription}>Saved</span>
          </>
        )}
      </div>
      <Input
        name="title"
        label="Title"
        value={page.title}
        onChange={event => {
          setPage(
            newPage => newPage && { ...newPage, title: event.target.value }
          )
          setDirty(true)
        }}
      />

      <Select
        name="status"
        label="Status"
        options={[
          { label: "Draft", value: "draft" },
          { label: "Public Draft", value: "public-draft" },
          { label: "Published", value: "published" },
        ]}
        value={page.status}
        onChange={event => {
          setPage(
            newPage =>
              newPage && {
                ...newPage,
                status: event.target.value as Page["status"],
              }
          )
          setDirty(true)
        }}
      />

      <Input
        name="description"
        label="Description"
        value={page.description}
        onChange={event => {
          setPage(
            newPage =>
              newPage && { ...newPage, description: event.target.value }
          )
          setDirty(true)
        }}
      />

      <DateField
        label="Date"
        value={page.date}
        onChange={event => {
          if (event) {
            setPage(newPage => newPage && { ...newPage, date: event })
            setDirty(true)
          }
        }}
        name="date"
      />

      <SimpleMDE
        className={styles.simpleMde}
        value={page.content}
        onChange={value => {
          setPage(newPage => newPage && { ...newPage, content: value })
          setDirty(true)
        }}
      />
    </form>
  )
}

export default EditPostForm
