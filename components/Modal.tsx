import styles from '../styles/Modal.module.css'

export const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span onClick={onClose} className={styles.close}>
          &times;
        </span>
        <div className={styles.modalBody}>
          {children}
        </div>
      </div>
    </div>
  )
}