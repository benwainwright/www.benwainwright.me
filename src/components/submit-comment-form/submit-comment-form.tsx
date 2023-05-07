import { useState } from "react"
import { useFormik } from "formik"
import axios from "axios"
import { IoMdClose } from "@react-icons/all-files/io/IoMdClose"
import { assertComment } from "../../backend/comments/utils/comment"
import BeatLoader from "react-spinners/BeatLoader"
import { ParagraphText } from "../paragraph-text"
import * as styles from "./submit-comment-form.module.css"
import { IconButton } from "../icon-button"
import { Heading } from "../heading"
import { Input } from "../input"
import { TextArea } from "../textarea"

const COMMENTS_API = `https://api.benwainwright.me/comments`

interface SubmitCommentsProps {
  slug: string
  open: boolean
  onClose: () => void
}

type SentState = "Ready" | "Sending" | "Complete"

export const SubmitCommentForm = (props: SubmitCommentsProps) => {
  const [sentState, setSentState] = useState<SentState>("Ready")

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
    <dialog open={props.open} className={styles.dialog}>
      <div className={styles.modal}>
        <div className={styles.dialogContainer}>
          <header className={styles.header}>
            <Heading level={3} className={styles.headerText}>
              Submit Comment
            </Heading>
            <IconButton
              icon={IoMdClose}
              onClick={() => {
                props.onClose()
                formik.resetForm()
                setSentState("Ready")
              }}
            />
          </header>
          <div className={styles.container}>
            {sentState === "Ready" ? (
              <form onSubmit={formik.handleSubmit} className={styles.formGrid}>
                <Input
                  label="Author"
                  name="author"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                />

                <Input
                  label="Email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                />

                <TextArea
                  label="Comment"
                  name="message"
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
                <div className={styles.formField}>
                  <button className={styles.formButton} type="submit">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              sendingMessage
            )}
          </div>
        </div>
      </div>
    </dialog>
  )
}
