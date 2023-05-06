import { Layout } from "../components"
import { useApiRequest } from "../hooks/use-api-request/use-api-request"

const BlogBackend = props => {
  const { data } = useApiRequest("posts")
  return (
    <Layout title="Blog Backend">
      <p>Test</p>
    </Layout>
  )
}

export default BlogBackend
