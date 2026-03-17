// src/app/layout.jsx
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlobalLoader from '@/components/ui/GlobalLoader'; // Import du loader

// 📌 METADATA pour le SEO
export const metadata = {
  title: {
    template: '%s — Pèlerinages Chrétiens',
    default: 'Pèlerinages Chrétiens | Voyages Spirituels',
  },
  description: "Spécialiste des voyages spirituels — Jérusalem, Rome, Lourdes, Fatima. Vivez une expérience de foi inoubliable.",
  keywords: "pèlerinage, chrétien, Jérusalem, Rome, Lourdes, Fatima, Medjugorje, voyage spirituel, foi, agence de voyage",
  authors: [{ name: "Agence Sainte Rita Voyages" }],
  openGraph: {
    title: 'Pèlerinages Chrétiens | Voyages Spirituels',
    description: "Spécialiste des voyages spirituels — Jérusalem, Rome, Lourdes, Fatima.",
    url: 'https://www.votre-site.com',
    siteName: 'Pèlerinages Chrétiens',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pèlerinages Chrétiens - Aperçu',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <GlobalLoader /> {/* Loader global au démarrage */}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}