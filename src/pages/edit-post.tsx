import ClipLoader from "react-spinners/ClipLoader"
import { Heading, Layout } from "../components"
import { useApiRequest } from "../hooks/use-api-request/use-api-request"
import { SerialisedPage } from "../types/page"
import * as styles from "./edit-post.module.css"
import loadable from "@loadable/component"
import { useEffect, useState } from "react"
import { Button } from "../components/button/button"
const EditPostForm = loadable(
  async () => import("../components/edit-post-form/edit-post-form")
)

const EditPost = () => {
  const [slug, setSlug] = useState("")

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

  return (
    <Layout title="Edit Post" needsAuth>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Heading level={1}>Edit Post</Heading>
          <Button>Delete</Button>
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
