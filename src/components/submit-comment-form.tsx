import styled from "@emotion/styled"
import { FC, useEffect, useState } from "react"
import HeadingThree from "./heading-three"
import { useFormik } from "formik"
import axios from "axios"
import { IoMdClose } from "react-icons/io"
import { assertComment } from "../comments/utils/comment"
import BeatLoader from "react-spinners/BeatLoader"
import ParagraphText from "./paragraph-text"
import * as styles from "./submit-comments-form.module.css"
import { getStyles } from "../utils/get-styles"
import { IconButton } from "./icon-button"

const COMMENTS_API = `https://api.benwainwright.me/comments`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormField = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  border: 1px solid black;
  align-items: center;
`

const FormLabel = styled.label`
  font-family: "Milliard";
  margin: 0 1rem 0 0.5rem;
  line-height: 1.5rem;
  padding: 0;
  width: 3rem;
`

const FormInput = styled.input`
  flex-grow: 999;
  line-height: 2rem;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
`

const FormTextArea = styled.textarea`
  flex-grow: 999;
  font-size: 1.2rem;
  height: 10rem;
`

const Button = styled.button`
  flex-grow: 999;
  padding: 0.5rem 1rem;
`

interface SubmitCommentsProps {
  slug: string
  open: boolean
  onClose: () => void
}

type SentState = "Ready" | "Sending" | "Complete"

const SubmitCommentsForm: FC<SubmitCommentsProps> = props => {
  const [sentState, setSentState] = useState<SentState>("Ready")

  const {
    dialogContainer,
    modal,
    header,
    headerText,
    formGrid,
    commentDescription,
    container,
  } = getStyles(
    styles,
    "dialogContainer",
    "modal",
    "header",
    "headerText",
    "commentDescription",
    "container",
    "formGrid"
  )

  const formik = useFormik({
    initialValues: {
      author: "",
      email: "",
      message: "",
    },
    onSubmit: async values => {
      const comment = {
        ...values,
        timestamp: Math.floor(new Date(Date.now()).getTime() / 1000),
      }
      assertComment(comment)
      setSentState("Sending")

      await axios.post(`${COMMENTS_API}/${props.slug}`, comment)
      setSentState("Complete")
    },
  })

  const sendingMessage =
    sentState === "Sending" ? (
      <div>
        <BeatLoader />
      </div>
    ) : (
      <ParagraphText>
        Thanks for your comment! Please note that because this is a statically
        generated site, your comment will not appear straight away.
      </ParagraphText>
    )

  return (
    <dialog open={props.open}>
      <div className={modal}>
        <div className={dialogContainer}>
          <header className={header}>
            <HeadingThree className={headerText}>Submit Comment</HeadingThree>
            <IconButton icon={IoMdClose} onClick={props.onClose} />
          </header>
          <div className={container}>
            {sentState === "Ready" ? (
              <Form onSubmit={formik.handleSubmit} className={formGrid}>
                <FormField>
                  <FormLabel htmlFor="author">Name</FormLabel>
                  <FormInput
                    type="text"
                    name="author"
                    required
                    id="author"
                    onChange={formik.handleChange}
                    value={formik.values.author}
                  />
                </FormField>

                <FormField>
                  <FormLabel htmlFor="email">Email</FormLabel>

                  <FormInput
                    type="email"
                    required
                    name="email"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </FormField>

                <div className={commentDescription}>
                  <FormLabel htmlFor="comment">Comment</FormLabel>
                  <FormTextArea
                    name="message"
                    id="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  ></FormTextArea>
                </div>
                <FormField>
                  <Button type="submit">Save</Button>
                </FormField>
              </Form>
            ) : (
              sendingMessage
            )}
          </div>
        </div>
      </div>
    </dialog>
  )
}
export default SubmitCommentsForm
