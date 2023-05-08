import { Heading, Layout } from "../components"
import CreatePostForm from "../components/create-post-form/create-post-form"
import * as styles from "./edit-post.module.css"

const CreatePost = () => {
  return (
    <Layout title="Edit Post" needsAuth>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <Heading level={1}>Create Post</Heading>
        </header>
        <CreatePostForm />
      </div>
    </Layout>
  )
}

export default CreatePost
