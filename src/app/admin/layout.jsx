'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  
  // Utiliser useRef pour éviter les appels asynchrones problématiques
  const initialCheckDone = useRef(false);

  // Vérifier l'authentification - une seule fois
  useEffect(() => {
    if (initialCheckDone.current) return;
    initialCheckDone.current = true;
    
    const token = localStorage.getItem('admin_token');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  // Détecter si c'est un écran mobile - sans setState dans l'effet principal
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 992;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Redirection si non authentifié - UNIQUEMENT après chargement
  useEffect(() => {
    if (loading) return;
    if (isLoginPage) return;
    if (!isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  // Fermer la sidebar quand la route change (mobile uniquement)
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      
      <div className={styles.adminMain}>
        <AdminHeader onMenuClick={toggleSidebar} isMobile={isMobile} />
        <main className={styles.adminContent}>
          {children}
        </main>
      </div>
    </div>
  );
}