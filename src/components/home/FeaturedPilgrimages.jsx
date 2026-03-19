// src/components/home/FeaturedPilgrimages.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styles from './FeaturedPilgrimages.module.css';

// Données réelles des pèlerinages à la une
const mockPilgrimages = [
  {
    id: 'terre-sainte-jerusalem-paques-2026',
    title: 'Terre Sainte – Jérusalem (Spécial Pâques)',
    location: 'Israël',
    duration: '13 jours / 12 nuits',
    price: 2000000,
    currency: 'FCFA',
    startDate: '27 mars 2026',
    description: 'Voyage en Terre Sainte permettant de marcher sur les traces du Christ et de vivre une expérience spirituelle profonde au cœur des lieux saints de Jérusalem.',
    image: '/images/pelerinages/jerusalem.jpg',
    featured: true,
  },
  {
    id: 'pologne-faustine-jean-paul-ii-2026',
    title: 'Pologne – Sur les pas de Sainte Faustine et Saint Jean-Paul II',
    location: 'Pologne',
    duration: '17 jours / 16 nuits',
    price: 2500000,
    currency: 'FCFA',
    startDate: '08 avril 2026',
    description: 'Voyage sur les pas de Sainte Faustine et de Saint Jean-Paul II, figures majeures de la foi catholique en Pologne.',
    image: '/images/pelerinages/pologne.jpg',
    featured: true,
  },
  {
    id: 'grand-circuit-marial-europe-2026',
    title: 'Grand Circuit Marial en Europe',
    location: 'Banneux, Lisieux, Lourdes, Fatima, Medjugorje, Rome',
    duration: '17 jours / 16 nuits',
    price: 3000000,
    currency: 'FCFA',
    startDate: '04 mai 2026',
    description: 'Grand circuit permettant de visiter plusieurs sanctuaires mariaux importants en Europe.',
    image: '/images/pelerinages/marial-circuit.jpg',
    featured: true,
  }
];

export default function FeaturedPilgrimages() {
  const [pelerinages, setPelerinages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPilgrimages = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setPelerinages(mockPilgrimages);
      } catch (err) {
        setError('Erreur lors du chargement des voyages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPilgrimages();
  }, []);

  // Fonction pour formater le prix en FCFA
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + currency;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          surtitre="NOS VOYAGES À LA UNE"
          titre="Partez à la découverte des Lieux Saints"
          description="Des voyages spirituels organisés dans les plus beaux sanctuaires du monde, pour vivre une expérience unique."
          centered={true}
        />

        {loading && <Loader text="Chargement des voyages..." />}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className={styles.grid}>
              {pelerinages.map((pelerinage) => (
                <article key={pelerinage.id} className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={pelerinage.image}
                      alt={pelerinage.title}
                      width={400}
                      height={300}
                      className={styles.image}
                    />
                    <div className={styles.badge}>
                      {pelerinage.duration}
                    </div>
                  </div>
                  
                  <div className={styles.content}>
                    <h3 className={styles.title}>{pelerinage.title}</h3>
                    
                    <div className={styles.details}>
                      <span className={styles.location}>
                        <LocationOnIcon fontSize="small" /> {pelerinage.location}
                      </span>
                      <span className={styles.date}>
                        <CalendarTodayIcon fontSize="small" /> {pelerinage.startDate}
                      </span>
                    </div>
                    
                    <p className={styles.description}>
                      {pelerinage.description.length > 100 
                        ? pelerinage.description.substring(0, 100) + '...' 
                        : pelerinage.description}
                    </p>
                    
                    <div className={styles.footer}>
                      <span className={styles.price}>
                        {formatPrice(pelerinage.price, pelerinage.currency)}
                      </span>
                      
                      <Link 
                        href={`/pelerinages/${pelerinage.id}`}
                        className={styles.link}
                      >
                        Découvrir →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.viewAll}>
              <Button href="/pelerinages" variant="secondary" size="lg">
                Voir tous nos voyages →
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}