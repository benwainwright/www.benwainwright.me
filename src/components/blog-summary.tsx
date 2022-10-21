import { BsFillStarFill } from "react-icons/bs"
import { BlogSummaryData } from "../pages/blog"
import HeadingTwo from "./heading-two"
import ParagraphText from "./paragraph-text"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.css"
import { getStyles } from "../utils/get-styles"

interface BlogEntryProps {
  entry: BlogSummaryData
}

const BlogEntry = (props: BlogEntryProps) => {
  const {
    dateContainer,
    styledStar,
    blogSummaryGrid,
    blogSummaryDescription,
    blogSummaryHeader,
  } = getStyles(
    styles,
    "dateContainer",
    "styledStar",
    "blogSummaryGrid",
    "blogSummaryDescription",
    "blogSummaryHeader"
  )
  return (
    <article className={blogSummaryGrid}>
      <BsFillStarFill className={styledStar} />
      <HeadingTwo className={blogSummaryHeader}>
        <Link to={`/blog/${props.entry.frontmatter.slug}`}>
          {props.entry.frontmatter.title}
        </Link>
      </HeadingTwo>
      <div className={blogSummaryDescription}>
        <ParagraphText>{props.entry.excerpt}</ParagraphText>
        <div className={dateContainer}>{props.entry.frontmatter.date}</div>
      </div>
    </article>
  )
}

export default BlogEntry
