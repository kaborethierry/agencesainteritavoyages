// src/app/inscription/page.jsx
// ⚠️ PAS DE "use client" ici !
import InscriptionClient from './InscriptionClient';
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
  return <InscriptionClient />;
}