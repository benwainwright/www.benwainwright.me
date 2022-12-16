import { graphql, Link } from "gatsby"
import { BsFillPersonFill } from "react-icons/bs"
import { FaPencilAlt, FaMapSigns } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import mePhoto from "../assets/images/me.jpg"
import { Anchor, Heading, Layout, ListItem, ParagraphText } from "../components"
import { BlogSummaryData } from "./blog"
import * as styles from "./index.module.css"

interface IndexProps {
  data: {
    allMarkdownRemark: {
      nodes: BlogSummaryData[]
    }
  }
}

const IndexPage = (props: IndexProps) => {
  const [entry] = props.data.allMarkdownRemark.nodes

  if (!entry) {
    throw new Error("Index was executed with incorrect props")
  }

  return (
    <Layout title="Home">
      <img
        className={styles.decorativePhoto}
        src={mePhoto}
        alt="Ben sitting on a stone bench"
      />
      <div className={styles.container}>
        <Heading level={1}>
          <BsFillPersonFill
            className={styles.icon}
            style={{ marginRight: "0.5rem" }}
          />
          About Me
        </Heading>
        <ParagraphText>
          Full stack TypeScript/JavaScript engineer and technical leader with
          experience in AWS services and a variety of other programming
          languages and web technologies. I currently work for{" "}
          <Anchor href="https://www.cinch.co.uk/">Cinch Cars</Anchor> in
          Manchester.
        </ParagraphText>
        <Heading level={2}>
          <FaPencilAlt className={styles.icon} />
          Latest Blog Post
        </Heading>
        <ul>
          <li>
            <ParagraphText>
              <Link to={`/blog/${entry.frontmatter.slug}`}>
                {entry.frontmatter.title}
              </Link>
            </ParagraphText>
          </li>
        </ul>
        <Heading level={2}>
          <FaMapSigns className={styles.icon} />
          Find me elsewhere
        </Heading>
        <ul>
          <ListItem>
            <a href="https://github.com/benwainwright">Github</a>
          </ListItem>
          <ListItem>
            <a href="https://www.linkedin.com/in/bwainwright">LinkedIn</a>
          </ListItem>
        </ul>
        <Heading level={2}>
          <HiOutlineMail className={styles.icon} />
          Get in touch
        </Heading>
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
