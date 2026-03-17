// src/app/admin/layout.jsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from './layout.module.css';

// Hook d'authentification simulé
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier le token dans localStorage
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  return { isAuthenticated, loading };
};

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Redirection si non authentifié et pas sur la page de login
  useEffect(() => {
    if (!loading && !isAuthenticated && !isLoginPage) {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  // Afficher un loader pendant la vérification
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  // Page de login : afficher sans layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Dashboard : afficher avec sidebar et header
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={styles.adminMain}>
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className={styles.adminContent}>
          {children}
        </main>
      </div>
    </div>
  );
}