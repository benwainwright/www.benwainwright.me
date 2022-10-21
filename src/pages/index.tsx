import { FC } from "react"

import { graphql, Link } from "gatsby"
import { BsFillPersonFill } from "react-icons/bs"
import { FaPencilAlt, FaMapSigns } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import mePhoto from "../assets/images/me.jpg"
import Layout from "../components/layout"
import ListItem from "../components/list-item"
import ParagraphText from "../components/paragraph-text"
import HeadingTwo from "../components/heading-two"
import HeadingOne from "../components/heading-one"
import Anchor from "../components/anchor"
import { BlogSummaryData } from "./blog"
import * as styles from "./index.module.css"
import { getStyles } from "../utils/get-styles"

interface IndexProps {
  data: {
    allMarkdownRemark: {
      nodes: BlogSummaryData[]
    }
  }
}

const IndexPage: FC<IndexProps> = props => {
  const { icon, decorativePhoto, container } = getStyles(
    styles,
    "icon",
    "decorativePhoto",
    "container"
  )
  const [entry] = props.data.allMarkdownRemark.nodes

  if (!entry) {
    throw new Error("Index was executed with incorrect props")
  }

  return (
    <Layout title="Home">
      <img
        className={decorativePhoto}
        src={mePhoto}
        alt="Ben sitting on a stone bench"
      />
      <div className={container}>
        <HeadingOne>
          <BsFillPersonFill
            className={icon}
            style={{ marginRight: "0.5rem" }}
          />
          About Me
        </HeadingOne>
        <ParagraphText>
          Full stack TypeScript/JavaScript engineer and technical leader with
          experience in AWS services and a variety of other programming
          languages and web technologies. I currently work for{" "}
          <Anchor href="https://www.cinch.co.uk/">Cinch Cars</Anchor> in
          Manchester.
        </ParagraphText>
        <HeadingTwo>
          <FaPencilAlt className={icon} />
          Latest Blog Post
        </HeadingTwo>
        <ul>
          <li>
            <ParagraphText>
              <Link to={`/blog/${entry.frontmatter.slug}`}>
                {entry.frontmatter.title}
              </Link>
            </ParagraphText>
          </li>
        </ul>
        <HeadingTwo>
          <FaMapSigns className={icon} />
          Find me elsewhere
        </HeadingTwo>
        <ul>
          <ListItem>
            <a href="https://github.com/benwainwright">Github</a>
          </ListItem>
          <ListItem>
            <a href="https://www.linkedin.com/in/bwainwright">LinkedIn</a>
          </ListItem>
        </ul>
        <HeadingTwo>
          <HiOutlineMail className={icon} />
          Get in touch
        </HeadingTwo>
        <ParagraphText>
          You can reach me on{" "}
          <Anchor href="mailto:bwainwright28@gmail.com">
            bwainwright28@gmail.com
          </Anchor>
          . Please note that I&apos;m happilly employed at this time; recruiters
          will probably be ignored.
        </ParagraphText>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { published: { ne: false } } }
      limit: 1
    ) {
      nodes {
        excerpt
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          published
          slug
          title
        }
      }
    }
  }
`

export default IndexPage
