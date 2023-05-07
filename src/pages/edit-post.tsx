import ClipLoader from "react-spinners/ClipLoader"
import { Heading, Layout } from "../components"
import { EditPostForm } from "../components/edit-post-form/edit-post-form"
import { useApiRequest } from "../hooks/use-api-request/use-api-request"
import { SerialisedPage } from "../types/page"
import * as styles from "./edit-post.module.css"

const EditPost = () => {
  const slug = window.location.hash.slice(1)

  const { data: serialisedPage, isLoading } = useApiRequest<SerialisedPage>(
    `page/${slug}`
  )

  const page = serialisedPage && {
    ...serialisedPage,
    date: serialisedPage?.date && new Date(serialisedPage?.date),
    published: serialisedPage?.published && new Date(serialisedPage.published),
  }

  console.log(page)

  return (
    <Layout title="Edit Post">
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Heading className={styles.headerH1} level={1}>
            Edit Post
          </Heading>
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
