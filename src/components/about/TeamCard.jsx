// src/components/about/TeamCard.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './TeamCard.module.css';

export default function TeamCard({ member }) {
  const [showOverlay, setShowOverlay] = useState(false);
  
  const { nom, poste, description, email, phone, photo } = member;

  return (
    <div 
      className={styles.card}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <div className={styles.photoWrapper}>
        <Image
          src={photo}
          alt={nom}
          fill
          className={styles.photo}
        />
        
        {/* Overlay avec liens de contact */}
        <div className={`${styles.overlay} ${showOverlay ? styles.overlayVisible : ''}`}>
          <a 
            href={`mailto:${email}`} 
            className={styles.overlayLink}
            aria-label={`Email ${nom}`}
          >
            ✉️
          </a>
          <a 
            href={`tel:${phone}`} 
            className={styles.overlayLink}
            aria-label={`Téléphone ${nom}`}
          >
            📞
          </a>
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.name}>{nom}</h3>
        <span className={styles.poste}>{poste}</span>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}