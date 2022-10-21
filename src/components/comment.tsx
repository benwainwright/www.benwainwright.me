import styled from "@emotion/styled"
import { FC } from "react"
import { Comment as CommentType } from "../comments/utils/comment"

interface CommentProps {
  comment: CommentType
}

const CommentContainer = styled.p`
  display: flex;
  font-family: "Milliard";
  @media (max-width: 800px) {
    line-height: 1.7rem;
  }
  font-size: 1.15rem;
  line-height: 2rem;
  background-color: #bdd9f0;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid black;
  margin: 1rem 0 1rem 0;
`

const Message = styled.div`
  flex-grow: 999;
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: lighter;
  font-size: 0.8rem;
  line-height: 1.2rem;
`

const MetaRow = styled.div`
  text-align: right;
  color: black;
  font-weight: bold;
`

const Comment: FC<CommentProps> = props => {
  const date = new Date(props.comment.timestamp * 1000)
  return (
    <CommentContainer>
      <Message>{props.comment.message}</Message>
      <Meta>
        <MetaRow>{props.comment.author}</MetaRow>
        <MetaRow>{date.toDateString()}</MetaRow>
        <MetaRow>{date.toLocaleTimeString()}</MetaRow>
      </Meta>
    </CommentContainer>
  )
}

export default Comment
