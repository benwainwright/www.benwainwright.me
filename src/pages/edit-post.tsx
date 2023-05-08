import ClipLoader from "react-spinners/ClipLoader"
import { Heading, Layout, ParagraphText } from "../components"
import { useApiRequest } from "../hooks/use-api-request/use-api-request"
import { Page, SerialisedPage } from "../types/page"
import * as styles from "./edit-post.module.css"
import loadable from "@loadable/component"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Button } from "../components/button/button"
import { Dialog } from "../components/dialog"
import { useToken } from "../hooks/use-token/use-token"
import { useConfig } from "../hooks/use-config/use-config"
import { makeFetcher } from "../utils/make-fetcher"
import { navigate } from "gatsby"
const EditPostForm = loadable(
  async () => import("../components/edit-post-form/edit-post-form")
)

const EditPost = () => {
  const [slug, setSlug] = useState("")
  const [dirty, setDirty] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const { data: serialisedPage, isLoading } = useApiRequest<SerialisedPage>({
    trigger: Boolean(slug),
    resource: "page",
    id: slug,
  })

  const initialPage = useMemo(
    () =>
      serialisedPage && {
        ...serialisedPage,
        date: new Date(serialisedPage?.date),
      },
    [serialisedPage]
  )

  const [page, setPage] = useState<Page | undefined>(initialPage)

  useEffect(() => {
    setPage(initialPage)
  }, [initialPage])

  useEffect(() => {
    setSlug(window.location.hash.slice(1))
  }, [])

  const interval = useRef<NodeJS.Timer | undefined>()
  const token = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = makeFetcher(config, `page/${page?.slug}`, token)

  const update = useCallback(async () => {
    await fetcher({
      method: "PUT",
      body: JSON.stringify({ ...page, date: page?.date.getTime() }),
    })
    setDirty(false)
  }, [page])

  useEffect(() => {
    interval.current = setInterval(async () => {
      if (dirty) {
        await update()
      }
    }, 5000)
    return () => clearInterval(interval.current)
  }, [dirty, update])

  const doDelete = async () => {
    await fetcher({
      method: "DELETE",
    })
  }

  return (
    <Layout title="Edit Post" needsAuth>
      <Dialog
        onOk={async () => {
          await doDelete()
          await navigate(`/blog-backend/`)
        }}
        onCancel={() => setShowDelete(false)}
        open={showDelete}
      >
        <ParagraphText>
          Are you sure you want to delete this post?
        </ParagraphText>
      </Dialog>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Heading level={1}>Edit Post</Heading>
          <div className={styles.headerButtons}>
            <Button
              disabled={!dirty}
              onClick={async () => {
                await update()
              }}
            >
              Save
            </Button>
            <Button onClick={() => setShowDelete(true)}>Delete</Button>
          </div>
        </header>
        {isLoading ? (
          <ClipLoader
            loading
            className={styles.loader}
            cssOverride={{
              color: "var(--color-primary)",
            }}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          page && (
            <EditPostForm
              dirty={dirty}
              setDirty={setDirty}
              page={page}
              setPage={setPage}
            />
          )
        )}
      </div>
    </Layout>
  )
}

export default EditPost
