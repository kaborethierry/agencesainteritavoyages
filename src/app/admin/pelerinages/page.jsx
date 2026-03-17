// src/app/admin/pelerinages/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@/components/ui/Button';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/ui/Loader';
import styles from './page.module.css';

export default function AdminPelerinagesPage() {
  const [pelerinages, setPelerinages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });

  // Charger les pèlerinages
  useEffect(() => {
    fetchPelerinages();
  }, []);

  const fetchPelerinages = async () => {
    try {
      setLoading(true);
      // Simulation d'appel API - À remplacer par votre vrai endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données simulées
      const mockData = [
        {
          id: 1,
          image: '/images/pelerinages/jerusalem.jpg',
          titre: 'Terre Sainte – Jérusalem (Spécial Pâques)',
          destination: 'Israël',
          dates: '27 mars - 08 avril 2026',
          prix: '2 000 000 FCFA',
          places_restantes: 12,
          places_total: 30,
          statut: 'actif'
        },
        {
          id: 2,
          image: '/images/pelerinages/pologne.jpg',
          titre: 'Pologne – Sur les pas de Sainte Faustine',
          destination: 'Pologne',
          dates: '08 avril - 24 avril 2026',
          prix: '2 500 000 FCFA',
          places_restantes: 5,
          places_total: 30,
          statut: 'actif'
        },
        {
          id: 3,
          image: '/images/pelerinages/marial-circuit.jpg',
          titre: 'Grand Circuit Marial en Europe',
          destination: 'Multi-pays',
          dates: '04 mai - 20 mai 2026',
          prix: '3 000 000 FCFA',
          places_restantes: 0,
          places_total: 25,
          statut: 'inactif'
        },
        {
          id: 4,
          image: '/images/pelerinages/canada.jpg',
          titre: 'Canada – Montréal, Trois-Rivières et Québec',
          destination: 'Canada',
          dates: '30 août - 15 septembre 2026',
          prix: '3 700 000 FCFA',
          places_restantes: 18,
          places_total: 20,
          statut: 'actif'
        },
        {
          id: 5,
          image: '/images/pelerinages/assise.jpg',
          titre: 'Assise – Sur les pas de Saint François',
          destination: 'Italie',
          dates: '29 septembre - 14 octobre 2026',
          prix: '2 500 000 FCFA',
          places_restantes: 8,
          places_total: 25,
          statut: 'actif'
        }
      ];
      
      setPelerinages(mockData);
    } catch (err) {
      setError('Erreur lors du chargement des pèlerinages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Gestion de la suppression
  const handleDeleteClick = (id, titre) => {
    setDeleteModal({ open: true, id, title: titre });
  };

  const confirmDelete = async () => {
    try {
      // Simulation d'appel API DELETE
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour de la liste
      setPelerinages(prev => prev.filter(p => p.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null, title: '' });
      
      // Afficher un toast de succès (à implémenter)
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  // Gestion du changement de statut (actif/inactif)
  const handleToggleStatut = async (id, currentStatut) => {
    try {
      // Simulation d'appel API PATCH
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mise à jour locale
      setPelerinages(prev => prev.map(p => 
        p.id === id 
          ? { ...p, statut: currentStatut === 'actif' ? 'inactif' : 'actif' }
          : p
      ));
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
    }
  };

  // Colonnes du tableau
  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <div className={styles.thumbnail}>
          <Image
            src={row.image}
            alt={row.titre}
            width={60}
            height={40}
            className={styles.thumbnailImg}
          />
        </div>
      )
    },
    { key: 'titre', label: 'Titre' },
    { key: 'destination', label: 'Destination' },
    { key: 'dates', label: 'Dates' },
    { key: 'prix', label: 'Prix' },
    {
      key: 'places_restantes',
      label: 'Places',
      render: (row) => (
        <div className={styles.placesCell}>
          <span className={row.places_restantes < 5 ? styles.placesWarning : ''}>
            {row.places_restantes}/{row.places_total}
          </span>
        </div>
      )
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (row) => (
        <span className={`${styles.statusBadge} ${styles[row.statut]}`}>
          {row.statut === 'actif' ? 'Actif' : 'Inactif'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.actionEdit}`}
            onClick={() => window.location.href = `/admin/pelerinages/${row.id}/edit`}
            title="Modifier"
          >
            <EditIcon />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.actionView}`}
            onClick={() => handleToggleStatut(row.id, row.statut)}
            title={row.statut === 'actif' ? 'Désactiver' : 'Activer'}
          >
            {row.statut === 'actif' ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
          <button
            className={`${styles.actionBtn} ${styles.actionDelete}`}
            onClick={() => handleDeleteClick(row.id, row.titre)}
            title="Supprimer"
          >
            <DeleteIcon />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestion des Pèlerinages</h1>
          <p className={styles.subtitle}>
            Gérez tous les pèlerinages de l'agence
          </p>
        </div>
        <Link href="/admin/pelerinages/nouveau">
          <Button variant="primary" size="md">
            <AddIcon /> Nouveau pèlerinage
          </Button>
        </Link>
      </div>

      {/* Tableau */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader text="Chargement des pèlerinages..." />
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <Button variant="primary" onClick={fetchPelerinages}>
            Réessayer
          </Button>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={pelerinages}
          loading={loading}
          itemsPerPage={10}
        />
      )}

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, title: '' })}
        title="Confirmer la suppression"
        size="sm"
      >
        <div className={styles.modalContent}>
          <p>
            Êtes-vous sûr de vouloir supprimer le pèlerinage :<br />
            <strong>{deleteModal.title}</strong> ?
          </p>
          <p className={styles.modalWarning}>
            Cette action est irréversible.
          </p>
          <div className={styles.modalActions}>
            <Button
              variant="ghost"
              onClick={() => setDeleteModal({ open: false, id: null, title: '' })}
            >
              Annuler
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}