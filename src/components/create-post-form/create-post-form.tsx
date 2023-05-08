import "easymde/dist/easymde.min.css"
import { navigate } from "gatsby"
import * as styles from "./create-post-form.module.css"
import "react-datepicker/dist/react-datepicker.css"
import { Input } from "../input"
import { DateField } from "../date-field/date-field"
import { useCallback, useState } from "react"
import { useToken } from "../../hooks/use-token/use-token"
import { useConfig } from "../../hooks/use-config/use-config"
import { makeFetcher } from "../../utils/make-fetcher"
import { Button } from "../button/button"
import { Page } from "../../types/page"

const defaultPage: Page = {
  title: "",
  description: "",
  slug: "",
  date: new Date(),
  content: "",
}

const EditPostForm = () => {
  const [page, setPage] = useState<Page>(defaultPage)
  const [, setDirty] = useState(false)

  const token = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = makeFetcher(config, `page`, token)

  const create = useCallback(async () => {
    await fetcher({
      method: "POST",
      body: JSON.stringify({ ...page, date: page.date.getTime() }),
    })
  }, [page])

  return (
    <form className={styles.form}>
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
        name="slug"
        label="Slug"
        value={page.slug}
        onChange={event => {
          setPage(newPage => ({ ...newPage, slug: event.target.value }))
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
      <Button
        onClick={async event => {
          event.preventDefault()
          await create()
          navigate(`/edit-post/#${page.slug}`)
        }}
      >
        Create
      </Button>
    </form>
  )
}

export default EditPostForm
