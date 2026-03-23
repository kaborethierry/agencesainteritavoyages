// src/hooks/usePilgrimages.js
import { useState, useEffect, useCallback } from 'react';
import { pilgrimageAPI } from '@/lib/api';

export const usePilgrimages = (initialFilters = {}) => {
  const [pilgrimages, setPilgrimages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const [total, setTotal] = useState(0);

  const fetchPilgrimages = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pilgrimageAPI.getAll(params);
      setPilgrimages(data);
      setFiltered(data);
      setTotal(data.length);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPilgrimages(); }, [fetchPilgrimages]);

  useEffect(() => {
    if (!pilgrimages.length) return;
    let result = [...pilgrimages];
    if (filters.destination) {
      result = result.filter(p => p.destinations?.some(d => d.toLowerCase().includes(filters.destination.toLowerCase())) || p.location?.toLowerCase().includes(filters.destination.toLowerCase()) || p.country?.toLowerCase().includes(filters.destination.toLowerCase()));
    }
    if (filters.month) result = result.filter(p => p.month === filters.month);
    if (filters.priceMax) result = result.filter(p => p.price <= parseInt(filters.priceMax));
    if (filters.statut) result = result.filter(p => p.statut === filters.statut);
    setFiltered(result);
  }, [filters, pilgrimages]);

  const getPilgrimageById = useCallback(async (id) => pilgrimageAPI.getById(id), []);
  const getFeatured = useCallback(async (limit = 3) => pilgrimageAPI.getFeatured(limit), []);
  const create = useCallback(async (data) => { const newP = await pilgrimageAPI.create(data); setPilgrimages(prev => [...prev, newP]); return newP; }, []);
  const update = useCallback(async (id, data) => { const updated = await pilgrimageAPI.update(id, data); setPilgrimages(prev => prev.map(p => p.id === id ? updated : p)); return updated; }, []);
  const remove = useCallback(async (id) => { await pilgrimageAPI.delete(id); setPilgrimages(prev => prev.filter(p => p.id !== id)); return true; }, []);
  const toggleStatus = useCallback(async (id, current) => { const newStatus = current === 'actif' ? 'inactif' : 'actif'; const updated = await pilgrimageAPI.toggleStatus(id, newStatus); setPilgrimages(prev => prev.map(p => p.id === id ? updated : p)); return updated; }, []);
  const resetFilters = useCallback(() => setFilters(initialFilters), [initialFilters]);

  return { pilgrimages, filtered, loading, error, total, filters, setFilters, resetFilters, fetchPilgrimages, getPilgrimageById, getFeatured, create, update, remove, toggleStatus };
};

export default usePilgrimages;