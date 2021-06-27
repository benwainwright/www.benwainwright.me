import { FC } from "react"
import { BsFillStarFill } from "react-icons/bs"
import { BlogSummaryData } from "../pages/blog"
import HeadingTwo from "./heading-two"
import ParagraphText from "./paragraph-text"
import { Link } from "gatsby"

interface BlogEntryProps {
  entry: BlogSummaryData
}

const BlogEntry: FC<BlogEntryProps> = props => (
  <article>
    <HeadingTwo icon={BsFillStarFill}>
      <Link to={`/blog/${props.entry.frontmatter.slug}`}>
        {props.entry.frontmatter.title}
      </Link>
    </HeadingTwo>
    <p role="doc-subtitle">{props.entry.frontmatter.date}</p>
    <ParagraphText>{props.entry.excerpt}</ParagraphText>
  </article>
)

export default BlogEntry
