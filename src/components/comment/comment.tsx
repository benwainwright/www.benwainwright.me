import { FC } from "react"
import { Comment as CommentType } from "../../comments/utils/comment"
import * as styles from "./comment.module.css"

interface CommentProps {
  comment: CommentType
}

const Comment: FC<CommentProps> = props => {
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

export default Comment
