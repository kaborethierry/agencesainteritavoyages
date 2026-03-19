'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './PhotoGallery.module.css';

const photos = [
  { id: 1, src: '/images/gallery/gallery-1.jpg', alt: 'Voyage Terre Sainte' },
  { id: 2, src: '/images/gallery/gallery-2.jpg', alt: 'Voyage Lourdes' },
  { id: 3, src: '/images/gallery/gallery-3.jpg', alt: 'Voyage Fatima' },
  { id: 4, src: '/images/gallery/gallery-4.jpg', alt: 'Voyage Rome' },
  { id: 5, src: '/images/gallery/gallery-5.jpg', alt: 'Voyage Medjugorje' }
];

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const galleryRef = useRef(null);

  // Animation au scroll (FIX nettoyage observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 🔥 évite répétition inutile
        }
      },
      { threshold: 0.2 }
    );

    if (galleryRef.current) observer.observe(galleryRef.current);

    return () => observer.disconnect();
  }, []);

  // Ouvrir lightbox
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(photos[index]);
    document.body.style.overflow = 'hidden';
  };

  // Fermer lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  // Navigation
  const nextImage = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  };

  // Clavier (FIX dépendances propres)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <section ref={galleryRef} className={styles.section}>
      <div className="container">
        <SectionTitle
          surtitre="MOMENTS DE GRÂCE"
          titre="Galerie voyages"
          centered
        />

        <div className={styles.galleryGrid}>
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`${styles.galleryItem} ${
                isVisible ? styles.galleryItemVisible : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw,
                         (max-width: 1200px) 50vw,
                         33vw"
                  className={styles.image}
                />

                <div className={styles.overlay}>
                  <ZoomInIcon className={styles.zoomIcon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeLightbox}>
              <CloseIcon />
            </button>

            <button
              className={`${styles.navBtn} ${styles.left}`}
              onClick={prevImage}
            >
              <NavigateBeforeIcon />
            </button>

            <div className={styles.lightboxImageWrapper}>
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className={styles.lightboxImage}
                priority
              />
            </div>

            <button
              className={`${styles.navBtn} ${styles.right}`}
              onClick={nextImage}
            >
              <NavigateNextIcon />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}