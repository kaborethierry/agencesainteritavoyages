// src/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const localPilgrimages = [
  {
    id: 'terre-sainte-jerusalem-paques-2026',
    titre: 'Terre Sainte – Jérusalem (Spécial Pâques)',
    location: 'Israël',
    country: 'Israël',
    duration: '13 jours / 12 nuits',
    price: 2000000,
    currency: 'FCFA',
    start_date: '2026-03-27',
    end_date: '2026-04-08',
    description: 'Voyage en Terre Sainte permettant de marcher sur les traces du Christ. Spécial Pâques.',
    long_description: '',
    image: '/images/pelerinages/jerusalem.jpg',
    gallery: [],
    month: 'Mars',
    featured: true,
    status: 'actif',
    places_total: 30,
    places_reservees: 0,
    prix_enfant: null,
    conditions: '',
    documents_requis: '',
    inclus: ['Vols internationaux A/R', 'Hébergement en hôtels 3* et 4*', 'Pension complète', 'Visites guidées'],
    non_inclus: ['Dépenses personnelles', 'Pourboires', 'Assurance annulation'],
    programme: [
      { jour: 1, titre: 'Départ de Ouagadougou', description: 'Vol pour Tel Aviv via Paris' },
      { jour: 2, titre: 'Arrivée à Jérusalem', description: 'Accueil et transfert à l\'hôtel' }
    ]
  },
  {
    id: 'pologne-faustine-jean-paul-ii-2026',
    titre: 'Pologne – Sur les pas de Sainte Faustine et Saint Jean-Paul II',
    location: 'Pologne',
    country: 'Pologne',
    duration: '17 jours / 16 nuits',
    price: 2500000,
    currency: 'FCFA',
    start_date: '2026-04-08',
    end_date: '2026-04-24',
    description: 'Voyage sur les pas de Sainte Faustine et de Saint Jean-Paul II.',
    long_description: '',
    image: '/images/pelerinages/pologne.jpg',
    gallery: [],
    month: 'Avril',
    featured: true,
    status: 'actif',
    places_total: 30,
    places_reservees: 0,
    prix_enfant: null,
    conditions: '',
    documents_requis: '',
    inclus: ['Vols A/R', 'Hébergement en hôtels 3*', 'Demi-pension', 'Visites guidées'],
    non_inclus: ['Dépenses personnelles', 'Pourboires', 'Assurance'],
    programme: []
  },
  {
    id: 'grand-circuit-marial-europe-2026',
    titre: 'Grand Circuit Marial en Europe',
    location: 'Multi-pays',
    country: 'Multi-pays',
    duration: '17 jours / 16 nuits',
    price: 3000000,
    currency: 'FCFA',
    start_date: '2026-05-04',
    end_date: '2026-05-20',
    description: 'Grand circuit marial en Europe.',
    long_description: '',
    image: '/images/pelerinages/marial-circuit.jpg',
    gallery: [],
    month: 'Mai',
    featured: true,
    status: 'actif',
    places_total: 30,
    places_reservees: 0,
    prix_enfant: null,
    conditions: '',
    documents_requis: '',
    inclus: ['Vols internationaux', 'Hébergement en hôtels 3*', 'Pension complète', 'Visites des sanctuaires'],
    non_inclus: ['Dépenses personnelles', 'Pourboires'],
    programme: []
  },
  {
    id: 'canada-montreal-quebec-2026',
    titre: 'Canada – Montréal, Trois-Rivières et Québec',
    location: 'Canada',
    country: 'Canada',
    duration: '17 jours / 16 nuits',
    price: 3700000,
    currency: 'FCFA',
    start_date: '2026-08-30',
    end_date: '2026-09-15',
    description: 'Voyage au Canada.',
    long_description: '',
    image: '/images/pelerinages/canada.jpg',
    gallery: [],
    month: 'Août',
    featured: false,
    status: 'actif',
    places_total: 30,
    places_reservees: 0,
    prix_enfant: null,
    conditions: '',
    documents_requis: '',
    inclus: [],
    non_inclus: [],
    programme: []
  }
];

const safeParseJSON = (str, defaultValue = []) => {
  if (!str) return defaultValue;
  if (Array.isArray(str)) return str;
  try {
    return typeof str === 'string' ? JSON.parse(str) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

function transformPilgrimage(data) {
  if (!data) return null;
  
  return {
    id: data.id || '',
    titre: data.titre || data.title || '',
    title: data.titre || data.title || '',
    location: data.location || '',
    country: data.country || '',
    duration: data.duration || '',
    price: data.price || 0,
    currency: data.currency || 'FCFA',
    start_date: data.start_date || '',
    end_date: data.end_date || '',
    startDate: data.start_date || '',
    endDate: data.end_date || '',
    inscription_deadline: data.inscription_deadline || '',
    description: data.description || '',
    long_description: data.long_description || data.longDescription || '',
    image: data.image || '',
    gallery: safeParseJSON(data.gallery, []),
    month: data.month || '',
    featured: data.featured === 1 || data.featured === true,
    status: data.status || 'actif',
    places_total: data.places_total || 30,
    places_reservees: data.places_reservees || 0,
    prix_enfant: data.prix_enfant || null,
    conditions: data.conditions || '',
    documents_requis: data.documents_requis || '',
    destinations: data.destinations ? safeParseJSON(data.destinations) : [data.location],
    inclus: data.inclus ? safeParseJSON(data.inclus) : (data.included ? safeParseJSON(data.included) : []),
    non_inclus: data.non_inclus ? safeParseJSON(data.non_inclus) : (data.notIncluded ? safeParseJSON(data.notIncluded) : []),
    programme: data.programme ? safeParseJSON(data.programme) : (data.itinerary ? safeParseJSON(data.itinerary) : [])
  };
}

function transformToBackend(data) {
  return {
    id: data.id,
    titre: data.titre || data.title,
    location: data.location,
    country: data.country,
    duration: data.duration,
    price: parseInt(data.price) || 0,
    currency: data.currency || 'FCFA',
    start_date: data.start_date || data.startDate,
    end_date: data.end_date || data.endDate,
    inscription_deadline: data.inscription_deadline || null,
    description: data.description,
    long_description: data.long_description || data.longDescription || '',
    image: data.image || '',
    gallery: Array.isArray(data.gallery) ? JSON.stringify(data.gallery) : (data.gallery || '[]'),
    month: data.month || '',
    featured: data.featured ? 1 : 0,
    status: data.status || 'actif',
    places_total: parseInt(data.places_total) || 30,
    places_reservees: parseInt(data.places_reservees) || 0,
    prix_enfant: data.prix_enfant ? parseInt(data.prix_enfant) : null,
    conditions: data.conditions || '',
    documents_requis: data.documents_requis || '',
    inclus: Array.isArray(data.inclus) ? JSON.stringify(data.inclus) : (data.included ? JSON.stringify(data.included) : '[]'),
    non_inclus: Array.isArray(data.non_inclus) ? JSON.stringify(data.non_inclus) : (data.notIncluded ? JSON.stringify(data.notIncluded) : '[]'),
    programme: Array.isArray(data.programme) ? JSON.stringify(data.programme) : (data.itinerary ? JSON.stringify(data.itinerary) : '[]')
  };
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const config = { ...options, headers };

  try {
    const response = await fetch(url, config);
    
    if (response.status === 204) {
      return { success: true };
    }
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }
    
    return data;
  } catch (error) {
    console.warn(`API Error ${endpoint}:`, error.message);
    throw error;
  }
}

export const pilgrimageAPI = {
  getAll: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const data = await request(`/pelerinages${query ? `?${query}` : ''}`);
      if (Array.isArray(data)) {
        return data.map(transformPilgrimage);
      }
      return localPilgrimages.map(transformPilgrimage);
    } catch (error) {
      return localPilgrimages.map(transformPilgrimage);
    }
  },
  
  getFeatured: async (limit = 3) => {
    try {
      const data = await request(`/pelerinages?featured=true&limit=${limit}`);
      if (Array.isArray(data)) {
        return data.map(transformPilgrimage);
      }
      return localPilgrimages.filter(p => p.featured).slice(0, limit).map(transformPilgrimage);
    } catch (error) {
      return localPilgrimages.filter(p => p.featured).slice(0, limit).map(transformPilgrimage);
    }
  },
  
  getById: async (id) => {
    try {
      const data = await request(`/pelerinages/${id}`);
      const transformed = transformPilgrimage(data);
      if (transformed) return transformed;
      throw new Error('Pèlerinage non trouvé');
    } catch (error) {
      const localData = localPilgrimages.find(p => p.id === id);
      if (localData) {
        return transformPilgrimage(localData);
      }
      throw error;
    }
  },
  
  create: async (data) => {
    const backendData = transformToBackend(data);
    const result = await request('/pelerinages', { 
      method: 'POST', 
      body: JSON.stringify(backendData) 
    });
    return transformPilgrimage(result);
  },
  
  update: async (id, data) => {
    const backendData = transformToBackend(data);
    const result = await request(`/pelerinages/${id}`, { 
      method: 'PUT', 
      body: JSON.stringify(backendData) 
    });
    return transformPilgrimage(result);
  },
  
  delete: async (id) => {
    return request(`/pelerinages/${id}`, { method: 'DELETE' });
  },
  
  toggleStatus: async (id, status) => {
    const result = await request(`/pelerinages/${id}/status`, { 
      method: 'PATCH', 
      body: JSON.stringify({ status }) 
    });
    return result;
  }
};

export const authAPI = {
  login: async (email, password) => {
    const result = await request('/auth/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    });
    if (result.token) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin_token', result.token);
        localStorage.setItem('admin_user', JSON.stringify(result.user));
      }
    }
    return result;
  },
  
  logout: () => { 
    if (typeof window !== 'undefined') { 
      localStorage.removeItem('admin_token'); 
      localStorage.removeItem('admin_user'); 
    } 
  },
  
  getCurrentUser: () => { 
    if (typeof window !== 'undefined') { 
      const user = localStorage.getItem('admin_user'); 
      return user ? JSON.parse(user) : null; 
    } 
    return null; 
  },
  
  isAuthenticated: () => { 
    if (typeof window !== 'undefined') { 
      return !!localStorage.getItem('admin_token'); 
    } 
    return false; 
  }
};

export const inscriptionAPI = {
  create: (data) => request('/inscriptions', { method: 'POST', body: JSON.stringify(data) }),
  getAll: async (params = {}) => { 
    const query = new URLSearchParams(params).toString(); 
    return request(`/inscriptions${query ? `?${query}` : ''}`); 
  },
  getById: (id) => request(`/inscriptions/${id}`),
  updateStatus: (id, statut) => request(`/inscriptions/${id}/status`, { method: 'PATCH', body: JSON.stringify({ statut }) }),
  delete: (id) => request(`/inscriptions/${id}`, { method: 'DELETE' })
};

// CORRECTION : Les routes messages doivent correspondre à /contact (comme dans le backend)
export const contactAPI = {
  send: (data) => request('/contact', { method: 'POST', body: JSON.stringify(data) }),
  getAll: async (params = {}) => { 
    const query = new URLSearchParams(params).toString(); 
    return request(`/contact${query ? `?${query}` : ''}`); 
  },
  getById: (id) => request(`/contact/${id}`),
  markAsRead: (id) => request(`/contact/${id}/read`, { method: 'PATCH' }),
  delete: (id) => request(`/contact/${id}`, { method: 'DELETE' })
};

export const adminAPI = {
  getStats: () => request('/admin/stats'),
  getDashboard: () => request('/admin/dashboard')
};

export const uploadAPI = {
  uploadImage: async (file, type = 'pelerinages') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);
    
    const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;
    
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: headers,
      body: formData,
    });
    
    if (!response.ok) {
      let errorMessage = 'Erreur lors de l\'upload';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {}
      throw new Error(errorMessage);
    }
    
    return response.json();
  }
};

const api = { 
  auth: authAPI, 
  pilgrimages: pilgrimageAPI, 
  inscriptions: inscriptionAPI, 
  contact: contactAPI, 
  admin: adminAPI, 
  upload: uploadAPI 
};

export default api;