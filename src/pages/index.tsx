import { graphql, Link } from "gatsby"
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill"
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt"
import { FaMapSigns } from "@react-icons/all-files/fa/FaMapSigns"
import { HiOutlineMail } from "@react-icons/all-files/hi/HiOutlineMail"
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
          <ListItem>
            <ParagraphText>
              <Link to={`/blog/${entry.frontmatter.slug}`}>
                {entry.frontmatter.title}
              </Link>
            </ParagraphText>
          </ListItem>
        </ul>
        <Heading level={2}>
          <FaMapSigns className={styles.icon} />
          Find me elsewhere
        </Heading>
        <ul>
          <ListItem>
            <ParagraphText>
              <Link to="https://github.com/benwainwright">Github</Link>
            </ParagraphText>
          </ListItem>
          <ListItem>
            <ParagraphText>
              <Link to="https://www.linkedin.com/in/bwainwright">LinkedIn</Link>
            </ParagraphText>
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
          . I am currently looking for new employment. Interested? Hit me up on
          LinkedIn (see link above).
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
