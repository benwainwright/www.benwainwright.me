import { ReactNode } from "react"
import { Button } from "../button"
import * as styles from "./dialog.module.css"

interface DialogProps {
  open: boolean
  onCancel: () => void
  onOk: () => void
  children: ReactNode
}
export const Dialog = ({ open, onCancel, onOk, children }: DialogProps) => {
  return (
    <dialog open={open} className={styles.dialog}>
      <div className={styles.modal}>
        <div className={styles.dialogContainer}>
          <div className={styles.dialogContent}>{children}</div>

          <div className={styles.actionButtons}>
            <Button onClick={onOk}>OK</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </div>
    </dialog>
  )
}
