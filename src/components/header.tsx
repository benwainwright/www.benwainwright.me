import { useState } from "react"
import { Link } from "gatsby"
import { HiOutlineMenu } from "react-icons/hi"
import * as styles from "./header.module.css"
import { getStyles } from "../utils/get-styles"
import { IconButton } from "./icon-button"

interface HeaderProps {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const {
    submenuShow,
    menuButton,
    header,
    link,
    homeLink,
    submenu,
    mainBar,
  } = getStyles(
    styles,
    "header",
    "submenuShow",
    "mainBar",
    "container",
    "menuButton",
    "link",
    "homeLink",
    "submenu"
  )

  const menuClasses = showMenu ? [submenu, submenuShow] : [submenu]

  return (
    <div className={header}>
      <div className={mainBar}>
        <Link className={`${homeLink} ${link}`} to="/">
          {siteTitle}
        </Link>
        <IconButton
          className={menuButton}
          icon={HiOutlineMenu}
          onClick={() => setShowMenu(value => !value)}
        />
      </div>
      <div className={menuClasses.join(" ")}>
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
