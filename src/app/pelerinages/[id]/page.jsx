// src/app/pelerinages/[id]/page.jsx
import { notFound } from 'next/navigation';
import PilgrimageDetail from '@/components/pelerinages/PilgrimageDetail';
import PilgrimageCard from '@/components/pelerinages/PilgrimageCard';
import Button from '@/components/ui/Button';
import styles from './page.module.css';

// Données complètes de tous les pèlerinages selon vos informations
const allPilgrimages = [
  // 1. TERRE SAINTE / JÉRUSALEM 2026
  {
    id: 'terre-sainte-jerusalem-paques-2026',
    title: 'Terre Sainte – Jérusalem (Spécial Pâques)',
    location: 'Israël',
    country: 'Israël',
    duration: '13 jours / 12 nuits',
    price: 2000000,
    currency: 'FCFA',
    startDate: '27 mars 2026',
    endDate: '08 avril 2026',
    inscriptionDeadline: '28 février 2026',
    description: 'Pèlerinage en Terre Sainte permettant aux fidèles de marcher sur les traces du Christ et de vivre une expérience spirituelle profonde au cœur des lieux saints de Jérusalem et des villes bibliques d’Israël. Spécial Pâques.',
    image: '/images/pelerinages/jerusalem.jpg',
    destinations: ['Jérusalem', 'Israël'],
    month: 'Mars',
    featured: true,
  },
  {
    id: 'terre-sainte-jerusalem-juin-2026',
    title: 'Terre Sainte – Jérusalem (1er Groupe)',
    location: 'Israël',
    country: 'Israël',
    duration: '13 jours / 12 nuits',
    price: 2000000,
    currency: 'FCFA',
    startDate: '17 juin 2026',
    endDate: '29 juin 2026',
    inscriptionDeadline: '15 mai 2026',
    description: 'Pèlerinage en Terre Sainte permettant aux fidèles de marcher sur les traces du Christ et de vivre une expérience spirituelle profonde au cœur des lieux saints de Jérusalem et des villes bibliques d’Israël. 1er Groupe.',
    image: '/images/pelerinages/jerusalem.jpg',
    destinations: ['Jérusalem', 'Israël'],
    month: 'Juin',
    featured: false,
  },
  {
    id: 'terre-sainte-jerusalem-juillet-2026',
    title: 'Terre Sainte – Jérusalem (2e Groupe)',
    location: 'Israël',
    country: 'Israël',
    duration: '12 jours / 11 nuits',
    price: 2000000,
    currency: 'FCFA',
    startDate: '17 juillet 2026',
    endDate: '28 juillet 2026',
    inscriptionDeadline: '15 juin 2026',
    description: 'Pèlerinage en Terre Sainte permettant aux fidèles de marcher sur les traces du Christ et de vivre une expérience spirituelle profonde au cœur des lieux saints de Jérusalem et des villes bibliques d’Israël. 2e Groupe.',
    image: '/images/pelerinages/jerusalem.jpg',
    destinations: ['Jérusalem', 'Israël'],
    month: 'Juillet',
    featured: false,
  },
  {
    id: 'terre-sainte-jerusalem-noel-2026',
    title: 'Terre Sainte – Jérusalem (Spécial Noël)',
    location: 'Israël',
    country: 'Israël',
    duration: '11 jours / 10 nuits',
    price: 2000000,
    currency: 'FCFA',
    startDate: '18 décembre 2026',
    endDate: '28 décembre 2026',
    inscriptionDeadline: '15 novembre 2026',
    description: 'Pèlerinage en Terre Sainte permettant aux fidèles de marcher sur les traces du Christ et de vivre une expérience spirituelle profonde au cœur des lieux saints de Jérusalem et des villes bibliques d’Israël. Spécial Noël.',
    image: '/images/pelerinages/jerusalem.jpg',
    destinations: ['Jérusalem', 'Israël'],
    month: 'Décembre',
    featured: true,
  },

  // 2. POLOGNE
  {
    id: 'pologne-faustine-jean-paul-ii-2026',
    title: 'Pologne – Sur les pas de Sainte Faustine et Saint Jean-Paul II',
    location: 'Pologne',
    country: 'Pologne',
    duration: '17 jours / 16 nuits',
    price: 2500000,
    currency: 'FCFA',
    startDate: '08 avril 2026',
    endDate: '24 avril 2026',
    inscriptionDeadline: '28 février 2026',
    description: 'Pèlerinage sur les pas de Sainte Faustine et de Saint Jean-Paul II, figures majeures de la foi catholique en Pologne.',
    image: '/images/pelerinages/pologne.jpg',
    destinations: ['Cracovie', 'Varsovie', 'Wadowice', 'Czestochowa'],
    month: 'Avril',
    featured: true,
  },

  // 3. GRAND CIRCUIT MARIAL
  {
    id: 'grand-circuit-marial-europe-2026',
    title: 'Grand Circuit Marial en Europe',
    location: 'Banneux, Lisieux, Lourdes, Fatima, Medjugorje, Rome',
    country: 'Multi-pays',
    duration: '17 jours / 16 nuits',
    price: 3000000,
    currency: 'FCFA',
    startDate: '04 mai 2026',
    endDate: '20 mai 2026',
    inscriptionDeadline: '30 mars 2026',
    description: 'Grand circuit marial permettant de visiter plusieurs sanctuaires mariaux importants en Europe : Banneux, Lisieux, Lourdes, Fatima, Medjugorje et Rome.',
    image: '/images/pelerinages/marial-circuit.jpg',
    destinations: ['Banneux', 'Lisieux', 'Lourdes', 'Fatima', 'Medjugorje', 'Rome'],
    month: 'Mai',
    featured: true,
  },

  // 4. BANNEUX – LOURDES – ROME
  {
    id: 'banneux-lourdes-rome-2026',
    title: 'Banneux – Lourdes – Rome',
    location: 'Belgique, France, Italie',
    country: 'Multi-pays',
    duration: '16 jours / 15 nuits',
    price: 2500000,
    currency: 'FCFA',
    startDate: '09 août 2026',
    endDate: '24 août 2026',
    inscriptionDeadline: '30 mai 2026',
    description: 'Parcours spirituel à travers trois grands sanctuaires chrétiens en Europe : Banneux, Lourdes et Rome.',
    image: '/images/pelerinages/banneux-lourdes-rome.jpg',
    destinations: ['Banneux', 'Lourdes', 'Rome'],
    month: 'Août',
    featured: false,
  },

  // 5. CANADA
  {
    id: 'canada-montreal-quebec-2026',
    title: 'Canada – Montréal, Trois-Rivières et Québec',
    location: 'Canada',
    country: 'Canada',
    duration: '17 jours / 16 nuits',
    price: 3700000,
    currency: 'FCFA',
    startDate: '30 août 2026',
    endDate: '15 septembre 2026',
    inscriptionDeadline: '05 février 2026',
    description: 'Pèlerinage au Canada avec découverte spirituelle et culturelle des villes de Montréal, Trois-Rivières et Québec.',
    image: '/images/pelerinages/canada.jpg',
    destinations: ['Montréal', 'Trois-Rivières', 'Québec'],
    month: 'Août',
    featured: false,
  },

  // 6. ASSISE
  {
    id: 'assise-saint-francois-2026',
    title: 'Assise – Sur les pas de Saint François',
    location: 'Italie',
    country: 'Italie',
    duration: '16 jours / 15 nuits',
    price: 2500000,
    currency: 'FCFA',
    startDate: '29 septembre 2026',
    endDate: '14 octobre 2026',
    inscriptionDeadline: '30 juin 2026',
    description: 'Pèlerinage sur les pas de Saint François avec visites de Banneux, Assise et Rome.',
    image: '/images/pelerinages/assise.jpg',
    destinations: ['Banneux', 'Assise', 'Rome'],
    month: 'Septembre',
    featured: false,
  },

  // 7. AFRIQUE – CÔTE D’IVOIRE
  {
    id: 'afrique-cote-ivoire-2026-route',
    title: 'Afrique – Côte d’Ivoire (par route)',
    location: 'Yamoussoukro, Issia, Abidjan',
    country: 'Côte d\'Ivoire',
    duration: '13 jours / 12 nuits',
    price: 300000,
    currency: 'FCFA',
    startDate: '09 août 2026',
    endDate: '21 août 2026',
    inscriptionDeadline: '30 juin 2026',
    description: 'Pèlerinage en Côte d’Ivoire avec visites de Yamoussoukro, Issia et Abidjan. Transport par route.',
    image: '/images/pelerinages/cote-ivoire-route.jpg',
    destinations: ['Yamoussoukro', 'Issia', 'Abidjan'],
    month: 'Août',
    featured: false,
  },
  {
    id: 'afrique-cote-ivoire-2026-avion',
    title: 'Afrique – Côte d’Ivoire (par avion)',
    location: 'Yamoussoukro, Issia, Abidjan',
    country: 'Côte d\'Ivoire',
    duration: '13 jours / 12 nuits',
    price: 700000,
    currency: 'FCFA',
    startDate: '09 août 2026',
    endDate: '21 août 2026',
    inscriptionDeadline: '30 juin 2026',
    description: 'Pèlerinage en Côte d’Ivoire avec visites de Yamoussoukro, Issia et Abidjan. Transport par avion.',
    image: '/images/pelerinages/cote-ivoire.jpg',
    destinations: ['Yamoussoukro', 'Issia', 'Abidjan'],
    month: 'Août',
    featured: false,
  }
];

// Composant avec gestion de params async pour Next.js 15+
export default async function PilgrimagePage({ params }) {
  // Attendre que params soit résolu (Next.js 15+)
  const { id } = await params;
  
  // Récupérer le pèlerinage correspondant à l'ID
  const pilgrimage = allPilgrimages.find(p => p.id === id);

  // Si le pèlerinage n'existe pas, retourner 404
  if (!pilgrimage) {
    notFound();
  }

  // Récupérer les pèlerinages similaires
  const getSimilarPilgrimages = (currentId, country, month) => {
    return allPilgrimages
      .filter(p => p.id !== currentId)
      .filter(p => p.country === country || p.month === month)
      .slice(0, 3);
  };

  const similarPilgrimages = getSimilarPilgrimages(
    pilgrimage.id, 
    pilgrimage.country, 
    pilgrimage.month
  );

  return (
    <>
      {/* Composant de détail principal */}
      <PilgrimageDetail pilgrimage={pilgrimage} />

      {/* Section pèlerinages similaires */}
      {similarPilgrimages.length > 0 && (
        <section className={styles.similarSection}>
          <div className="container">
            <h2 className={styles.similarTitle}>Pèlerinages similaires</h2>
            <div className={styles.similarGrid}>
              {similarPilgrimages.map((p) => (
                <PilgrimageCard key={p.id} pilgrimage={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bandeau CTA */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Prêt à vivre cette expérience spirituelle ?</h3>
            <p className={styles.ctaText}>
              Réservez dès maintenant votre place pour ce pèlerinage unique
            </p>
            <div className={styles.ctaButtons}>
              <Button href={`/inscription?pelerinage=${pilgrimage.id}`} variant="primary" size="lg">
                S'inscrire à ce pèlerinage
              </Button>
              <Button href="/contact" variant="outlineWhite" size="lg">
                Demander plus d'informations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Générer les métadonnées dynamiquement
export async function generateMetadata({ params }) {
  const { id } = await params;
  const pilgrimage = allPilgrimages.find(p => p.id === id);
  
  if (!pilgrimage) {
    return {
      title: 'Pèlerinage non trouvé',
    };
  }

  return {
    title: `${pilgrimage.title} — Pèlerinage ${pilgrimage.startDate}`,
    description: pilgrimage.description,
    openGraph: {
      title: pilgrimage.title,
      description: pilgrimage.description,
      images: [{ url: pilgrimage.image }],
    },
  };
}

// Générer les pages statiquement à la build
export async function generateStaticParams() {
  return allPilgrimages.map((pilgrimage) => ({
    id: pilgrimage.id,
  }));
}