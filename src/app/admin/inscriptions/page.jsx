'use client';

import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/ui/Loader';
import { inscriptionAPI, pilgrimageAPI } from '@/lib/api';
import { exportToCSV } from '@/lib/utils';
import styles from './page.module.css';

export default function AdminInscriptionsPage() {
  const [inscriptions, setInscriptions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pelerinagesList, setPelerinagesList] = useState([]);
  const [filters, setFilters] = useState({ statut: 'tous', pelerinage: 'tous', search: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [updating, setUpdating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInscriptions();
    fetchPelerinages();
  }, []);

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      const data = await inscriptionAPI.getAll();
      setInscriptions(data);
      setFiltered(data);
    } catch (err) {
      console.error('Erreur chargement inscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPelerinages = async () => {
    try {
      const data = await pilgrimageAPI.getAll();
      setPelerinagesList(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let result = [...inscriptions];
    if (filters.statut !== 'tous') result = result.filter(i => i.statut === filters.statut);
    if (filters.pelerinage !== 'tous') result = result.filter(i => i.pelerinage_id === filters.pelerinage);
    if (filters.search) {
      const s = filters.search.toLowerCase();
      result = result.filter(i => 
        (i.nom && i.nom.toLowerCase().includes(s)) || 
        (i.prenom && i.prenom.toLowerCase().includes(s)) || 
        (i.email && i.email.toLowerCase().includes(s)) || 
        (i.telephone && i.telephone.includes(s))
      );
    }
    setFiltered(result);
    setCurrentPage(1);
  }, [filters, inscriptions]);

  const stats = {
    tous: inscriptions.length,
    en_attente: inscriptions.filter(i => i.statut === 'en_attente').length,
    confirme: inscriptions.filter(i => i.statut === 'confirme').length,
    annule: inscriptions.filter(i => i.statut === 'annule').length,
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(id);
    try {
      await inscriptionAPI.updateStatus(id, newStatus);
      setInscriptions(prev => prev.map(i => i.id === id ? { ...i, statut: newStatus } : i));
      if (selected && selected.id === id) setSelected(prev => ({ ...prev, statut: newStatus }));
    } catch (err) {
      console.error('Erreur:', err);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setUpdating(null);
    }
  };

  const handleExport = () => {
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Pèlerinage', 'Date inscription', 'Statut', 'Prix'];
    const dataToExport = filtered.map(i => ({
      nom: i.nom,
      prenom: i.prenom,
      email: i.email,
      telephone: i.telephone,
      pelerinage: i.pelerinage_titre,
      date: formatDate(i.created_at),
      statut: i.statut === 'en_attente' ? 'En attente' : i.statut === 'confirme' ? 'Confirmé' : 'Annulé',
      prix: i.prix_total ? `${i.prix_total} FCFA` : ''
    }));
    exportToCSV(dataToExport, headers, `inscriptions_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      return date.toLocaleDateString('fr-FR');
    } catch (e) {
      return '';
    }
  };

  const getStatusBadge = (statut) => {
    switch (statut) {
      case 'confirme':
        return <span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Confirmé</span>;
      case 'annule':
        return <span className={`${styles.statusBadge} ${styles.statusError}`}>Annulé</span>;
      default:
        return <span className={`${styles.statusBadge} ${styles.statusWarning}`}>En attente</span>;
    }
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestion des inscriptions</h1>
          <p className={styles.subtitle}>Gérez toutes les inscriptions</p>
        </div>
        <Button variant="primary" size="md" onClick={handleExport}>
          <DownloadIcon /> Exporter CSV
        </Button>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou téléphone..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className={styles.searchInput}
          />
        </div>
        <button className={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
          <FilterListIcon /> Filtres
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Statut</label>
            <select value={filters.statut} onChange={(e) => setFilters(prev => ({ ...prev, statut: e.target.value }))} className={styles.filterSelect}>
              <option value="tous">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirme">Confirmé</option>
              <option value="annule">Annulé</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Pèlerinage</label>
            <select value={filters.pelerinage} onChange={(e) => setFilters(prev => ({ ...prev, pelerinage: e.target.value }))} className={styles.filterSelect}>
              <option value="tous">Tous les pèlerinages</option>
              {pelerinagesList.map(p => (<option key={p.id} value={p.id}>{p.title}</option>))}
            </select>
          </div>
          <button className={styles.resetFilters} onClick={() => setFilters({ statut: 'tous', pelerinage: 'tous', search: '' })}>
            <CloseIcon /> Réinitialiser
          </button>
        </div>
      )}

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${filters.statut === 'tous' ? styles.tabActive : ''}`} onClick={() => setFilters(prev => ({ ...prev, statut: 'tous' }))}>
          Tous <span className={styles.tabCount}>{stats.tous}</span>
        </button>
        <button className={`${styles.tab} ${filters.statut === 'en_attente' ? styles.tabActive : ''}`} onClick={() => setFilters(prev => ({ ...prev, statut: 'en_attente' }))}>
          En attente <span className={styles.tabCount}>{stats.en_attente}</span>
        </button>
        <button className={`${styles.tab} ${filters.statut === 'confirme' ? styles.tabActive : ''}`} onClick={() => setFilters(prev => ({ ...prev, statut: 'confirme' }))}>
          Confirmés <span className={styles.tabCount}>{stats.confirme}</span>
        </button>
        <button className={`${styles.tab} ${filters.statut === 'annule' ? styles.tabActive : ''}`} onClick={() => setFilters(prev => ({ ...prev, statut: 'annule' }))}>
          Annulés <span className={styles.tabCount}>{stats.annule}</span>
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader text="Chargement des inscriptions..." />
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nom Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Pèlerinage</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan="7" className={styles.noData}>Aucune donnée à afficher</td>
                  </tr>
                ) : (
                  paginatedData.map((row) => (
                    <tr key={row.id}>
                      <td>{row.nom} {row.prenom}</td>
                      <td>{row.email}</td>
                      <td>{row.telephone}</td>
                      <td>{row.pelerinage_titre}</td>
                      <td>{formatDate(row.created_at)}</td>
                      <td>{getStatusBadge(row.statut)}</td>
                      <td>
                        <div className={styles.actions}>
                          <button 
                            className={`${styles.actionBtn} ${styles.actionView}`} 
                            onClick={() => { setSelected(row); setModalOpen(true); }} 
                            title="Voir détails"
                          >
                            <VisibilityIcon />
                          </button>
                          {row.statut === 'en_attente' && (
                            <>
                              <button 
                                className={`${styles.actionBtn} ${styles.actionConfirm}`} 
                                onClick={() => handleStatusChange(row.id, 'confirme')}
                                disabled={updating === row.id}
                                title="Confirmer"
                              >
                                <CheckCircleIcon />
                              </button>
                              <button 
                                className={`${styles.actionBtn} ${styles.actionCancel}`} 
                                onClick={() => handleStatusChange(row.id, 'annule')}
                                disabled={updating === row.id}
                                title="Annuler"
                              >
                                <CancelIcon />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                Précédent
              </button>
              <span className={styles.pageInfo}>Page {currentPage} sur {totalPages}</span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Détails de l'inscription"
        size="lg"
        footer={
          <div className={styles.modalFooter}>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Fermer</Button>
            {selected?.statut === 'en_attente' && (
              <>
                <Button variant="success" onClick={() => { handleStatusChange(selected.id, 'confirme'); setModalOpen(false); }}>
                  Confirmer
                </Button>
                <Button variant="danger" onClick={() => { handleStatusChange(selected.id, 'annule'); setModalOpen(false); }}>
                  Annuler
                </Button>
              </>
            )}
          </div>
        }
      >
        {selected && (
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <span className={`${styles.modalStatus} ${selected.statut === 'en_attente' ? styles.statusWarning : selected.statut === 'confirme' ? styles.statusSuccess : styles.statusError}`}>
                {selected.statut === 'en_attente' ? 'En attente' : selected.statut === 'confirme' ? 'Confirmé' : 'Annulé'}
              </span>
              <span className={styles.modalReference}>Réf: {selected.id}</span>
            </div>
            <div className={styles.modalGrid}>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Informations personnelles</h3>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Nom complet :</span><span className={styles.modalValue}>{selected.nom} {selected.prenom}</span></div>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Date naissance :</span><span className={styles.modalValue}>{selected.date_naissance}</span></div>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Nationalité :</span><span className={styles.modalValue}>{selected.nationalite}</span></div>
              </div>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Coordonnées</h3>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Email :</span><span className={styles.modalValue}>{selected.email}</span></div>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Téléphone :</span><span className={styles.modalValue}>{selected.telephone}</span></div>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Adresse :</span><span className={styles.modalValue}>{selected.adresse}</span></div>
              </div>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Pèlerinage</h3>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Pèlerinage :</span><span className={styles.modalValue}>{selected.pelerinage_titre}</span></div>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Date inscription :</span><span className={styles.modalValue}>{formatDate(selected.created_at)}</span></div>
              </div>
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Contact urgence</h3>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Nom :</span><span className={styles.modalValue}>{selected.urgence_nom || 'Non renseigné'}</span></div>
                <div className={styles.modalRow}><span className={styles.modalLabel}>Téléphone :</span><span className={styles.modalValue}>{selected.urgence_tel || 'Non renseigné'}</span></div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}