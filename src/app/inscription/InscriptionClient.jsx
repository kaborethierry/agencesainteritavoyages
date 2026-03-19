// src/app/inscription/InscriptionClient.jsx
'use client';

import { Suspense } from 'react';
import InscriptionForm from '@/components/inscription/InscriptionForm';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PaymentIcon from '@mui/icons-material/Payment';
import PhoneIcon from '@mui/icons-material/Phone';
import styles from './page.module.css';

function LoadingFallback() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>Chargement du formulaire...</p>
    </div>
  );
}

export default function InscriptionClient() {
  return (
    <>
      <div className={styles.heroBanner}>
        <div className="container">
          <div className={styles.contactHeader}>
            <h2 className={styles.contactTitle}>AGENCE SAINTE RITA VOYAGES</h2>
            <div className={styles.contactInfo}>
              <span><PhoneIcon fontSize="small" /> +226 25 47 92 22 / +226 66 88 83 83</span>
              <span className={styles.contactTagline}>Pèlerinages – Itinéraires spirituels & Culturels</span>
            </div>
          </div>
          <div className={styles.breadcrumb}>
            <span>Accueil</span> / <span>Voyages</span> / <span className={styles.current}>Inscription</span>
          </div>
          <h1 className={styles.heroTitle}>Inscription à un voyage</h1>
          <p className={styles.heroSubtitle}>
            Rejoignez-nous pour vivre une expérience spirituelle unique sur les lieux saints
          </p>
        </div>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <InscriptionForm />
      </Suspense>

      <div className={styles.assuranceSection}>
        <div className="container">
          <div className={styles.assuranceGrid}>
            <div className={styles.assuranceItem}>
              <div className={styles.assuranceIcon}>
                <LockIcon fontSize="large" />
              </div>
              <h3 className={styles.assuranceTitle}>Vos données sont sécurisées</h3>
              <p className={styles.assuranceText}>
                Vos informations personnelles sont protégées et ne seront jamais partagées.
              </p>
            </div>
            <div className={styles.assuranceItem}>
              <div className={styles.assuranceIcon}>
                <EmailIcon fontSize="large" />
              </div>
              <h3 className={styles.assuranceTitle}>Confirmation sous 48h</h3>
              <p className={styles.assuranceText}>
                Vous recevrez un email de confirmation avec les détails de votre inscription.
              </p>
            </div>
            <div className={styles.assuranceItem}>
              <div className={styles.assuranceIcon}>
                <PaymentIcon fontSize="large" />
              </div>
              <h3 className={styles.assuranceTitle}>Paiement sécurisé</h3>
              <p className={styles.assuranceText}>
                Le règlement s'effectue de manière sécurisée par virement bancaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}