import ReactModal from 'react-modal';
import { useEffect } from 'react';
import styles from './ModalMenu.module.scss';

ReactModal.setAppElement('#root');

export default function ModalMenu({ isOpen, onClose, title, children }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.sidebar}
      closeTimeoutMS={300}
    >
      <button className={styles.closeButton} onClick={onClose}>
        <svg width="32" height="32" aria-label="Close modal">
          <use href="/icon/sprite.svg#icon-close" />
        </svg>
      </button>
      {title && <h2 className={styles.modalTitle}>{title}</h2>}
      <div className={styles.modalBody}>{children}</div>
    </ReactModal>
  );
}
