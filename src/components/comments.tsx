import { FC } from "react"
import HeadingTwo from "./heading-two"
import Comment from "./comment"
import { Comment as CommentType } from "../comments/utils/comment"
import SubmitCommentsForm from "./submit-comment-form"

interface CommentsProps {
  slug: string
  comments: CommentType[]
}

const Comments: FC<CommentsProps> = props => (
  <>
    <HeadingTwo>Comments</HeadingTwo>
    {props.comments
      .slice()
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
      .map(comment => (
        <Comment comment={comment}></Comment>
      ))}
    <SubmitCommentsForm slug={props.slug} />
  </>
)

export default Comments
