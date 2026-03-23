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
import { pilgrimageAPI } from '@/lib/api';
import styles from './page.module.css';

export default function AdminPelerinagesPage() {
  const [pelerinages, setPelerinages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null, title: '' });

  useEffect(() => {
    fetchPelerinages();
  }, []);

  const fetchPelerinages = async () => {
    try {
      setLoading(true);
      const data = await pilgrimageAPI.getAll();
      setPelerinages(data);
    } catch (err) {
      setError('Erreur lors du chargement des pèlerinages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id, titre) => {
    setDeleteModal({ open: true, id, title: titre });
  };

  const confirmDelete = async () => {
    try {
      await pilgrimageAPI.delete(deleteModal.id);
      setPelerinages(prev => prev.filter(p => p.id !== deleteModal.id));
      setDeleteModal({ open: false, id: null, title: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatut = async (id, currentStatut) => {
    try {
      const newStatus = currentStatut === 'actif' ? 'inactif' : 'actif';
      await pilgrimageAPI.toggleStatus(id, newStatus);
      // Rafraîchir la liste
      fetchPelerinages();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date à définir';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return 'Date invalide';
      return date.toLocaleDateString('fr-FR');
    } catch (e) {
      return 'Date invalide';
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (row) => (
        <div className={styles.thumbnail}>
          {row.image ? (
            <Image
              src={row.image}
              alt={`Image du pèlerinage : ${row.titre}`}
              width={60}
              height={40}
              className={styles.thumbnailImg}
            />
          ) : (
            <div className={styles.thumbnailPlaceholder}>Pas d'image</div>
          )}
        </div>
      )
    },
    { key: 'titre', label: 'Titre' },
    { key: 'location', label: 'Destination' },
    {
      key: 'dates',
      label: 'Dates',
      render: (row) => `${formatDate(row.start_date)} - ${formatDate(row.end_date)}`
    },
    {
      key: 'prix',
      label: 'Prix',
      render: (row) => {
        const price = parseInt(row.price);
        return isNaN(price) ? 'Prix non défini' : new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
      }
    },
    {
      key: 'statut',
      label: 'Statut',
      render: (row) => (
        <span className={`${styles.statusBadge} ${styles[row.status] || ''}`}>
          {row.status === 'actif' ? 'Actif' : row.status === 'inactif' ? 'Inactif' : row.status === 'complet' ? 'Complet' : row.status}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className={styles.actions}>
          <Link
            href={`/admin/pelerinages/nouveau?edit=${row.id}`}
            className={`${styles.actionBtn} ${styles.actionEdit}`}
            title="Modifier"
          >
            <EditIcon />
          </Link>
          <button
            className={`${styles.actionBtn} ${styles.actionView}`}
            onClick={() => handleToggleStatut(row.id, row.status)}
            title={row.status === 'actif' ? 'Désactiver' : 'Activer'}
          >
            {row.status === 'actif' ? <VisibilityOffIcon /> : <VisibilityIcon />}
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
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestion des Pèlerinages</h1>
          <p className={styles.subtitle}>Gérez tous les pèlerinages de l'agence</p>
        </div>
        <Link href="/admin/pelerinages/nouveau">
          <Button variant="primary" size="md">
            <AddIcon /> Nouveau pèlerinage
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader text="Chargement des pèlerinages..." />
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>{error}</p>
          <Button variant="primary" onClick={fetchPelerinages}>Réessayer</Button>
        </div>
      ) : (
        <DataTable columns={columns} data={pelerinages} itemsPerPage={10} />
      )}

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null, title: '' })}
        title="Confirmer la suppression"
        size="sm"
      >
        <div className={styles.modalContent}>
          <p>Êtes-vous sûr de vouloir supprimer :<br /><strong>{deleteModal.title}</strong> ?</p>
          <p className={styles.modalWarning}>Cette action est irréversible.</p>
          <div className={styles.modalActions}>
            <Button variant="ghost" onClick={() => setDeleteModal({ open: false, id: null, title: '' })}>
              Annuler
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}