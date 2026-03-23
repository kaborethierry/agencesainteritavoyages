// src/lib/utils.js
export const formatPrice = (price) => new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';

export const formatDate = (date, format = 'fr') => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  if (format === 'fr') return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  if (format === 'fr-short') return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  return d.toISOString().split('T')[0];
};

export const truncate = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const slugify = (text) => text.toString().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');

export const isValidEmail = (email) => /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);

export const isValidPhone = (phone) => /^(?:(?:\+226)|0)[5-7][0-9]{7}$/.test(phone);

export const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

export const groupBy = (array, key) => array.reduce((result, item) => {
  const groupKey = item[key];
  if (!result[groupKey]) result[groupKey] = [];
  result[groupKey].push(item);
  return result;
}, {});

export const copyToClipboard = async (text) => {
  try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
};

export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (data, headers, filename = 'export.csv') => {
  const csvRows = [headers.join(',')];
  for (const row of data) {
    const values = headers.map(header => `"${(row[header] || '').toString().replace(/"/g, '""')}"`);
    csvRows.push(values.join(','));
  }
  downloadFile(new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' }), filename);
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');

export default { formatPrice, formatDate, truncate, slugify, isValidEmail, isValidPhone, calculateAge, groupBy, copyToClipboard, downloadFile, exportToCSV, cn };