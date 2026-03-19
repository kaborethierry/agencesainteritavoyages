// src/components/pelerinages/PilgrimageDetail.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
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
    duration,
    price,
    currency,
    startDate,
    endDate,
    description,
    longDescription,
    image,
    gallery = [],
    included = [],
    notIncluded = [],
    itinerary = [],
    featured
  } = pilgrimage;

  // Formatage du prix
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  // Gestion de l'accordéon FAQ
  const toggleAccordion = (index) => {
    setAccordionOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // FAQ simulée
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
      {/* Colonne principale */}
      <div className={styles.main}>
        {/* Image hero */}
        <div className={styles.heroImage}>
          <Image
            src={image}
            alt={title}
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
                  <CalendarTodayIcon fontSize="small" /> {startDate}
                </span>
                <span className={styles.heroBadge}>
                  <AccessTimeIcon fontSize="small" /> {duration}
                </span>
                {featured && (
                  <span className={styles.heroBadgeGold}>
                    ★ À la une
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'programme' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('programme')}
          >
            Programme
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'tarifs' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('tarifs')}
          >
            Tarifs & Inclusions
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'pratique' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('pratique')}
          >
            Infos pratiques
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'faq' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('faq')}
          >
            FAQ
          </button>
        </div>

        {/* Contenu des onglets */}
        <div className={styles.tabContent}>
          {/* Onglet Programme */}
          {activeTab === 'programme' && (
            <div>
              <div className={styles.description} dangerouslySetInnerHTML={{ __html: longDescription || description }} />
              
              {itinerary.length > 0 && (
                <div className={styles.itinerary}>
                  <h3 className={styles.sectionTitle}>Programme détaillé</h3>
                  {itinerary.map((jour, index) => (
                    <div key={index} className={styles.jourItem}>
                      <div className={styles.jourNum}>
                        <span>Jour</span>
                        <strong>{jour.day}</strong>
                      </div>
                      <div className={styles.jourContent}>
                        <h4 className={styles.jourTitle}>{jour.title}</h4>
                        <p className={styles.jourDesc}>{jour.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Onglet Tarifs */}
          {activeTab === 'tarifs' && (
            <div className={styles.tarifs}>
              <div className={styles.priceCard}>
                <span className={styles.priceLabel}>Prix par personne</span>
                <span className={styles.priceValue}>{formatPrice(price, currency)}</span>
              </div>

              <div className={styles.inclusionGrid}>
                <div className={styles.included}>
                  <h4 className={styles.inclusionTitle}>
                    <CheckCircleIcon className={styles.inclusionIcon} /> Ce qui est inclus
                  </h4>
                  <ul className={styles.inclusionList}>
                    {included.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.notIncluded}>
                  <h4 className={styles.inclusionTitle}>
                    <CancelIcon className={styles.inclusionIcon} /> Ce qui n'est pas inclus
                  </h4>
                  <ul className={styles.inclusionList}>
                    {notIncluded.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Infos pratiques */}
          {activeTab === 'pratique' && (
            <div className={styles.pratique}>
              <h3 className={styles.sectionTitle}>Informations pratiques</h3>
              
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <CalendarTodayIcon className={styles.infoIcon} />
                  <div>
                    <strong>Dates</strong>
                    <p>Du {startDate} au {endDate || 'à confirmer'}</p>
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
                    <p>{location}</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <HotelIcon className={styles.infoIcon} />
                  <div>
                    <strong>Hébergement</strong>
                    <p>Hôtels 3* et 4* selon disponibilités</p>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <FlightIcon className={styles.infoIcon} />
                  <div>
                    <strong>Transport</strong>
                    <p>Vols inclus au départ de Paris</p>
                  </div>
                </div>
              </div>

              <div className={styles.documents}>
                <h4 className={styles.subTitle}>Documents nécessaires</h4>
                <ul>
                  <li>Passeport valide 6 mois après le retour</li>
                  <li>Visa (selon destination - nous vous aidons)</li>
                  <li>Carte d'identité pour les ressortissants UE</li>
                </ul>
              </div>
            </div>
          )}

          {/* Onglet FAQ */}
          {activeTab === 'faq' && (
            <div className={styles.faq}>
              <h3 className={styles.sectionTitle}>Questions fréquentes</h3>
              
              {faqItems.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                  <button
                    className={styles.faqQuestion}
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.question}
                    <span className={styles.faqIcon}>
                      {accordionOpen[index] ? '−' : '+'}
                    </span>
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

        {/* Galerie photos */}
        {gallery && gallery.length > 0 && (
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

      {/* Sidebar sticky */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarCard}>
          <div className={styles.priceDisplay}>
            <span className={styles.priceSmall}>À partir de</span>
            <span className={styles.priceLarge}>{formatPrice(price, currency)}</span>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <CalendarTodayIcon className={styles.infoRowIcon} />
              <span>Date de départ</span>
              <strong>{startDate}</strong>
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

          <Button
            href={`/inscription?pelerinage=${id}`}
            variant="primary"
            size="lg"
            fullWidth
          >
            S'inscrire maintenant
          </Button>

          <Button variant="ghost" size="md" fullWidth>
            <PhoneIcon /> Nous appeler
          </Button>
        </div>
      </div>
    </div>
  );
}