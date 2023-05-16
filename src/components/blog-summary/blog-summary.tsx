import { BsFillStarFill } from "@react-icons/all-files/bs/BsFillStarFill"
import { BlogSummaryData } from "../../pages/blog"
import { ParagraphText } from "../paragraph-text"
import { Link } from "gatsby"
import * as styles from "./blog-summary.module.css"
import { Heading } from "../heading"
import { DateTime } from "luxon"

interface BlogEntryProps {
  entry: BlogSummaryData
}

export const BlogSummary = (props: BlogEntryProps) => {
  return (
    <article className={styles.blogSummaryGrid}>
      <BsFillStarFill className={styles.styledStar} />
      <Heading level={2} className={styles.blogSummaryHeader}>
        <Link className={styles.summaryLink} to={`/blog/${props.entry.slug}`}>
          {props.entry.title}
        </Link>
      </Heading>
      <div className={styles.blogSummaryDescription}>
        <ParagraphText>{props.entry.description}</ParagraphText>
        <div className={styles.dateContainer}>
          {DateTime.fromMillis(props.entry.date).toLocaleString(
            DateTime.DATE_MED
          )}
        </div>
      </div>
    </article>
  )
}
