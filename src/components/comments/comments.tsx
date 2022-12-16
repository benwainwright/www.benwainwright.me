import { useState } from "react"
import { BiMessageAdd } from "react-icons/bi"
import { Comment } from "../comment"
import { Comment as CommentType } from "../../comments/utils/comment"
import { SubmitCommentForm } from "../submit-comment-form"
import { ParagraphText } from "../paragraph-text"
import { IconButton } from "../icon-button"
import { Heading } from "../heading"

interface CommentsProps {
  slug: string
  comments: CommentType[]
}

export const Comments = (props: CommentsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  return (
    <>
      <Heading level={2}>
        Comments{" "}
        <IconButton icon={BiMessageAdd} onClick={() => setDialogOpen(true)} />
      </Heading>
      {props.comments.length === 0 ? (
        <ParagraphText>
          No comments have been added for this post yet! Click on the button
          above to add one
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
      <SubmitCommentForm
        slug={props.slug}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
