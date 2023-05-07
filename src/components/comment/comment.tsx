import { Comment as CommentType } from "../../backend/utils/comment"
import * as styles from "./comment.module.css"

interface CommentProps {
  comment: CommentType
}

export const Comment = (props: CommentProps) => {
  const date = new Date(props.comment.timestamp * 1000)
  return (
    <p className={styles.commentContainer}>
      <div className={styles.message}>{props.comment.message}</div>
      <div className={styles.meta}>
        <div className={styles.metaRow}>{props.comment.author}</div>
        <div className={styles.metaRow}>{date.toDateString()}</div>
        <div className={styles.metaRow}>{date.toLocaleTimeString()}</div>
      </div>
    </p>
  )
}
