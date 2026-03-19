// src/components/home/WhyChooseUs.jsx
import SectionTitle from '@/components/ui/SectionTitle';
import ChurchIcon from '@mui/icons-material/Church';
import VerifiedIcon from '@mui/icons-material/Verified';
import PublicIcon from '@mui/icons-material/Public';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlightIcon from '@mui/icons-material/Flight';
import GroupsIcon from '@mui/icons-material/Groups';
import styles from './WhyChooseUs.module.css';

const items = [
  {
    icon: <ChurchIcon />,
    titre: "Accompagnement spirituel",
    desc: "Guides spirituels formés vous accompagnent à chaque étape du voyage pour approfondir votre foi."
  },
  {
    icon: <VerifiedIcon />,
    titre: "Agence certifiée & assurée",
    desc: "Agréée par l'État et couverte par une assurance responsabilité civile professionnelle, votre sécurité est notre priorité absolue."
  },
  {
    icon: <PublicIcon />,
    titre: "Destinations sacrées",
    desc: "Jérusalem, Rome, Lourdes, Fatima, Medjugorje, Saint-Jacques-de-Compostelle et bien d'autres lieux saints."
  },
  {
    icon: <FavoriteIcon />,
    titre: "Suivi personnalisé",
    desc: "De l'inscription au retour, une équipe dédiée répond à vos questions et s'occupe de tous les détails."
  },
  {
    icon: <FlightIcon />,
    titre: "Organisation complète",
    desc: "Vols, hébergements, repas, visites, guides locaux, transports sur place : tout est pris en charge pour vous."
  },
  {
    icon: <GroupsIcon />,
    titre: "Communauté fraternelle",
    desc: "Partagez des moments uniques et revenez avec des amis pour la vie."
  }
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          surtitre="POURQUOI NOUS CHOISIR"
          titre="Des voyages spirituels uniques"
          description="Nous mettons tout en œuvre pour que votre voyage de ressourcement soit une réussite, dans la sérénité et la confiance."
          centered={true}
          light={true}
        />

        <div className={styles.grid}>
          {items.map((item, index) => (
            <article key={index} className={styles.item}>
              <span className={styles.icon}>{item.icon}</span>
              <h3 className={styles.itemTitle}>{item.titre}</h3>
              <p className={styles.itemDesc}>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}