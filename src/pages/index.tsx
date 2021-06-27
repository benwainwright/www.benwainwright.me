import { FC } from "react"

import { BsFillPersonFill } from "react-icons/bs"
import { FaMapSigns } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import mePhoto from "../assets/images/me.jpg"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"
import HeadingTwo from "../components/heading-two"
import HeadingOne from "../components/heading-one"
import Anchor from "../components/anchor"
import styled from "@emotion/styled"

const Container = styled.main`
  grid-column-start: 2;
  grid-row-start: 2;
  padding-left: 2rem;
`

const DecorativePhoto = styled.img`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  object-fit: cover;
  width: 100%;
  height: 100%;
`

const IndexPage: FC = () => (
  <Layout>
    <DecorativePhoto src={mePhoto} alt="Ben sitting on a stone bench" />
    <Container>
      <Seo title="Home" />
      <HeadingOne icon={BsFillPersonFill}>About Me</HeadingOne>
      <ParagraphText>
        Full stack TypeScript/JavaScript engineer with experience in AWS
        services and a variety of other programming languages and web
        technologies. I currently work for the BBC based in MediaCity in
        Manchester.
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
        You can reach me on bwainwright28@gmail.com. Please note that I'm
        happilly employed at this time; recruiters will probably be ignored.
      </ParagraphText>
    </Container>
  </Layout>
)

export default IndexPage
