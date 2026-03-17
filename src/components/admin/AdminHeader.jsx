// src/components/admin/AdminHeader.jsx
'use client';

import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './AdminHeader.module.css';

export default function AdminHeader({ titre, breadcrumb = [], onMenuClick }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    // Mettre en majuscule la première lettre du jour
    setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuToggle} onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <div className={styles.breadcrumb}>
          {breadcrumb.map((item, index) => (
            <span key={index}>{item.label}</span>
          ))}
        </div>
        <h1 className={styles.pageTitle}>{titre}</h1>
      </div>

      <div className={styles.right}>
        <span className={styles.adminName}>👤 Administrateur</span>
        <span className={styles.date}>{currentDate}</span>
      </div>
    </header>
  );
}