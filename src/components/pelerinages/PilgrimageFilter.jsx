// src/components/pelerinages/PilgrimageFilter.jsx
'use client';

import styles from './PilgrimageFilter.module.css';

export default function PilgrimageFilter({ filters, setFilters }) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      destination: '',
      month: '',
      priceMax: ''
    });
  };

  // Liste des destinations uniques (à partir des données réelles)
  const destinations = [
    'Israël',
    'Pologne',
    'France',
    'Italie',
    'Belgique',
    'Portugal',
    'Bosnie-Herzégovine',
    'Canada',
    'Côte d\'Ivoire'
  ];

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const priceRanges = [
    { label: 'Tous les budgets', value: '' },
    { label: 'Moins de 500 000 FCFA', value: '500000' },
    { label: 'Moins de 1 000 000 FCFA', value: '1000000' },
    { label: 'Moins de 2 000 000 FCFA', value: '2000000' },
    { label: 'Moins de 3 000 000 FCFA', value: '3000000' },
    { label: 'Moins de 4 000 000 FCFA', value: '4000000' },
  ];

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterGroup}>
        <label htmlFor="destination">Destination</label>
        <select
          id="destination"
          value={filters.destination}
          onChange={(e) => handleFilterChange('destination', e.target.value)}
        >
          <option value="">Toutes les destinations</option>
          {destinations.sort().map(dest => (
            <option key={dest} value={dest}>{dest}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="month">Mois de départ</label>
        <select
          id="month"
          value={filters.month}
          onChange={(e) => handleFilterChange('month', e.target.value)}
        >
          <option value="">Tous les mois</option>
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label htmlFor="priceMax">Budget maximum</label>
        <select
          id="priceMax"
          value={filters.priceMax}
          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
        >
          {priceRanges.map(range => (
            <option key={range.label} value={range.value}>{range.label}</option>
          ))}
        </select>
      </div>

      <button 
        className={styles.resetBtn}
        onClick={handleReset}
        aria-label="Réinitialiser les filtres"
      >
        ✕ Réinitialiser
      </button>
    </div>
  );
}