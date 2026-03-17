// src/components/ui/Modal.jsx
'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.css';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer 
}) {
  // Gestion de la touche Echap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Empêcher la fermeture si on clique à l'intérieur de la modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  // Utiliser createPortal pour rendre la modal au niveau du body
  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        {/* En-tête de la modal */}
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
            <CloseIcon />
          </button>
        </div>

        {/* Corps de la modal */}
        <div className={styles.modalBody}>
          {children}
        </div>

        {/* Pied de la modal (optionnel) */}
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}