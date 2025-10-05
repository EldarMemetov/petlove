import ReactModal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect } from 'react';
import styles from './Modal.module.css';

ReactModal.setAppElement('#root');

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.content}
    >
      <button className={styles.closeButton} onClick={onClose}>
        <AiOutlineClose />
      </button>
      <h2 className={styles.modalTitle}>{title}</h2>
      <div className={styles.modalBody}>{children}</div>
    </ReactModal>
  );
}
