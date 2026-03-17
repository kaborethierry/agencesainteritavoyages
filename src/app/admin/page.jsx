// src/app/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import DataTable from '@/components/admin/DataTable';
import FlightIcon from '@mui/icons-material/Flight';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailIcon from '@mui/icons-material/Mail';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_pelerinages: 0,
    inscriptions_en_attente: 0,
    inscriptions_confirmees: 0,
    messages_non_lus: 0
  });
  
  const [inscriptionsRecentes, setInscriptionsRecentes] = useState([]);
  const [pelerinagesActifs, setPelerinagesActifs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Date du jour
  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Chargement des données
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulation d'appels API - À remplacer par vos vrais appels
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données simulées
        setStats({
          total_pelerinages: 11,
          inscriptions_en_attente: 8,
          inscriptions_confirmees: 24,
          messages_non_lus: 3
        });

        setInscriptionsRecentes([
          { id: 1, nom: 'Tiendrebeogo Iréné', prenom: 'Iréné', pelerinage: 'Terre Sainte - Pâques', date: '15/03/2026', statut: 'en_attente' },
          { id: 2, nom: 'Kaboré', prenom: 'Marie', pelerinage: 'Pologne', date: '14/03/2026', statut: 'confirmee' },
          { id: 3, nom: 'Ouédraogo', prenom: 'Jean', pelerinage: 'Lourdes', date: '13/03/2026', statut: 'confirmee' },
          { id: 4, nom: 'Sawadogo', prenom: 'Paul', pelerinage: 'Canada', date: '12/03/2026', statut: 'en_attente' },
          { id: 5, nom: 'Zongo', prenom: 'Claire', pelerinage: 'Assise', date: '11/03/2026', statut: 'en_attente' },
        ]);

        setPelerinagesActifs([
          { id: 1, titre: 'Terre Sainte - Pâques', date: '27 mars 2026', inscriptions: 12, places: 30 },
          { id: 2, titre: 'Pologne', date: '08 avril 2026', inscriptions: 18, places: 30 },
          { id: 3, titre: 'Circuit Marial', date: '04 mai 2026', inscriptions: 8, places: 25 },
          { id: 4, titre: 'Canada', date: '30 août 2026', inscriptions: 5, places: 20 },
        ]);

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Colonnes pour le DataTable des inscriptions récentes
  const inscriptionsColumns = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'pelerinage', label: 'Pèlerinage' },
    { key: 'date', label: 'Date' },
    { 
      key: 'statut', 
      label: 'Statut',
      render: (value) => (
        <span className={`${styles.statusBadge} ${styles[value]}`}>
          {value === 'en_attente' ? 'En attente' : 'Confirmé'}
        </span>
      )
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* En-tête */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Tableau de bord</h1>
          <p className={styles.date}>
            <CalendarTodayIcon fontSize="small" />
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className={styles.statsGrid}>
        <StatsCard
          title="Total pèlerinages"
          value={stats.total_pelerinages}
          icon={<FlightIcon />}
          color="gold"
        />
        <StatsCard
          title="Inscriptions en attente"
          value={stats.inscriptions_en_attente}
          icon={<HourglassEmptyIcon />}
          color="orange"
        />
        <StatsCard
          title="Inscriptions confirmées"
          value={stats.inscriptions_confirmees}
          icon={<CheckCircleIcon />}
          color="green"
        />
        <StatsCard
          title="Messages non lus"
          value={stats.messages_non_lus}
          icon={<MailIcon />}
          color="navy"
        />
      </div>

      {/* Inscriptions récentes */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Inscriptions récentes</h2>
        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : (
          <DataTable 
            columns={inscriptionsColumns}
            data={inscriptionsRecentes}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        )}
      </section>

      {/* Pèlerinages actifs */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Pèlerinages actifs</h2>
        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : (
          <div className={styles.pilgrimagesList}>
            {pelerinagesActifs.map((p) => (
              <div key={p.id} className={styles.pilgrimageItem}>
                <div className={styles.pilgrimageInfo}>
                  <h3 className={styles.pilgrimageTitle}>{p.titre}</h3>
                  <p className={styles.pilgrimageDate}>📅 {p.date}</p>
                </div>
                <div className={styles.pilgrimageStats}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${(p.inscriptions / p.places) * 100}%` }}
                    ></div>
                  </div>
                  <span className={styles.pilgrimageCount}>
                    {p.inscriptions}/{p.places} inscrits
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}