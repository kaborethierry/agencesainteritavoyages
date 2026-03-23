import { pilgrimageAPI } from '@/lib/api';

export default async function sitemap() {
  const baseUrl = 'https://www.sainterita-voyages.com';
  
  // Récupérer les pèlerinages
  let pilgrimages = [];
  try {
    pilgrimages = await pilgrimageAPI.getAll();
  } catch (error) {
    console.error('Erreur récupération pèlerinages pour sitemap:', error);
  }

  // Pages statiques
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pelerinages`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/inscription`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Pages dynamiques des pèlerinages
  const pilgrimagePages = pilgrimages.map((p) => ({
    url: `${baseUrl}/pelerinages/${p.id}`,
    lastModified: new Date(p.updated_at || p.created_at || new Date()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...pilgrimagePages];
}