import { FC } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const IndexPage: FC = () => (
  <Layout>
    <Seo title="Home" />
    <p>
      Full stack TypeScript/JavaScript engineer with experience in AWS services
      and a variety of other programming languages and web technologies. I
      currently work for the BBC based in MediaCity in Manchester.
    </p>
    <h2>Find me elsewhere</h2>
    <ul>
      <li>
        <a href="https://github.com/benwainwright">Github</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/benwainwright">LinkedIn</a>
      </li>
    </ul>
    <h2>Get in touch</h2>
    <p>
      You can reach me on bwainwright28@gmail.com. Please note that I'm happilly
      employed at this time; recruiters will probably be ignored.
    </p>
  </Layout>
)

export default IndexPage
