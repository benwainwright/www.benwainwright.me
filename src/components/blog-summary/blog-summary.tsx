import { BsFillStarFill } from "react-icons/bs"
import { BlogSummaryData } from "../../pages/blog"
import { ParagraphText } from "../paragraph-text"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.css"
import { Heading } from "../heading"

interface BlogEntryProps {
  entry: BlogSummaryData
}

export const BlogSummary = (props: BlogEntryProps) => {
  return (
    <article className={styles.blogSummaryGrid}>
      <BsFillStarFill className={styles.styledStar} />
      <Heading
        level={2}
        className={`${styles.heading} ${styles.blogSummaryHeader}`}
      >
        <Link to={`/blog/${props.entry.frontmatter.slug}`}>
          {props.entry.frontmatter.title}
        </Link>
      </Heading>
      <div className={styles.blogSummaryDescription}>
        <ParagraphText>{props.entry.excerpt}</ParagraphText>
        <div className={styles.dateContainer}>
          {props.entry.frontmatter.date}
        </div>
      </div>
    </article>
  )
}
