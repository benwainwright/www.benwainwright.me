import { Page } from "../../types/page"
import { DateTime } from "luxon"
import { Link } from "gatsby"
import * as styles from "./page-table-row.module.css"

interface PageTableRowProps {
  page: Page
}

export const PageTableRow = ({ page }: PageTableRowProps) => {
  const date = DateTime.fromJSDate(page.date)

  return (
    <tr key={page.slug} className={styles.row}>
      <td className={styles.cell}>
        <Link to={`/edit-post/#${page.slug}`}>{page.title}</Link>
      </td>
      <td className={styles.cell}>{date.toLocaleString(DateTime.DATE_MED)}</td>
      <td className={styles.cell}>No</td>
    </tr>
  )
}
