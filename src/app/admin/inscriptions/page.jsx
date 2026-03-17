// src/app/admin/inscriptions/page.jsx
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
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/ui/Loader';
import styles from './page.module.css';

export default function AdminInscriptionsPage() {
  const [inscriptions, setInscriptions] = useState([]);
  const [filteredInscriptions, setFilteredInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInscription, setSelectedInscription] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    statut: 'tous',
    pelerinage: 'tous',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Charger les données
  useEffect(() => {
    fetchInscriptions();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let result = [...inscriptions];

    // Filtre par statut
    if (filters.statut !== 'tous') {
      result = result.filter(i => i.statut === filters.statut);
    }

    // Filtre par pèlerinage
    if (filters.pelerinage !== 'tous') {
      result = result.filter(i => i.pelerinage_id === parseInt(filters.pelerinage));
    }

    // Recherche textuelle
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(i => 
        i.nom.toLowerCase().includes(searchLower) ||
        i.prenom.toLowerCase().includes(searchLower) ||
        i.email.toLowerCase().includes(searchLower) ||
        i.telephone.includes(filters.search)
      );
    }

    setFilteredInscriptions(result);
  }, [filters, inscriptions]);

  const fetchInscriptions = async () => {
    try {
      setLoading(true);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Données simulées
      const mockData = [
        {
          id: 1,
          nom: 'Tiendrebeogo',
          prenom: 'Iréné',
          email: 'irene.t@example.com',
          telephone: '70 26 64 41',
          pelerinage_id: 1,
          pelerinage_titre: 'Terre Sainte – Jérusalem (Pâques)',
          date_inscription: '15/01/2026',
          statut: 'en_attente',
          date_naissance: '15/05/1980',
          nationalite: 'Burkinabè',
          numero_passeport: 'PD123456',
          adresse: 'Ouagadougou, Secteur 25',
          urgence_nom: 'Marie Tiendrebeogo',
          urgence_tel: '70 12 34 56',
          regime_alimentaire: 'standard',
          remarques: 'Préfère être logé en chambre individuelle',
          prix: '2 000 000 FCFA',
          acompte: '600 000 FCFA'
        },
        {
          id: 2,
          nom: 'Kaboré',
          prenom: 'Marie',
          email: 'marie.k@example.com',
          telephone: '71 23 45 67',
          pelerinage_id: 2,
          pelerinage_titre: 'Pologne',
          date_inscription: '16/01/2026',
          statut: 'confirmee',
          date_naissance: '22/08/1985',
          nationalite: 'Burkinabè',
          numero_passeport: 'PD789012',
          adresse: 'Ouagadougou, Secteur 10',
          urgence_nom: 'Paul Kaboré',
          urgence_tel: '71 23 45 68',
          regime_alimentaire: 'vegetarien',
          remarques: '',
          prix: '2 500 000 FCFA',
          acompte: '1 250 000 FCFA'
        },
        {
          id: 3,
          nom: 'Ouédraogo',
          prenom: 'Jean',
          email: 'jean.o@example.com',
          telephone: '72 34 56 78',
          pelerinage_id: 3,
          pelerinage_titre: 'Circuit Marial',
          date_inscription: '17/01/2026',
          statut: 'confirmee',
          date_naissance: '10/03/1975',
          nationalite: 'Burkinabè',
          numero_passeport: 'PD345678',
          adresse: 'Ouagadougou, Secteur 15',
          urgence_nom: 'Jeanne Ouédraogo',
          urgence_tel: '72 34 56 79',
          regime_alimentaire: 'standard',
          remarques: '',
          prix: '3 000 000 FCFA',
          acompte: '900 000 FCFA'
        },
        {
          id: 4,
          nom: 'Sawadogo',
          prenom: 'Paul',
          email: 'paul.s@example.com',
          telephone: '73 45 67 89',
          pelerinage_id: 4,
          pelerinage_titre: 'Canada',
          date_inscription: '18/01/2026',
          statut: 'en_attente',
          date_naissance: '05/12/1990',
          nationalite: 'Burkinabè',
          numero_passeport: 'PD901234',
          adresse: 'Ouagadougou, Secteur 20',
          urgence_nom: 'Pierre Sawadogo',
          urgence_tel: '73 45 67 80',
          regime_alimentaire: 'halal',
          remarques: 'Allergie aux fruits de mer',
          prix: '3 700 000 FCFA',
          acompte: '1 110 000 FCFA'
        },
        {
          id: 5,
          nom: 'Zongo',
          prenom: 'Claire',
          email: 'claire.z@example.com',
          telephone: '74 56 78 90',
          pelerinage_id: 5,
          pelerinage_titre: 'Assise',
          date_inscription: '19/01/2026',
          statut: 'annulee',
          date_naissance: '30/06/1988',
          nationalite: 'Burkinabè',
          numero_passeport: 'PD567890',
          adresse: 'Ouagadougou, Secteur 5',
          urgence_nom: 'Luc Zongo',
          urgence_tel: '74 56 78 91',
          regime_alimentaire: 'sans_gluten',
          remarques: 'Annulé pour raison médicale',
          prix: '2 500 000 FCFA',
          acompte: '0 FCFA'
        }
      ];

      setInscriptions(mockData);
      setFilteredInscriptions(mockData);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Liste des pèlerinages pour le filtre
  const pelerinagesList = [
    { id: 1, titre: 'Terre Sainte – Jérusalem' },
    { id: 2, titre: 'Pologne' },
    { id: 3, titre: 'Circuit Marial' },
    { id: 4, titre: 'Canada' },
    { id: 5, titre: 'Assise' }
  ];

  // Calcul des compteurs par statut
  const stats = {
    tous: inscriptions.length,
    en_attente: inscriptions.filter(i => i.statut === 'en_attente').length,
    confirmee: inscriptions.filter(i => i.statut === 'confirmee').length,
    annulee: inscriptions.filter(i => i.statut === 'annulee').length
  };

  // Gestion du changement de statut d'une inscription
  const handleStatutChange = async (id, nouveauStatut) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setInscriptions(prev => prev.map(i => 
        i.id === id ? { ...i, statut: nouveauStatut } : i
      ));
      
      if (selectedInscription && selectedInscription.id === id) {
        setSelectedInscription(prev => ({ ...prev, statut: nouveauStatut }));
      }
    } catch (err) {
      console.error('Erreur lors du changement de statut:', err);
    }
  };

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Nom', 'Prénom', 'Email', 'Téléphone', 'Pèlerinage', 'Date inscription', 'Statut', 'Prix'];
    const data = filteredInscriptions.map(i => [
      i.nom,
      i.prenom,
      i.email,
      i.telephone,
      i.pelerinage_titre,
      i.date_inscription,
      i.statut,
      i.prix
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `inscriptions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  // Colonnes du tableau
  const columns = [
    { 
      key: 'nomComplet',
      label: 'Nom Prénom',
      render: (row) => `${row.nom} ${row.prenom}`
    },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'pelerinage_titre', label: 'Pèlerinage' },
    { key: 'date_inscription', label: 'Date' },
    { 
      key: 'statut',
      label: 'Statut',
      render: (row) => (
        <span className={`${styles.statusBadge} ${styles[row.statut]}`}>
          {row.statut === 'en_attente' ? 'En attente' : 
           row.statut === 'confirmee' ? 'Confirmé' : 'Annulé'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.actionView}`}
            onClick={() => {
              setSelectedInscription(row);
              setModalOpen(true);
            }}
            title="Voir détails"
          >
            <VisibilityIcon />
          </button>
          {row.statut === 'en_attente' && (
            <>
              <button
                className={`${styles.actionBtn} ${styles.actionConfirm}`}
                onClick={() => handleStatutChange(row.id, 'confirmee')}
                title="Confirmer"
              >
                <CheckCircleIcon />
              </button>
              <button
                className={`${styles.actionBtn} ${styles.actionCancel}`}
                onClick={() => handleStatutChange(row.id, 'annulee')}
                title="Annuler"
              >
                <CancelIcon />
              </button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gestion des inscriptions</h1>
          <p className={styles.subtitle}>
            Gérez toutes les inscriptions aux pèlerinages
          </p>
        </div>
        <Button variant="primary" size="md" onClick={exportToCSV}>
          <DownloadIcon /> Exporter CSV
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
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
        <button
          className={styles.filterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterListIcon />
          Filtres
        </button>
      </div>

      {/* Filtres avancés */}
      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Statut</label>
            <select
              value={filters.statut}
              onChange={(e) => setFilters(prev => ({ ...prev, statut: e.target.value }))}
              className={styles.filterSelect}
            >
              <option value="tous">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirmee">Confirmé</option>
              <option value="annulee">Annulé</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Pèlerinage</label>
            <select
              value={filters.pelerinage}
              onChange={(e) => setFilters(prev => ({ ...prev, pelerinage: e.target.value }))}
              className={styles.filterSelect}
            >
              <option value="tous">Tous les pèlerinages</option>
              {pelerinagesList.map(p => (
                <option key={p.id} value={p.id}>{p.titre}</option>
              ))}
            </select>
          </div>

          <button
            className={styles.resetFilters}
            onClick={() => setFilters({ statut: 'tous', pelerinage: 'tous', search: '' })}
          >
            <CloseIcon /> Réinitialiser
          </button>
        </div>
      )}

      {/* Onglets de statut */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${filters.statut === 'tous' ? styles.tabActive : ''}`}
          onClick={() => setFilters(prev => ({ ...prev, statut: 'tous' }))}
        >
          Tous <span className={styles.tabCount}>{stats.tous}</span>
        </button>
        <button
          className={`${styles.tab} ${filters.statut === 'en_attente' ? styles.tabActive : ''}`}
          onClick={() => setFilters(prev => ({ ...prev, statut: 'en_attente' }))}
        >
          En attente <span className={styles.tabCount}>{stats.en_attente}</span>
        </button>
        <button
          className={`${styles.tab} ${filters.statut === 'confirmee' ? styles.tabActive : ''}`}
          onClick={() => setFilters(prev => ({ ...prev, statut: 'confirmee' }))}
        >
          Confirmés <span className={styles.tabCount}>{stats.confirmee}</span>
        </button>
        <button
          className={`${styles.tab} ${filters.statut === 'annulee' ? styles.tabActive : ''}`}
          onClick={() => setFilters(prev => ({ ...prev, statut: 'annulee' }))}
        >
          Annulés <span className={styles.tabCount}>{stats.annulee}</span>
        </button>
      </div>

      {/* Tableau */}
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader text="Chargement des inscriptions..." />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredInscriptions}
          itemsPerPage={10}
        />
      )}

      {/* Modal de détails */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Détails de l'inscription"
        size="lg"
        footer={
          <div className={styles.modalFooter}>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Fermer
            </Button>
            {selectedInscription?.statut === 'en_attente' && (
              <>
                <Button
                  variant="success"
                  onClick={() => {
                    handleStatutChange(selectedInscription.id, 'confirmee');
                    setModalOpen(false);
                  }}
                >
                  Confirmer l'inscription
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleStatutChange(selectedInscription.id, 'annulee');
                    setModalOpen(false);
                  }}
                >
                  Annuler l'inscription
                </Button>
              </>
            )}
          </div>
        }
      >
        {selectedInscription && (
          <div className={styles.modalContent}>
            {/* En-tête avec statut */}
            <div className={styles.modalHeader}>
              <span className={`${styles.modalStatus} ${styles[selectedInscription.statut]}`}>
                {selectedInscription.statut === 'en_attente' ? 'En attente' : 
                 selectedInscription.statut === 'confirmee' ? 'Confirmé' : 'Annulé'}
              </span>
              <span className={styles.modalReference}>
                Réf: {selectedInscription.id}
              </span>
            </div>

            <div className={styles.modalGrid}>
              {/* Informations personnelles */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Informations personnelles</h3>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Nom complet :</span>
                  <span className={styles.modalValue}>{selectedInscription.nom} {selectedInscription.prenom}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Date de naissance :</span>
                  <span className={styles.modalValue}>{selectedInscription.date_naissance}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Nationalité :</span>
                  <span className={styles.modalValue}>{selectedInscription.nationalite}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>N° Passeport :</span>
                  <span className={styles.modalValue}>{selectedInscription.numero_passeport}</span>
                </div>
              </div>

              {/* Coordonnées */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Coordonnées</h3>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Email :</span>
                  <span className={styles.modalValue}>{selectedInscription.email}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Téléphone :</span>
                  <span className={styles.modalValue}>{selectedInscription.telephone}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Adresse :</span>
                  <span className={styles.modalValue}>{selectedInscription.adresse}</span>
                </div>
              </div>

              {/* Pèlerinage */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Pèlerinage</h3>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Pèlerinage :</span>
                  <span className={styles.modalValue}>{selectedInscription.pelerinage_titre}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Date d'inscription :</span>
                  <span className={styles.modalValue}>{selectedInscription.date_inscription}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Prix total :</span>
                  <span className={styles.modalValue}>{selectedInscription.prix}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Acompte versé :</span>
                  <span className={styles.modalValue}>{selectedInscription.acompte}</span>
                </div>
              </div>

              {/* Contact urgence */}
              <div className={styles.modalSection}>
                <h3 className={styles.modalSectionTitle}>Contact urgence</h3>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Nom :</span>
                  <span className={styles.modalValue}>{selectedInscription.urgence_nom}</span>
                </div>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Téléphone :</span>
                  <span className={styles.modalValue}>{selectedInscription.urgence_tel}</span>
                </div>
              </div>

              {/* Informations complémentaires */}
              <div className={`${styles.modalSection} ${styles.fullWidth}`}>
                <h3 className={styles.modalSectionTitle}>Informations complémentaires</h3>
                <div className={styles.modalRow}>
                  <span className={styles.modalLabel}>Régime alimentaire :</span>
                  <span className={styles.modalValue}>
                    {selectedInscription.regime_alimentaire === 'standard' ? 'Standard' :
                     selectedInscription.regime_alimentaire === 'vegetarien' ? 'Végétarien' :
                     selectedInscription.regime_alimentaire === 'halal' ? 'Halal' :
                     selectedInscription.regime_alimentaire === 'sans_gluten' ? 'Sans gluten' : 
                     selectedInscription.regime_alimentaire}
                  </span>
                </div>
                {selectedInscription.remarques && (
                  <div className={styles.modalRow}>
                    <span className={styles.modalLabel}>Remarques :</span>
                    <span className={styles.modalValue}>{selectedInscription.remarques}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}