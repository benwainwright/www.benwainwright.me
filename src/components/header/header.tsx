import { useState } from "react"
import { Link } from "gatsby"
import { HiOutlineMenu } from "@react-icons/all-files/hi/HiOutlineMenu"
import * as styles from "./header.module.css"
import { IconButton } from "../icon-button"

interface HeaderProps {
  siteTitle: string
}

export const Header = ({ siteTitle }: HeaderProps) => {
  const [showMenu, setShowMenu] = useState(false)

  const menuClasses = showMenu
    ? [styles.submenu, styles.submenuShow]
    : [styles.submenu]

  return (
    <div className={styles.header}>
      <div className={styles.mainBar}>
        <div className={styles.homeLinkContainer}>
          <Link className={`${styles.homeLink} ${styles.link}`} to="/">
            {siteTitle}
          </Link>
        </div>
        <IconButton
          className={styles.menuButton}
          icon={HiOutlineMenu}
          onClick={() => setShowMenu(value => !value)}
        />
      </div>
      <div className={menuClasses.join(" ")}>
        <Link className={styles.link} to="/blog">
          Blog
        </Link>
        <Link className={styles.link} to="/this-site">
          This Site
        </Link>
      </div>
    </div>
  )
}
