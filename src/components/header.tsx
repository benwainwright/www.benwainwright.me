import { FC } from "react"
import { Link } from "gatsby"
import * as styles from "./header.module.css"
import { getStyles } from "../utils/get-styles"

interface HeaderProps {
  siteTitle: string
}

const Header: FC<HeaderProps> = ({ siteTitle }) => {
  const { header, container, link, homeLink } = getStyles(
    styles,
    "header",
    "container",
    "link",
    "homeLink"
  )
  return (
    <div className={header}>
      <div className={container}>
        <Link className={`${homeLink} ${link}`} to="/">
          {siteTitle}
        </Link>
        <Link className={link} to="/blog">
          Blog
        </Link>
        <Link className={link} to="/this-site">
          This Site
        </Link>
      </div>
    </div>
  )
}

export default Header
