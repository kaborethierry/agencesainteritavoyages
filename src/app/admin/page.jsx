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
import { adminAPI, inscriptionAPI, pilgrimageAPI } from '@/lib/api';
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
  const [error, setError] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer les statistiques
        const statsData = await adminAPI.getStats();
        setStats(statsData);
        
        // Récupérer les 5 dernières inscriptions (sans paramètre limit qui pose problème)
        try {
          const allInscriptions = await inscriptionAPI.getAll();
          // Prendre les 5 dernières manuellement
          const recentes = allInscriptions.slice(0, 5);
          setInscriptionsRecentes(recentes.map(i => ({
            id: i.id,
            nom: i.nom,
            prenom: i.prenom,
            pelerinage: i.pelerinage_titre,
            date: i.created_at ? new Date(i.created_at).toLocaleDateString('fr-FR') : '',
            statut: i.statut
          })));
        } catch (inscErr) {
          console.error('Erreur chargement inscriptions récentes:', inscErr);
          setInscriptionsRecentes([]);
        }
        
        // Récupérer les voyages actifs
        try {
          const voyages = await pilgrimageAPI.getAll({ status: 'actif' });
          setPelerinagesActifs(voyages.slice(0, 5).map(v => ({
            id: v.id,
            titre: v.title,
            date: v.startDate ? new Date(v.startDate).toLocaleDateString('fr-FR') : 'Date à définir',
            inscriptions: v.places_reservees || 0,
            places: v.places_total || 30
          })));
        } catch (voyErr) {
          console.error('Erreur chargement voyages actifs:', voyErr);
          setPelerinagesActifs([]);
        }
        
      } catch (err) {
        console.error('Erreur chargement dashboard:', err);
        setError(err.message || 'Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className={styles.retryButton}>
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Tableau de bord</h1>
          <p className={styles.date}>
            <CalendarTodayIcon fontSize="small" />
            {formattedDate}
          </p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatsCard
          title="Total voyages"
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

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Inscriptions récentes</h2>
        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : inscriptionsRecentes.length === 0 ? (
          <div className={styles.emptyMessage}>Aucune inscription pour le moment</div>
        ) : (
          <DataTable 
            columns={[
              { key: 'nom', label: 'Nom' },
              { key: 'prenom', label: 'Prénom' },
              { key: 'pelerinage', label: 'Voyage' },
              { key: 'date', label: 'Date' },
              { 
                key: 'statut', 
                label: 'Statut',
                render: (row) => (
                  <span className={`${styles.statusBadge} ${styles[row.statut]}`}>
                    {row.statut === 'en_attente' ? 'En attente' : 
                     row.statut === 'confirmee' ? 'Confirmé' : 
                     row.statut === 'annulee' ? 'Annulé' : row.statut}
                  </span>
                )
              },
            ]}
            data={inscriptionsRecentes}
            itemsPerPage={5}
          />
        )}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Voyages actifs</h2>
        {loading ? (
          <div className={styles.loading}>Chargement...</div>
        ) : pelerinagesActifs.length === 0 ? (
          <div className={styles.emptyMessage}>Aucun voyage actif</div>
        ) : (
          <div className={styles.pilgrimagesList}>
            {pelerinagesActifs.map((p) => (
              <div key={p.id} className={styles.pilgrimageItem}>
                <div className={styles.pilgrimageInfo}>
                  <h3 className={styles.pilgrimageTitle}>{p.titre}</h3>
                  <p className={styles.pilgrimageDate}>
                    <CalendarTodayIcon fontSize="small" /> {p.date}
                  </p>
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