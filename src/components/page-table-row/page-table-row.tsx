import { Page } from "../../types/page"
import { DateTime } from "luxon"
import { Link } from "gatsby"

interface PageTableRowProps {
  page: Page
}

export const PageTableRow = ({ page }: PageTableRowProps) => {
  const date = DateTime.fromJSDate(page.date)
  const published = page.published
    ? DateTime.fromJSDate(page.published).toLocaleString(DateTime.DATE_MED)
    : "No"

  return (
    <tr key={page.slug}>
      <td>{page.slug}</td>
      <td>
        <Link to={`/edit-post/#${page.slug}`}>{page.title}</Link>
      </td>
      <td>{date.toLocaleString(DateTime.DATE_MED)}</td>
      <td>{page.description}</td>
      <td>{published}</td>
    </tr>
  )
}
