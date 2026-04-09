'use client';

import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './AdminHeader.module.css';

export default function AdminHeader({ onMenuClick, isMobile = false }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
  }, []);

  const handleClick = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {(isMobile || window.innerWidth <= 992) && (
          <button className={styles.menuToggle} onClick={handleClick} aria-label="Menu">
            <MenuIcon />
          </button>
        )}
        <div className={styles.breadcrumb}>
          <span>Administration</span>
        </div>
        <h1 className={styles.pageTitle}>Tableau de bord</h1>
      </div>

      <div className={styles.right}>
        <span className={styles.adminName}>Administrateur</span>
        <span className={styles.date}>{currentDate}</span>
      </div>
    </header>
  );
}