'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import styles from './Hero.module.css';

const slogans = [
  { text: "Voyages de ressourcement spirituel", color: "#FFFFFF" },
  { text: "Expériences uniques pour l’âme et l’esprit", color: "#E8C97A" },
  { text: "Paix  •  Foi  •  Rencontre", color: "#C9A84C" }
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
          ✦ VOYAGES SPIRITUELS
        </div>

        <h1 className={styles.title}>Agence Sainte Rita Voyages</h1>

        <p className={styles.subtitle}>
          &ldquo;Spécialiste des voyages de ressourcement spirituel depuis 2018&ldquo;
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
          <Button href="/voyages" variant="primary" size="lg">
            Découvrir nos voyages
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
