// src/components/about/MissionValues.jsx
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import ChurchIcon from '@mui/icons-material/Church';
import SpaIcon from '@mui/icons-material/Spa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import styles from './MissionValues.module.css';

const valeurs = [
  {
    icone: <ChurchIcon />,
    titre: "Foi",
    description: "Nous mettons notre expertise au service de votre foi, en organisant des voyages authentiques sur les lieux saints."
  },
  {
    icone: <SpaIcon />,
    titre: "Paix intérieure",
    description: "Chaque voyage est pensé pour vous offrir des moments de recueillement et de paix intérieure."
  },
  {
    icone: <FavoriteIcon />,
    titre: "Fraternité",
    description: "Nous créons des espaces de partage et de communion entre voyageurs, pour des souvenirs impérissables."
  },
  {
    icone: <StarIcon />,
    titre: "Excellence",
    description: "Depuis notre création en 2018, nous nous engageons à fournir un service de qualité irréprochable."
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
              permettre à chacun de vivre des expériences spirituelles authentiques en guidant les voyageurs 
              vers les lieux saints.
            </p>
            <p className={styles.missionText}>
              Nous croyons que le voyage spirituel est bien plus qu'un simple déplacement : c'est une démarche de foi, 
              un cheminement intérieur, une rencontre avec Dieu et avec soi-même. C'est pourquoi nous 
              mettons tout en œuvre pour que chaque voyage soit une expérience transformative.
            </p>
            <blockquote className={styles.missionQuote}>
              "Vers les lieux saints" — plus qu'un slogan, une vocation.
            </blockquote>
          </div>
          
          <div className={styles.imageRight}>
            <Image
              src="/images/about/mission.jpg"
              alt="Voyageurs en prière"
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