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
    currency = 'FCFA',
    startDate,
    image,
    description
  } = pilgrimage;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  const handleClick = () => {
    router.push(`/pelerinages/${id}`);
  };

  const isFeatured = pilgrimage.featured;
  
  // Fonction pour formater la date correctement
  const formatDate = (date) => {
    if (!date) return 'Date à confirmer';
    
    // Si c'est une chaîne ISO (YYYY-MM-DD) - le format de la base de données
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
      const [year, month, day] = date.split('T')[0].split('-');
      return `${day}/${month}/${year}`;
    }
    
    // Si c'est un objet Date
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    // Si c'est une chaîne avec un autre format
    if (typeof date === 'string') {
      // Essayer de parser
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        const day = parsed.getDate().toString().padStart(2, '0');
        const month = (parsed.getMonth() + 1).toString().padStart(2, '0');
        const year = parsed.getFullYear();
        return `${day}/${month}/${year}`;
      }
      // Si c'est déjà au format DD/MM/YYYY
      if (date.match(/^\d{2}\/\d{2}\/\d{4}/)) {
        return date;
      }
    }
    
    return String(date);
  };

  return (
    <article className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <Image
          src={image || '/images/pelerinages/default.jpg'}
          alt={title || 'Voyage spirituel'}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          priority={false}
        />
        {isFeatured && <span className={styles.badge}>À la une</span>}
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
          <span className={styles.price}>{formatPrice(price)}</span>
        </div>
        <div className={styles.dateInfo}>
          <span className={styles.dates}>
            <CalendarTodayIcon fontSize="small" /> {formatDate(startDate)}
          </span>
        </div>
        <button className={styles.cardBtn}>Voir le programme →</button>
      </div>
    </article>
  );
}