import './globals.css';
import GlobalLoader from '@/components/ui/GlobalLoader';
import ClientLayout from '@/components/ClientLayout';

// 📌 METADATA pour le SEO - OPTIMISÉ
export const metadata = {
  metadataBase: new URL('https://www.sainterita-voyages.com'),
  title: {
    template: '%s | Agence Sainte Rita Voyages',
    default: 'Agence Sainte Rita Voyages | Pèlerinages Chrétiens',
  },
  description: "Spécialiste des pèlerinages chrétiens depuis 2004. Voyages spirituels à Jérusalem, Rome, Lourdes, Fatima, Medjugorje, Pologne, Canada. Organisez votre pèlerinage avec une agence experte.",
  keywords: "pèlerinage, chrétien, voyage spirituel, Jérusalem, Rome, Lourdes, Fatima, Medjugorje, Pologne, Canada, Terre Sainte, agence de voyage, pèlerinage chrétien",
  authors: [{ name: "Agence Sainte Rita Voyages", url: "https://www.sainterita-voyages.com" }],
  creator: "Agence Sainte Rita Voyages",
  publisher: "Agence Sainte Rita Voyages",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.sainterita-voyages.com',
  },
  openGraph: {
    title: 'Agence Sainte Rita Voyages | Pèlerinages Chrétiens',
    description: "Spécialiste des pèlerinages chrétiens depuis 2004. Voyages spirituels à Jérusalem, Rome, Lourdes, Fatima, Medjugorje.",
    url: 'https://www.sainterita-voyages.com',
    siteName: 'Agence Sainte Rita Voyages',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Agence Sainte Rita Voyages - Pèlerinages Chrétiens',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agence Sainte Rita Voyages | Pèlerinages Chrétiens',
    description: "Spécialiste des pèlerinages chrétiens depuis 2004. Voyages spirituels à Jérusalem, Rome, Lourdes, Fatima.",
    images: ['/images/og-image.jpg'],
    creator: '@sainterita',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'votre-code-de-verification-google',
  },
  category: 'travel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <GlobalLoader />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}