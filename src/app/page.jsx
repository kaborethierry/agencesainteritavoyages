// src/app/page.jsx
import Hero from '@/components/home/Hero';
import FeaturedPilgrimages from '@/components/home/FeaturedPilgrimages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import VersetBible from '@/components/home/VersetBible';
import Testimonials from '@/components/home/Testimonials';
import PhotoGallery from '@/components/home/PhotoGallery'; // Import de la galerie

export const metadata = {
  title: 'Accueil — Agence Sainte Rita Voyages',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPilgrimages />
      <WhyChooseUs />
      <VersetBible />
      <Testimonials />
      <PhotoGallery /> {/* Galerie ajoutée ici */}
    </>
  );
}