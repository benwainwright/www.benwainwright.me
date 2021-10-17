import React, { FC } from "react"
import HeadingTwo from "./heading-two"
import HeadingThree from "./heading-three"
import Comment from "./comment"
import { Comment as CommentType } from "../comments/utils/comment"

interface CommentsProps {
  comments: CommentType[]
}

const Comments: FC<CommentsProps> = props => (
  <>
    <HeadingTwo>Comments</HeadingTwo>
    {props.comments.map(comment => (
      <Comment comment={comment}></Comment>
    ))}
    <HeadingThree>Submit Comment</HeadingThree>
  </>
)

export default Comments
