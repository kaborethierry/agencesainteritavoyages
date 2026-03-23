'use client';

import { useState } from 'react';
import { inscriptionAPI } from '@/lib/api';
import styles from './StatusBadge.module.css';

export default function StatusBadge({ inscription, onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(inscription?.statut || 'en_attente');

  const statusOptions = [
    { value: 'en_attente', label: 'En attente' },
    { value: 'confirme', label: 'Confirmé' },
    { value: 'annule', label: 'Annulé' }
  ];

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus || !inscription?.id) return;
    
    setLoading(true);
    try {
      await inscriptionAPI.updateStatus(inscription.id, newStatus);
      setCurrentStatus(newStatus);
      if (onStatusChange) onStatusChange(inscription.id, newStatus);
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = () => {
    switch (currentStatus) {
      case 'confirme':
        return 'statusSuccess';
      case 'annule':
        return 'statusError';
      default:
        return 'statusWarning';
    }
  };

  const getStatusLabel = () => {
    switch (currentStatus) {
      case 'confirme':
        return 'Confirmé';
      case 'annule':
        return 'Annulé';
      default:
        return 'En attente';
    }
  };

  return (
    <div className={styles.statusContainer}>
      <select
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
        disabled={loading}
        className={`${styles.statusSelect} ${styles[getStatusClass()]}`}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {loading && <span className={styles.loadingSpinner}></span>}
    </div>
  );
}