import { FC } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import ParagraphText from "../components/paragraph-text"

const IndexPage: FC = () => (
  <Layout>
    <Seo title="Home" />
    <ParagraphText>
      Full stack TypeScript/JavaScript engineer with experience in AWS services
      and a variety of other programming languages and web technologies. I
      currently work for the BBC based in MediaCity in Manchester.
    </ParagraphText>
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
    <ParagraphText>
      You can reach me on bwainwright28@gmail.com. Please note that I'm happilly
      employed at this time; recruiters will probably be ignored.
    </ParagraphText>
  </Layout>
)

export default IndexPage
