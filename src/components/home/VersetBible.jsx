// src/components/home/VersetBible.jsx
'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './VersetBible.module.css';

const verset = "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.";
const reference = "Jérémie 29:11";

export default function VersetBible() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Une fois visible, on peut arrêter d'observer
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3, // 30% visible
        rootMargin: '0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.overlay}></div>
      <div className={`${styles.content} ${isVisible ? styles.contentVisible : ''}`}>
        <div className={styles.crossDivider}></div>
        <blockquote className={styles.verset}>
          {verset}
        </blockquote>
        <cite className={styles.reference}>
          — {reference}
        </cite>
      </div>
    </section>
  );
}