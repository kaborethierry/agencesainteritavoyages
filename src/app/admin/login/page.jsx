// src/app/admin/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@/components/ui/Button';
import { authAPI } from '@/lib/api';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(formData.email, formData.password);
      localStorage.setItem('admin_token', response.token);
      localStorage.setItem('admin_user', JSON.stringify(response.user));
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.logoSection}>
            <Image src="/images/logo-white.png" alt="ASR Voyages" width={70} height={70} className={styles.logo} />
            <h1 className={styles.title}>Administration</h1>
            <p className={styles.subtitle}>Agence Sainte Rita Voyages</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><EmailIcon /></span>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="admin@asr-voyages.bf" disabled={loading} />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Mot de passe</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}><LockIcon /></span>
                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} className={styles.input} placeholder="••••••••" disabled={loading} />
                <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} disabled={loading}>Se connecter</Button>
          </form>
          <div className={styles.backLink}><Link href="/">← Retour au site</Link></div>
        </div>
        <p className={styles.credit}>Espace réservé aux administrateurs</p>
      </div>
    </div>
  );
}