import { Page } from "../../types/page"
import * as styles from "./edit-post-form.module.css"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import "react-datepicker/dist/react-datepicker.css"
import { IoMdAlert } from "@react-icons/all-files/io/IoMdAlert"
import { IoMdCheckmarkCircleOutline } from "@react-icons/all-files/io/IoMdCheckmarkCircleOutline"
import { Input } from "../input"
import { DateField } from "../date-field/date-field"
import { useCallback, useEffect, useRef, useState } from "react"
import { useToken } from "../../hooks/use-token/use-token"
import { useConfig } from "../../hooks/use-config/use-config"
import { makeFetcher } from "../../utils/make-fetcher"

interface EditPostFormProps {
  page: Page
}

const EditPostForm = ({ page: initialPage }: EditPostFormProps) => {
  const [page, setPage] = useState(initialPage)
  const [dirty, setDirty] = useState(false)

  const interval = useRef<NodeJS.Timer | undefined>()
  const token = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = makeFetcher(config, `page/${page.slug}`, token)

  const update = useCallback(async () => {
    await fetcher({
      method: "PUT",
      body: JSON.stringify({ ...page, date: page.date.getTime() }),
    })
  }, [page])

  useEffect(() => {
    interval.current = setInterval(async () => {
      if (dirty) {
        await update()
        setDirty(false)
      }
    }, 5000)
    return () => clearInterval(interval.current)
  }, [dirty, update])

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
          setPage(newPage => ({ ...newPage, title: event.target.value }))
          setDirty(true)
        }}
      />

      <Input
        name="description"
        label="Description"
        value={page.description}
        onChange={event => {
          setPage(newPage => ({ ...newPage, description: event.target.value }))
          setDirty(true)
        }}
      />

      <DateField
        label="Date"
        value={page.date}
        onChange={event => {
          if (event) {
            setPage(newPage => ({ ...newPage, date: event }))
            setDirty(true)
          }
        }}
        name="date"
      />

      <SimpleMDE
        className={styles.simpleMde}
        value={page.content}
        onChange={value => {
          setPage(newPage => ({ ...newPage, content: value }))
          setDirty(true)
        }}
      />
    </form>
  )
}

export default EditPostForm
