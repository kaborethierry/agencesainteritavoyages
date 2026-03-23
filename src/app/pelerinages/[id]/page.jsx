// src/app/pelerinages/[id]/page.jsx
import { notFound } from 'next/navigation';
import PilgrimageDetail from '@/components/pelerinages/PilgrimageDetail';
import PilgrimageCard from '@/components/pelerinages/PilgrimageCard';
import Button from '@/components/ui/Button';
import { pilgrimageAPI } from '@/lib/api';
import styles from './page.module.css';

export default async function PilgrimagePage({ params }) {
  const { id } = await params;
  const pilgrimage = await pilgrimageAPI.getById(id);

  if (!pilgrimage) {
    notFound();
  }

  const allPilgrimages = await pilgrimageAPI.getAll();
  const similarPilgrimages = allPilgrimages
    .filter(p => p.id !== id)
    .filter(p => p.country === pilgrimage.country || p.month === pilgrimage.month)
    .slice(0, 3);

  return (
    <>
      <PilgrimageDetail pilgrimage={pilgrimage} />

      {similarPilgrimages.length > 0 && (
        <section className={styles.similarSection}>
          <div className="container">
            <h2 className={styles.similarTitle}>Voyages similaires</h2>
            <div className={styles.similarGrid}>
              {similarPilgrimages.map((p) => (
                <PilgrimageCard key={p.id} pilgrimage={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Prêt à vivre cette expérience spirituelle ?</h3>
            <p className={styles.ctaText}>
              Réservez dès maintenant votre place pour ce voyage unique
            </p>
            <div className={styles.ctaButtons}>
              <Button href={`/inscription?pelerinage=${pilgrimage.id}`} variant="primary" size="lg">
                S'inscrire à ce voyage
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

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pilgrimage = await pilgrimageAPI.getById(id);
  
  if (!pilgrimage) {
    return { title: 'Voyage non trouvé' };
  }

  return {
    title: `${pilgrimage.title} — ${pilgrimage.startDate}`,
    description: pilgrimage.description,
    openGraph: {
      title: pilgrimage.title,
      description: pilgrimage.description,
      images: [{ url: pilgrimage.image }],
    },
  };
}

export async function generateStaticParams() {
  const pilgrimages = await pilgrimageAPI.getAll();
  return pilgrimages.map((p) => ({ id: p.id }));
}