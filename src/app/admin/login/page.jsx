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
import styles from './page.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur modifie les champs
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
      // Simulation d'appel API - À remplacer par votre vrai endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulation de vérification (à remplacer par votre logique réelle)
      if (formData.email === 'admin@asr-voyages.bf' && formData.password === 'admin123') {
        // Stocker le token
        localStorage.setItem('admin_token', 'fake-jwt-token');
        // Rediriger vers le dashboard
        router.push('/admin');
      } else {
        setError('Identifiants incorrects');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        {/* Carte de connexion */}
        <div className={styles.loginCard}>
          {/* Logo et titre */}
          <div className={styles.logoSection}>
            <Image
              src="/images/logo-white.png"
              alt="ASR Voyages"
              width={70}
              height={70}
              className={styles.logo}
            />
            <h1 className={styles.title}>Administration</h1>
            <p className={styles.subtitle}>Agence Sainte Rita Voyages</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Email */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <EmailIcon />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="admin@asr-voyages.bf"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Mot de passe
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* Bouton de connexion */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              Se connecter
            </Button>
          </form>

          {/* Lien retour au site */}
          <div className={styles.backLink}>
            <Link href="/">
              ← Retour au site
            </Link>
          </div>
        </div>

        {/* Crédit */}
        <p className={styles.credit}>
          Espace réservé aux administrateurs
        </p>
      </div>
    </div>
  );
}