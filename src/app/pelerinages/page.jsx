'use client';

import { useState, useEffect } from 'react';
import PilgrimageCard from '@/components/pelerinages/PilgrimageCard';
import PilgrimageFilter from '@/components/pelerinages/PilgrimageFilter';
import Loader from '@/components/ui/Loader';
import SectionTitle from '@/components/ui/SectionTitle';
import { pilgrimageAPI } from '@/lib/api';
import styles from './page.module.css';

export default function PilgrimagesPage() {
  const [pelerinages, setPelerinages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    destination: '',
    month: '',
    priceMax: ''
  });

  useEffect(() => {
    const fetchPilgrimages = async () => {
      try {
        setLoading(true);
        const data = await pilgrimageAPI.getAll();
        setPelerinages(data);
        setFiltered(data);
      } catch (err) {
        setError('Erreur lors du chargement des voyages');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPilgrimages();
  }, []);

  useEffect(() => {
    if (!pelerinages.length) return;

    let result = [...pelerinages];

    if (filters.destination) {
      const searchTerm = filters.destination.toLowerCase();
      result = result.filter(p => 
        (p.location && p.location.toLowerCase().includes(searchTerm)) ||
        (p.country && p.country.toLowerCase().includes(searchTerm)) ||
        (p.titre && p.titre.toLowerCase().includes(searchTerm))
      );
    }

    if (filters.month) {
      result = result.filter(p => p.month === filters.month);
    }

    if (filters.priceMax) {
      const maxPrice = parseInt(filters.priceMax);
      result = result.filter(p => p.price <= maxPrice);
    }

    setFiltered(result);
  }, [filters, pelerinages]);

  return (
    <>
      <div className={styles.heroBanner}>
        <div className={styles.overlay}></div>
        <div className="container">
          <h1 className={styles.heroTitle}>Nos voyages spirituels</h1>
          <p className={styles.heroSubtitle}>
            Découvrez tous nos voyages organisés dans les lieux saints du monde entier
          </p>
        </div>
      </div>

      <div className="container">
        <SectionTitle
          surtitre="VOYAGES 2026"
          titre="Choisissez votre destination spirituelle"
          description="Que vous cherchiez à marcher sur les pas du Christ en Terre Sainte, à prier dans les grands sanctuaires mariaux ou à découvrir l'héritage des saints, nous avons le voyage qu'il vous faut."
          centered={true}
        />

        <PilgrimageFilter filters={filters} setFilters={setFilters} />

        {loading && <Loader text="Chargement des voyages..." />}

        {error && (
          <div className={styles.error}>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className={styles.retryButton}>
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className={styles.resultsInfo}>
              <p>{filtered.length} voyage{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
            </div>

            {filtered.length === 0 ? (
              <div className={styles.noResults}>
                <p>Aucun voyage ne correspond à vos critères.</p>
                <button onClick={() => setFilters({ destination: '', month: '', priceMax: '' })} className={styles.resetButton}>
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((pelerinage) => (
                  <PilgrimageCard key={pelerinage.id} pilgrimage={pelerinage} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}