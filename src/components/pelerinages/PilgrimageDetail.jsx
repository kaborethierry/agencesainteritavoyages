'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PhoneIcon from '@mui/icons-material/Phone';
import styles from './PilgrimageDetail.module.css';

export default function PilgrimageDetail({ pilgrimage }) {
  const [activeTab, setActiveTab] = useState('programme');
  const [accordionOpen, setAccordionOpen] = useState({});

  const {
    id,
    title,
    location,
    country,
    duration,
    price,
    currency = 'FCFA',
    startDate,
    endDate,
    start_date,
    end_date,
    description,
    longDescription,
    image,
    gallery = [],
    inclus = [],
    non_inclus = [],
    programme = [],
    featured
  } = pilgrimage;

  // Utiliser les bonnes dates
  const startDateFormatted = startDate || start_date;
  const endDateFormatted = endDate || end_date;
  const itinerary = programme;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };
  
  const formatDate = (date) => {
    if (!date) return 'Date à confirmer';
    
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}/.test(date)) {
      const [year, month, day] = date.split('T')[0].split('-');
      return `${day}/${month}/${year}`;
    }
    
    if (date instanceof Date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    
    if (typeof date === 'string') {
      const parsed = new Date(date);
      if (!isNaN(parsed.getTime())) {
        const day = parsed.getDate().toString().padStart(2, '0');
        const month = (parsed.getMonth() + 1).toString().padStart(2, '0');
        const year = parsed.getFullYear();
        return `${day}/${month}/${year}`;
      }
      if (date.match(/^\d{2}\/\d{2}\/\d{4}/)) {
        return date;
      }
    }
    
    return String(date);
  };

  const toggleAccordion = (index) => {
    setAccordionOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const faqItems = [
    {
      question: "Comment se déroule l'inscription ?",
      answer: "L'inscription se fait en ligne via notre formulaire. Un acompte de 30% est demandé à la réservation, le solde est à régler 30 jours avant le départ."
    },
    {
      question: "Quels sont les documents nécessaires ?",
      answer: "Passeport en cours de validité (6 mois après la date de retour), visa selon la destination, et une assurance rapatriement (incluse dans nos formules)."
    },
    {
      question: "Puis-je annuler mon voyage ?",
      answer: "Oui, selon nos conditions d'annulation. Jusqu'à 60 jours avant, remboursement intégral. Entre 60 et 30 jours, retenue de 25%. Après, selon les frais réels."
    }
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.heroImage}>
          <Image 
            src={image || '/images/pelerinages/default.jpg'} 
            alt={title || 'Voyage spirituel'} 
            fill 
            priority 
            className={styles.heroImg} 
          />
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <span className={styles.heroLocation}>{location}</span>
              <h1 className={styles.heroTitle}>{title}</h1>
              <div className={styles.heroBadges}>
                <span className={styles.heroBadge}>
                  <CalendarTodayIcon fontSize="small" /> {formatDate(startDateFormatted)}
                </span>
                <span className={styles.heroBadge}>
                  <AccessTimeIcon fontSize="small" /> {duration}
                </span>
                {featured && <span className={styles.heroBadgeGold}>★ À la une</span>}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === 'programme' ? styles.tabActive : ''}`} onClick={() => setActiveTab('programme')}>Programme</button>
          <button className={`${styles.tab} ${activeTab === 'tarifs' ? styles.tabActive : ''}`} onClick={() => setActiveTab('tarifs')}>Tarifs & Inclusions</button>
          <button className={`${styles.tab} ${activeTab === 'pratique' ? styles.tabActive : ''}`} onClick={() => setActiveTab('pratique')}>Infos pratiques</button>
          <button className={`${styles.tab} ${activeTab === 'faq' ? styles.tabActive : ''}`} onClick={() => setActiveTab('faq')}>FAQ</button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'programme' && (
            <div>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: longDescription || description || '' }} />
              {itinerary?.length > 0 && (
                <div className={styles.itinerary}>
                  <h3 className={styles.sectionTitle}>Programme détaillé</h3>
                  {itinerary.map((jour, index) => (
                    <div key={index} className={styles.jourItem}>
                      <div className={styles.jourNum}>
                        <span>Jour</span>
                        <strong>{jour.jour || jour.day || index + 1}</strong>
                      </div>
                      <div className={styles.jourContent}>
                        <h4 className={styles.jourTitle}>{jour.titre || jour.title || ''}</h4>
                        <p className={styles.jourDesc}>{jour.description || ''}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'tarifs' && (
            <div className={styles.tarifs}>
              <div className={styles.priceCard}>
                <span className={styles.priceLabel}>Prix par personne</span>
                <span className={styles.priceValue}>{formatPrice(price)}</span>
              </div>
              <div className={styles.inclusionGrid}>
                <div className={styles.included}>
                  <h4 className={styles.inclusionTitle}>
                    <CheckCircleIcon className={styles.inclusionIcon} /> Ce qui est inclus
                  </h4>
                  {inclus?.length > 0 ? (
                    <ul className={styles.inclusionList}>
                      {inclus.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className={styles.emptyMessage}>Informations à venir</p>
                  )}
                </div>
                <div className={styles.notIncluded}>
                  <h4 className={styles.inclusionTitle}>
                    <CancelIcon className={styles.inclusionIcon} /> Ce qui n'est pas inclus
                  </h4>
                  {non_inclus?.length > 0 ? (
                    <ul className={styles.inclusionList}>
                      {non_inclus.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : (
                    <p className={styles.emptyMessage}>Informations à venir</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pratique' && (
            <div className={styles.pratique}>
              <h3 className={styles.sectionTitle}>Informations pratiques</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <CalendarTodayIcon className={styles.infoIcon} />
                  <div>
                    <strong>Dates</strong>
                    <p>Du {formatDate(startDateFormatted)} au {formatDate(endDateFormatted) || 'à confirmer'}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <AccessTimeIcon className={styles.infoIcon} />
                  <div>
                    <strong>Durée</strong>
                    <p>{duration}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <LocationOnIcon className={styles.infoIcon} />
                  <div>
                    <strong>Destination</strong>
                    <p>{location}{country && `, ${country}`}</p>
                  </div>
                </div>
              </div>
              <div className={styles.documents}>
                <h4 className={styles.subTitle}>Documents nécessaires</h4>
                <ul>
                  <li>Passeport valide 6 mois après la date de retour</li>
                  <li>Visa selon destination (assistance disponible)</li>
                  <li>Assurance voyage (incluse dans nos formules)</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className={styles.faq}>
              <h3 className={styles.sectionTitle}>Questions fréquentes</h3>
              {faqItems.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <button className={styles.faqQuestion} onClick={() => toggleAccordion(index)}>
                    {item.question}
                    <span className={styles.faqIcon}>{accordionOpen[index] ? '−' : '+'}</span>
                  </button>
                  {accordionOpen[index] && (
                    <div className={styles.faqAnswer}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {gallery?.length > 0 && (
          <div className={styles.gallery}>
            <h3 className={styles.sectionTitle}>Galerie photos</h3>
            <div className={styles.galleryGrid}>
              {gallery.map((img, index) => (
                <div key={index} className={styles.galleryItem}>
                  <Image 
                    src={img} 
                    alt={`${title} - ${index + 1}`} 
                    width={300} 
                    height={200} 
                    className={styles.galleryImage} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.sidebar}>
        <div className={styles.sidebarCard}>
          <div className={styles.priceDisplay}>
            <span className={styles.priceSmall}>À partir de</span>
            <span className={styles.priceLarge}>{formatPrice(price)}</span>
          </div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <CalendarTodayIcon className={styles.infoRowIcon} />
              <span>Date de départ</span>
              <strong>{formatDate(startDateFormatted)}</strong>
            </div>
            <div className={styles.infoRow}>
              <AccessTimeIcon className={styles.infoRowIcon} />
              <span>Durée</span>
              <strong>{duration}</strong>
            </div>
            <div className={styles.infoRow}>
              <LocationOnIcon className={styles.infoRowIcon} />
              <span>Destination</span>
              <strong>{location}</strong>
            </div>
          </div>
          <Link href={`/inscription?pelerinage=${id}`}>
            <Button variant="primary" size="lg" fullWidth>S'inscrire maintenant</Button>
          </Link>
          <a href="tel:+22625479222">
            <Button variant="ghost" size="md" fullWidth>
              <PhoneIcon /> Nous appeler
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}