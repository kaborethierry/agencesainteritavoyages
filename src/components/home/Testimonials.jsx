// src/components/home/Testimonials.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './Testimonials.module.css';

// Données locales des témoignages
const testimonials = [
  {
    id: 1,
    nom: "Marie D.",
    ville: "OUAGADOUGOU",
    texte: "Ce pèlerinage à Jérusalem a dépassé toutes mes attentes. L'accompagnement spirituel était profond et les guides passionnants. Je reviens transformée.",
    pelerinage: "Jérusalem 2024",
    note: 5,
    photo: "/images/temoins/marie.jpg"
  },
  {
    id: 2,
    nom: "Philippe B.",
    ville: "KAYA",
    texte: "Une organisation parfaite, des hébergements de qualité, et surtout une belle communauté de prière. Je repars l'année prochaine à Rome !",
    pelerinage: "Rome 2024",
    note: 5,
    photo: "/images/temoins/philippe.jpg"
  },
  {
    id: 3,
    nom: "Sœur Anne-Claire",
    ville: "BAMAKO",
    texte: "Merci pour ce beau pèlerinage à Lourdes. Les malades ont été particulièrement bien accompagnés. Une vraie grâce.",
    pelerinage: "Lourdes 2024",
    note: 5,
    photo: "/images/temoins/soeur.jpg"
  },
  {
    id: 4,
    nom: "Jean-Marc et Christine",
    ville: "OUAGADOUGOU",
    texte: "Notre premier pèlerinage en Terre Sainte. Les célébrations sur place étaient émouvantes, les hôtels confortables. À refaire !",
    pelerinage: "Jérusalem 2024",
    note: 4,
    photo: "/images/temoins/couple.jpg"
  },
  {
    id: 5,
    nom: "PASCAL",
    ville: "BOBO DIOULASSO",
    texte: "Fatima était dans mon cœur depuis longtemps. Ce pèlerinage a été un moment de grâce intense. Merci pour l'organisation irréprochable.",
    pelerinage: "Fatima 2024",
    note: 5,
    photo: "/images/temoins/elisabeth.jpg"
  },
  {
    id: 6,
    nom: "Père Michel",
    ville: "DIEDOUGOU",
    texte: "J'ai accompagné un groupe à Medjugorje. L'équipe sur place connaît bien les lieux et les horaires sont bien adaptés aux temps de prière.",
    pelerinage: "Medjugorje 2024",
    note: 5,
    photo: "/images/temoins/pretre.jpg"
  }
];

// Hook personnalisé pour détecter la largeur de l'écran
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { width } = useWindowSize();

  // Déterminer le nombre de slides visibles selon la largeur
  const getVisibleCount = useCallback(() => {
    if (width >= 992) return 3;
    if (width >= 600) return 2;
    return 1;
  }, [width]);

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Fonctions de navigation
  const next = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const goTo = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxIndex, isAutoPlay]);

  // Pause auto-play au survol
  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  // Rendu des étoiles
  const renderStars = (note) => {
    return '★'.repeat(note) + '☆'.repeat(5 - note);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          surtitre="TÉMOIGNAGES"
          titre="Ils ont vécu l'expérience"
          description="Découvrez ce que nos pèlerins disent de leur voyage spirituel avec nous."
          centered={true}
        />

        <div 
          className={styles.carouselWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            className={styles.arrow} 
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Témoignage précédent"
          >
            ‹
          </button>

          <div className={styles.carousel}>
            <div 
              className={styles.track}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <article key={testimonial.id} className={styles.card}>
                  <div className={styles.stars}>
                    {renderStars(testimonial.note)}
                  </div>
                  
                  <blockquote className={styles.quote}>
                    "{testimonial.texte}"
                  </blockquote>
                  
                  <div className={styles.author}>
                    <div className={styles.authorPhoto}>
                      {testimonial.photo ? (
                        <Image
                          src={testimonial.photo}
                          alt={testimonial.nom}
                          width={52}
                          height={52}
                          className={styles.authorImage}
                        />
                      ) : (
                        <div className={styles.authorInitial}>
                          {testimonial.nom.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.authorInfo}>
                      <strong className={styles.authorName}>
                        {testimonial.nom}
                      </strong>
                      <span className={styles.authorDetails}>
                        {testimonial.ville} — {testimonial.pelerinage}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button 
            className={styles.arrow} 
            onClick={next}
            disabled={currentIndex >= maxIndex}
            aria-label="Témoignage suivant"
          >
            ›
          </button>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: Math.ceil(testimonials.length / visibleCount) }).map((_, index) => {
            const dotIndex = index * visibleCount;
            const isActive = dotIndex === currentIndex || 
                           (dotIndex < currentIndex && dotIndex + visibleCount > currentIndex);
            
            return (
              <button
                key={index}
                className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
                onClick={() => goTo(dotIndex)}
                aria-label={`Aller au groupe de témoignages ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}