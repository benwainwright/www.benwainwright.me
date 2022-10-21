import { FC, useState } from "react"
import HeadingTwo from "./heading-two"
import { BiMessageAdd } from "react-icons/bi"
import Comment from "./comment"
import { Comment as CommentType } from "../comments/utils/comment"
import SubmitCommentsForm from "./submit-comment-form"
import ParagraphText from "./paragraph-text"
import { IconButton } from "./icon-button"

interface CommentsProps {
  slug: string
  comments: CommentType[]
}

const Comments: FC<CommentsProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <>
      <HeadingTwo>
        Comments{" "}
        <IconButton icon={BiMessageAdd} onClick={() => setDialogOpen(true)} />
      </HeadingTwo>
      {props.comments.length === 0 ? (
        <ParagraphText>
          No comments have been added for this post yet! Submit one using the
          form below...
        </ParagraphText>
      ) : (
        props.comments
          .slice()
          .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1))
          .map(comment => (
            <Comment
              key={`${String(comment.timestamp)}-${comment.email}`}
              comment={comment}
            ></Comment>
          ))
      )}
      <SubmitCommentsForm
        slug={props.slug}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}

export default Comments
