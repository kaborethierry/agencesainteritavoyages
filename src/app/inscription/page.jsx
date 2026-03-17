// src/app/inscription/page.jsx
"use client";
import InscriptionForm from '@/components/inscription/InscriptionForm';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PaymentIcon from '@mui/icons-material/Payment';
import styles from './page.module.css';

export const metadata = {
  title: "S'inscrire à un pèlerinage | Agence Sainte Rita Voyages",
  description: "Inscrivez-vous à l'un de nos pèlerinages 2026. Formulaire d'inscription sécurisé pour les pèlerinages vers les lieux saints.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InscriptionPage() {
  return (
    <>
      {/* Bannière */}
      <div className={styles.heroBanner}>
        <div className="container">
          <div className={styles.breadcrumb}>
            <span>Accueil</span> / <span>Pèlerinages</span> / <span className={styles.current}>Inscription</span>
          </div>
          <h1 className={styles.heroTitle}>Inscription à un pèlerinage</h1>
          <p className={styles.heroSubtitle}>
            Rejoignez-nous pour vivre une expérience spirituelle unique sur les lieux saints
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <InscriptionForm />

      {/* Bloc rassurant */}
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