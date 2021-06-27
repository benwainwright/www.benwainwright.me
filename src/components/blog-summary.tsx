import { FC } from "react"
import { BsFillStarFill, BsCalendarFill } from "react-icons/bs"
import { BlogSummaryData } from "../pages/blog"
import HeadingTwo from "./heading-two"
import ParagraphText from "./paragraph-text"
import styled from "@emotion/styled"
import { Link } from "gatsby"

interface BlogEntryProps {
  entry: BlogSummaryData
}

const StyledStar = styled(BsFillStarFill)`
  margin: 0 0.5rem 0 0;
`

const SummaryContents = styled.div`
  margin: 0 0 0 2rem;
`

const DateContainer = styled.div`
  font-family: "Aileron";
  font-weight: lighter;
  margin: -0.5rem 0 0 0;
  font-style: italic;
  font-size: 1rem;
  display: flex;
  align-items: center;
`
const BlogEntry: FC<BlogEntryProps> = props => (
  <article>
    <HeadingTwo>
      <StyledStar />
      <Link to={`/blog/${props.entry.frontmatter.slug}`}>
        {props.entry.frontmatter.title}
      </Link>
    </HeadingTwo>
    <SummaryContents>
      <ParagraphText>{props.entry.excerpt}</ParagraphText>
      <DateContainer>{props.entry.frontmatter.date}</DateContainer>
    </SummaryContents>
  </article>
)

export default BlogEntry
