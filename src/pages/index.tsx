import { FC } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage: FC = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi people</h1>
  </Layout>
)

export default IndexPage
