// src/app/contact/page.jsx
import ContactForm from '@/components/contact/ContactForm';
import styles from './page.module.css';

export const metadata = {
  title: 'Contactez-nous | Agence Sainte Rita Voyages',
  description: 'Contactez Agence Sainte Rita Voyages (ASR Voyages) pour vos pèlerinages et voyages spirituels. Téléphone, email, adresse et horaires.',
};

export default function ContactPage() {
  return (
    <>
      {/* Bannière */}
      <div className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>Contactez-nous</h1>
          <p className={styles.heroSubtitle}>
            Nous sommes à votre écoute pour répondre à toutes vos questions
          </p>
        </div>
      </div>

      {/* Formulaire et infos */}
      <ContactForm />
    </>
  );
}