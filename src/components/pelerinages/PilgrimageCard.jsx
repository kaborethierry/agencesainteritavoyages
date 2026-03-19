// src/components/pelerinages/PilgrimageCard.jsx
'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styles from './PilgrimageCard.module.css';

export default function PilgrimageCard({ pilgrimage }) {
  const router = useRouter();

  const {
    id,
    title,
    location,
    duration,
    price,
    currency,
    startDate,
    image,
    description
  } = pilgrimage;

  // Formatage du prix en FCFA
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  const handleClick = () => {
    router.push(`/pelerinages/${id}`);
  };

  // Déterminer si c'est un pèlerinage à la une
  const isFeatured = pilgrimage.featured;

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
        {isFeatured && (
          <span className={styles.badge}>À la une</span>
        )}
        <span className={styles.badgeDuration}>{duration}</span>
      </div>

      <div className={styles.body}>
        <p className={styles.location}>
          <LocationOnIcon fontSize="small" /> {location}
        </p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>
          {description && description.length > 80 
            ? description.substring(0, 80) + '...' 
            : description}
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>À partir de</span>
          <span className={styles.price}>{formatPrice(price, currency)}</span>
        </div>
        
        <div className={styles.dateInfo}>
          <span className={styles.dates}>
            <CalendarTodayIcon fontSize="small" /> {startDate}
          </span>
        </div>
        
        <button className={styles.cardBtn}>
          Voir le programme →
        </button>
      </div>
    </article>
  );
}