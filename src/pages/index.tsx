import { FC } from "react"

import { BsFillPersonFill } from "react-icons/bs"
import { FaMapSigns } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"
import HeadingTwo from "../components/heading-two"
import HeadingOne from "../components/heading-one"
import Anchor from "../components/anchor"

const IndexPage: FC = () => (
  <Layout>
    <Seo title="Home" />
    <HeadingOne icon={BsFillPersonFill}>About Me</HeadingOne>
    <ParagraphText>
      Full stack TypeScript/JavaScript engineer with experience in AWS services
      and a variety of other programming languages and web technologies. I
      currently work for the BBC based in MediaCity in Manchester.
    </ParagraphText>
    <HeadingTwo icon={FaMapSigns}>Find me elsewhere</HeadingTwo>
    <ul>
      <ListItem>
        <Anchor href="https://github.com/benwainwright">Github</Anchor>
      </ListItem>
      <ListItem>
        <Anchor href="https://www.linkedin.com/in/benwainwright">
          LinkedIn
        </Anchor>
      </ListItem>
    </ul>
    <HeadingTwo icon={HiOutlineMail}>Get in touch</HeadingTwo>
    <ParagraphText>
      You can reach me on bwainwright28@gmail.com. Please note that I'm happilly
      employed at this time; recruiters will probably be ignored.
    </ParagraphText>
  </Layout>
)

export default IndexPage
