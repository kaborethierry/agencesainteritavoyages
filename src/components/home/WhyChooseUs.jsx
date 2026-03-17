// src/components/home/WhyChooseUs.jsx
import SectionTitle from '@/components/ui/SectionTitle';
import styles from './WhyChooseUs.module.css';

const items = [
  {
    icon: "✝",
    titre: "Accompagnement spirituel",
    desc: "Prêtres et guides spirituels formés vous accompagnent à chaque étape du voyage pour approfondir votre foi."
  },
  {
    icon: "🛡",
    titre: "Agence certifiée & assurée",
    desc: "Agréée par l'État et couverte par une assurance responsabilité civile professionnelle, votre sécurité est notre priorité absolue."
  },
  {
    icon: "🌍",
    titre: "Destinations sacrées",
    desc: "Jérusalem, Rome, Lourdes, Fatima, Medjugorje, Saint-Jacques-de-Compostelle et bien d'autres lieux de pèlerinage."
  },
  {
    icon: "❤",
    titre: "Suivi personnalisé",
    desc: "De l'inscription au retour, une équipe dédiée répond à vos questions et s'occupe de tous les détails."
  },
  {
    icon: "✈",
    titre: "Organisation complète",
    desc: "Vols, hébergements, repas, visites, guides locaux, transports sur place : tout est pris en charge pour vous."
  },
  {
    icon: "🤝",
    titre: "Communauté fraternelle",
    desc: "Partez avec des frères et sœurs dans la foi, partagez des moments uniques et revenez avec des amis pour la vie."
  }
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionTitle
          surtitre="POURQUOI NOUS CHOISIR"
          titre="Une expérience de pèlerinage unique"
          description="Nous mettons tout en œuvre pour que votre voyage spirituel soit une réussite, dans la sérénité et la confiance."
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