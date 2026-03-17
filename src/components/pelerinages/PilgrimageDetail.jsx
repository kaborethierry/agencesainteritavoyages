// src/components/pelerinages/PilgrimageDetail.jsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
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

  // Simuler des places disponibles (à remplacer par des données réelles)
  const placesTotal = 30;
  const placesPrises = 22;
  const placesRestantes = placesTotal - placesPrises;
  const placesWarning = placesRestantes < 5 && placesRestantes > 0;
  const complet = placesRestantes === 0;

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
      question: "Puis-je annuler mon pèlerinage ?",
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
                <span className={styles.heroBadge}>📅 {startDate}</span>
                <span className={styles.heroBadge}>⏱️ {duration}</span>
                {featured && <span className={styles.heroBadgeGold}>🌟 À la une</span>}
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
                  <h4 className={styles.inclusionTitle}>✅ Ce qui est inclus</h4>
                  <ul className={styles.inclusionList}>
                    {included.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className={styles.notIncluded}>
                  <h4 className={styles.inclusionTitle}>❌ Ce qui n'est pas inclus</h4>
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
                  <strong>📅 Dates</strong>
                  <p>Du {startDate} au {endDate || 'à confirmer'}</p>
                </div>
                <div className={styles.infoItem}>
                  <strong>⏱️ Durée</strong>
                  <p>{duration}</p>
                </div>
                <div className={styles.infoItem}>
                  <strong>📍 Destination</strong>
                  <p>{location}</p>
                </div>
                <div className={styles.infoItem}>
                  <strong>👥 Groupe</strong>
                  <p>20 à 40 personnes</p>
                </div>
                <div className={styles.infoItem}>
                  <strong>🛏️ Hébergement</strong>
                  <p>Hôtels 3* et 4* selon disponibilités</p>
                </div>
                <div className={styles.infoItem}>
                  <strong>✈️ Transport</strong>
                  <p>Vols inclus au départ de Paris</p>
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
              <span>📅 Date de départ</span>
              <strong>{startDate}</strong>
            </div>
            <div className={styles.infoRow}>
              <span>⏱️ Durée</span>
              <strong>{duration}</strong>
            </div>
            <div className={styles.infoRow}>
              <span>📍 Destination</span>
              <strong>{location}</strong>
            </div>
            <div className={styles.infoRow}>
              <span>👥 Places restantes</span>
              <strong className={placesWarning ? styles.warningText : ''}>
                {placesRestantes} / {placesTotal}
              </strong>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(placesPrises / placesTotal) * 100}%` }}
            ></div>
          </div>

          {placesWarning && (
            <p className={styles.warningMessage}>
              ⚡ Plus que {placesRestantes} places disponibles !
            </p>
          )}

          {complet && (
            <p className={styles.completMessage}>
              Désolé, ce pèlerinage est complet
            </p>
          )}

          <Button
            href={`/inscription?pelerinage=${id}`}
            variant="primary"
            size="lg"
            fullWidth
            disabled={complet}
          >
            {complet ? 'Complet' : "S'inscrire maintenant"}
          </Button>

          <Button variant="ghost" size="md" fullWidth>
            📞 Nous appeler
          </Button>
        </div>
      </div>
    </div>
  );
}