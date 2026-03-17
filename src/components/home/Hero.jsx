// src/components/home/Hero.jsx
'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import styles from './Hero.module.css';

const slogans = [
  { text: "Marchez sur les pas du Christ", color: "#FFFFFF" },
  { text: "Vivez une expérience spirituelle inoubliable", color: "#E8C97A" },
  { text: "Foi  •  Paix  •  Rencontre", color: "#C9A84C" }
];

export default function Hero() {
  const [currentSlogan, setCurrentSlogan] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); // Fade out
      setTimeout(() => {
        setCurrentSlogan((prev) => (prev + 1) % slogans.length);
        setIsVisible(true); // Fade in avec le nouveau texte
      }, 400); // Doit correspondre à la durée de transition CSS
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleScrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <div className={styles.badge}>
          ✝ PÈLERINAGES CHRÉTIENS
        </div>

        <h1 className={styles.title}>Agence Sainte Rita voyages</h1>

        <p className={styles.subtitle}>
          &ldquo;Spécialiste des voyages spirituels depuis 2004&ldquo;
        </p>

        <div className={styles.sloganWrapper}>
          <p
            className={`${styles.slogan} ${isVisible ? styles.sloganVisible : ''}`}
            style={{ color: slogans[currentSlogan].color }}
          >
            {slogans[currentSlogan].text}
          </p>
        </div>

        <div className={styles.ctaGroup}>
          <Button href="/pelerinages" variant="primary" size="lg">
            Découvrir nos pèlerinages
          </Button>
          <Button href="/contact" variant="outlineWhite" size="lg">
            Nous contacter
          </Button>
        </div>
      </div>

      <div className={styles.scrollIndicator} onClick={handleScrollToContent}></div>
    </section>
  );
}