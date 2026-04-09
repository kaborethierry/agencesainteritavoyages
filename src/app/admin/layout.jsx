'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  // Vérifier l'authentification
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  // Détecter si c'est un écran mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
      // Sur desktop, forcer la fermeture de la sidebar mobile
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirection si non authentifié
  useEffect(() => {
    if (loading) return;
    if (isLoginPage) return;
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  // Fermer la sidebar mobile quand la route change
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

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

  // Si non authentifié, ne pas afficher le dashboard
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
        isMobile={isMobile}
      />
      
      <div className={`${styles.adminMain} ${isMobile && sidebarOpen ? styles.adminMainShifted : ''}`}>
        <AdminHeader onMenuClick={toggleSidebar} isMobile={isMobile} />
        
        <main className={styles.adminContent}>
          {children}
        </main>
      </div>
    </div>
  );
}