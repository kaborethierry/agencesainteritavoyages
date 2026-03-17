// src/components/ui/GlobalLoader.jsx
'use client';

import { useState, useEffect } from 'react';
import styles from './GlobalLoader.module.css';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un temps de chargement minimum pour que le loader soit visible
    // Même si la page charge très vite
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 secondes minimum

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loaderContainer}>
        <div className={styles.cross}>
          <div className={styles.crossVertical}></div>
          <div className={styles.crossHorizontal}></div>
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Agence Sainte Rita Voyages</h1>
          <p className={styles.subtitle}>Vers les lieux saints</p>
        </div>
        <div className={styles.spinner}></div>
      </div>
    </div>
  );
}