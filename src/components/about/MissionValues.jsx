// src/components/about/MissionValues.jsx
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './MissionValues.module.css';

const valeurs = [
  {
    icone: "✝",
    titre: "Foi",
    description: "Nous mettons notre expertise au service de votre foi, en organisant des pèlerinages authentiques sur les lieux saints."
  },
  {
    icone: "🕊",
    titre: "Paix",
    description: "Chaque voyage est pensé pour vous offrir des moments de recueillement et de paix intérieure."
  },
  {
    icone: "❤",
    titre: "Fraternité",
    description: "Nous créons des espaces de partage et de communion entre pèlerins, pour des souvenirs impérissables."
  },
  {
    icone: "🌟",
    titre: "Excellence",
    description: "Depuis 21 ans, nous nous engageons à fournir un service de qualité irréprochable."
  }
];

export default function MissionValues() {
  return (
    <section className={styles.section}>
      <div className="container">
        {/* Mission Grid */}
        <div className={styles.missionGrid}>
          <div className={styles.missionContent}>
            <SectionTitle
              surtitre="NOTRE MISSION"
              titre="Pourquoi nous existons"
            />
            <p className={styles.missionText}>
              Chez <strong>Agence Sainte Rita Voyages (ASR Voyages)</strong>, notre mission est claire : 
              permettre aux fidèles de vivre des expériences spirituelles authentiques en les guidant 
              vers les lieux saints de la chrétienté.
            </p>
            <p className={styles.missionText}>
              Nous croyons que le pèlerinage est bien plus qu'un voyage : c'est une démarche de foi, 
              un cheminement intérieur, une rencontre avec Dieu et avec soi-même. C'est pourquoi nous 
              mettons tout en œuvre pour que chaque pèlerinage soit une expérience transformative.
            </p>
            <blockquote className={styles.missionQuote}>
              "Vers les lieux saints" — plus qu'un slogan, une vocation.
            </blockquote>
          </div>
          
          <div className={styles.imageRight}>
            <Image
              src="/images/about/mission.jpg"
              alt="Pèlerins en prière"
              fill
              className={styles.missionImage}
            />
          </div>
        </div>

        {/* Valeurs Grid */}
        <div className={styles.valuesGrid}>
          {valeurs.map((valeur, index) => (
            <div key={index} className={styles.valueItem}>
              <span className={styles.valueIcon}>{valeur.icone}</span>
              <h3 className={styles.valueTitle}>{valeur.titre}</h3>
              <p className={styles.valueDesc}>{valeur.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}