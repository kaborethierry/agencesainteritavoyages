// src/app/page.jsx
import Hero from '@/components/home/Hero';
import FeaturedPilgrimages from '@/components/home/FeaturedPilgrimages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import VersetBible from '@/components/home/VersetBible';
import Testimonials from '@/components/home/Testimonials';

// 📌 SEO spécifique à la page d'accueil
export const metadata = {
  title: 'Accueil', // Sera combiné avec le template : "Accueil — Pèlerinages Chrétiens"
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPilgrimages />
      <WhyChooseUs />
      <VersetBible />
      <Testimonials />
    </>
  );
}