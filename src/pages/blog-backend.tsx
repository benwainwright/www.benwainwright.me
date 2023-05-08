import { Heading, Layout } from "../components"
import { useApiRequest } from "../hooks/use-api-request/use-api-request"
import { SerialisedPage } from "../types/page"
import ClipLoader from "react-spinners/ClipLoader"
import * as styles from "./blog-backend.module.css"
import { PageTableRow } from "../components/page-table-row/page-table-row"
import { Button } from "../components/button/button"
import { navigate } from "gatsby"

const BlogBackend = () => {
  const { data: serialisedPages, isLoading } = useApiRequest<SerialisedPage[]>({
    resource: "page",
  })

  const pages = serialisedPages?.map(page => ({
    ...page,
    date: new Date(page.date),
  }))

  return (
    <Layout title="Blog Backend" needsAuth>
      <div className={styles.pageContainer}>
        <Heading level={1} className={styles.heading}>
          <span>Pages</span>
          <Button onClick={async () => navigate(`/create-post/`)}>
            Create
          </Button>
        </Heading>
        {isLoading ? (
          <ClipLoader
            loading
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <table className={styles.table}>
            <thead>
              <tr className={styles.row}>
                <th className={styles.cell}>Title</th>
                <th className={styles.cell}>Date</th>
                <th className={styles.cell}>Status</th>
              </tr>
            </thead>
            <tbody>
              {pages?.map(page => (
                <PageTableRow key={page.slug} page={page} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  )
}

export default BlogBackend
