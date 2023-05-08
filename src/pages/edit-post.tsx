import ClipLoader from "react-spinners/ClipLoader"
import { Heading, Layout, ParagraphText } from "../components"
import { useApiRequest } from "../hooks/use-api-request/use-api-request"
import { SerialisedPage } from "../types/page"
import * as styles from "./edit-post.module.css"
import loadable from "@loadable/component"
import { useEffect, useState } from "react"
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
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    setSlug(window.location.hash.slice(1))
  }, [])

  const { data: serialisedPage, isLoading } = useApiRequest<SerialisedPage>({
    trigger: Boolean(slug),
    resource: "page",
    id: slug,
  })

  const page = serialisedPage && {
    ...serialisedPage,
    date: new Date(serialisedPage?.date),
  }

  const token = useToken({ redirectIfNotPresent: false })
  const { config } = useConfig()
  const fetcher = makeFetcher(config, `page/${page?.slug}`, token)

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
          <Button onClick={() => setShowDelete(true)}>Delete</Button>
        </header>
        {isLoading ? (
          <ClipLoader
            loading
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          page && <EditPostForm page={page} />
        )}
      </div>
    </Layout>
  )
}

export default EditPost
