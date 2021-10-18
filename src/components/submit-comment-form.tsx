import styled from "@emotion/styled"
import { FC, useEffect, useState } from "react"
import HeadingThree from "./heading-three"
import { useFormik } from "formik"
import axios from "axios"
import { assertComment } from "../comments/utils/comment"
import BeatLoader from "react-spinners/BeatLoader"
import ParagraphText from "./paragraph-text"

const COMMENTS_API = `https://api.benwainwright.me/comments`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const FormField = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  width: 20rem;
`

const FormFieldColumns = styled.div`
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  width: 20rem;
`

const FormLabel = styled.label`
  font-family: "Milliard";
  margin: 0 1rem 0 0;
  width: 3rem;
`

const FormInput = styled.input`
  flex-grow: 999;
`

const FormTextArea = styled.textarea`
  flex-grow: 999;
`

const Button = styled.button`
  flex-grow: 999;
  padding: 0.5rem 1rem;
`

interface SubmitCommentsProps {
  slug: string
}

type SentState = "Ready" | "Sending" | "Complete"

const SubmitCommentsForm: FC<SubmitCommentsProps> = props => {
  const [sentState, setSentState] = useState<SentState>("Ready")

  const formik = useFormik({
    initialValues: {
      author: "",
      email: "",
      message: ""
    },
    onSubmit: async values => {
      const comment = {
        ...values,
        timestamp: Math.floor(new Date(Date.now()).getTime() / 1000)
      }
      assertComment(comment)
      setSentState("Sending")

      await axios.post(`${COMMENTS_API}/${props.slug}`, comment)
      setSentState("Complete")
    }
  })

  useEffect(() => {
    const timeout =
      sentState === "Complete"
        ? setTimeout(() => setSentState("Ready"), 5000)
        : undefined

    return () => timeout && clearTimeout(timeout)
  }, [sentState])

  return (
    <>
      <HeadingThree>Submit Comment</HeadingThree>
      {sentState === "Ready" ? (
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <FormLabel htmlFor="author">Name</FormLabel>
            <FormInput
              type="text"
              name="author"
              id="author"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
          </FormField>

          <FormField>
            <FormLabel htmlFor="email">Email</FormLabel>

            <FormInput
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </FormField>
          <FormFieldColumns>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <FormTextArea
              name="message"
              id="message"
              onChange={formik.handleChange}
              value={formik.values.message}
            ></FormTextArea>
          </FormFieldColumns>
          <FormField>
            <Button type="submit">Save</Button>
          </FormField>
        </Form>
      ) : sentState === "Sending" ? (
        <div>
          <BeatLoader />
        </div>
      ) : (
        <ParagraphText>
          Thanks for your comment! Please note that because this is a statically
          generated site, your comment will not appear straight away.
        </ParagraphText>
      )}
    </>
  )
}
export default SubmitCommentsForm
