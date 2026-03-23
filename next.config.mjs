/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Pour la production, laisser l'optimisation active
    unoptimized: process.env.NODE_ENV === 'development',
    
    // Formats d'images modernes pour meilleures performances SEO
    formats: ['image/avif', 'image/webp'],
    
    // Tailles d'images optimisées pour le responsive
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Configuration des sources d'images distantes
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },
      // Pour les images locales
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
    
    // Minimiser la qualité pour améliorer les performances (optionnel)
    minimumCacheTTL: 60,
    
    // Désactiver les images dangereuses
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compression pour améliorer les performances SEO
  compress: true,
  
  // Headers de sécurité pour le SEO
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/uploads/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Redirections pour le SEO
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Réécritures pour les images uploadées
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
    ];
  },
  
  // Configuration des environnements
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
  
  // Powered by header (optionnel pour le SEO)
  poweredByHeader: false,
  
  // Trailing slashes pour les URLs canoniques
  trailingSlash: false,
  
  // Optimisation des polices
  optimizeFonts: true,
  
  // Autoriser les connexions à localhost en développement
  allowedDevOrigins: ['localhost', '127.0.0.1'],
  
  // Webpack configuration pour optimiser les bundles
  webpack: (config, { isServer }) => {
    // Optimiser les chargements
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;