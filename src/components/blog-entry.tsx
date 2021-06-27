import { FC, Fragment } from "react"
import { BlogEntryData } from "../pages/blog"

interface BlogEntryProps {
  entry: BlogEntryData
}

const BlogEntry: FC<BlogEntryProps> = props => {
  return (
    <Fragment>
      <h1>{props.entry.frontmatter.title}</h1>
      <h2>{props.entry.frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: props.entry.html }} />
    </Fragment>
  )
}

export default BlogEntry
