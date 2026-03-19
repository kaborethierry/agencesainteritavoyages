// src/app/a-propos/page.jsx
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import MissionValues from '@/components/about/MissionValues';
import TeamCard from '@/components/about/TeamCard';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

export const metadata = {
  title: 'À Propos — Notre Histoire | Agence Sainte Rita Voyages',
  description: 'Découvrez Agence Sainte Rita Voyages (ASR Voyages), spécialiste des voyages spirituels vers les sanctuaires chrétiens.',
};

export default function AboutPage() {
  // Calcul du nombre d'années d'expérience (fondée en 2018)
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2018;

  // Données de l'équipe - uniquement le directeur
  const teamMembers = [
    {
      id: 1,
      nom: 'Tiendrebeogo W. Iréné',
      poste: 'Responsable de l\'agence',
      description: 'Fondateur d\'ASR Voyages, passionné par les voyages spirituels et dévoué à offrir des expériences de ressourcement authentiques.',
      email: 'irene.tiendrebeogo@asr-voyages.bf',
      phone: '70 26 64 41',
      photo: '/images/team/irene.jpg',
    }
  ];

  // Données des partenaires
  const partenaires = [
    { nom: 'Bank of Africa', logo: '/images/partenaires/boa.png' },
    { nom: 'CODEC Ouaga', logo: '/images/partenaires/codec.png' },
    { nom: 'Cathédrale de Ouagadougou', logo: '/images/partenaires/cathedrale.png' },
    { nom: 'Assurances Voyages', logo: '/images/partenaires/assurance.png' },
  ];

  return (
    <>
      {/* Bannière */}
      <div className={styles.heroBanner}>
        <div className="container">
          <h1 className={styles.heroTitle}>Notre Histoire</h1>
          <p className={styles.heroSubtitle}>
            Agence Sainte Rita Voyages (ASR Voyages) — Vers les lieux saints
          </p>
        </div>
      </div>

      <div className="container">
        {/* Section Histoire */}
        <section className={styles.historySection}>
          <div className={styles.historyGrid}>
            <div className={styles.historyImage}>
              <Image
                src="/images/about/history.jpg"
                alt="Agence Sainte Rita Voyages"
                fill
                className={styles.image}
              />
            </div>
            <div className={styles.historyContent}>
              <SectionTitle
                surtitre="NOTRE HISTOIRE"
                titre="Une agence au service des voyageurs"
              />
              <p className={styles.historyText}>
                Fondée en <strong>2018</strong>, <strong>Agence Sainte Rita Voyages (ASR Voyages)</strong> est née d'une conviction profonde : 
                permettre aux fidèles de vivre des expériences spirituelles authentiques sur les lieux saints.
              </p>
              <p className={styles.historyText}>
                Nous sommes une agence spécialisée dans les voyages de tourisme et surtout les voyages spirituels vers les sanctuaires 
                chrétiens et les sites de hauts lieux de la chrétienté. Notre mission est d'organiser des voyages qui nourrissent 
                la foi et créent des souvenirs impérissables.
              </p>
              <p className={styles.historyText}>
                Depuis notre création, nous avons accompagné des milliers de voyageurs à Jérusalem, Rome, Lourdes, Fatima, 
                Medjugorje et dans tant d'autres destinations sacrées. Chaque voyage est pour nous une occasion de 
                vivre notre slogan : <strong className={styles.slogan}>"Vers les lieux saints"</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section Mission et Valeurs */}
        <MissionValues />

        {/* Section Chiffres clés */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>+ de 150</span>
              <span className={styles.statLabel}>Voyages organisés</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>+ de 5 000</span>
              <span className={styles.statLabel}>Participants</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{yearsOfExperience}</span>
              <span className={styles.statLabel}>Années d'expérience</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15</span>
              <span className={styles.statLabel}>Destinations</span>
            </div>
          </div>
        </section>

        {/* Section Équipe - Un seul membre */}
        <section className={styles.teamSection}>
          <SectionTitle
            surtitre="NOTRE ÉQUIPE"
            titre="Le responsable de l'agence"
            description="Un professionnel passionné et dévoué à votre service"
            centered={true}
          />

          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Section Partenaires */}
        <section className={styles.partnersSection}>
          <SectionTitle
            surtitre="ILS NOUS FONT CONFIANCE"
            titre="Nos partenaires"
            centered={true}
          />

          <div className={styles.partnersGrid}>
            {partenaires.map((partenaire, index) => (
              <div key={index} className={styles.partnerItem}>
                <Image
                  src={partenaire.logo}
                  alt={partenaire.nom}
                  width={120}
                  height={80}
                  className={styles.partnerLogo}
                />
                <span className={styles.partnerName}>{partenaire.nom}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Faites confiance à notre expérience</h2>
            <p className={styles.ctaText}>
              {yearsOfExperience} ans d'accompagnement spirituel et d'organisation de voyages
            </p>
            <div className={styles.ctaButtons}>
              <Button href="/pelerinages" variant="primary" size="lg">
                Découvrir nos voyages
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contactez-nous
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}