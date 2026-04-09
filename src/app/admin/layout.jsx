'use client';

import { useState, useEffect, useCallback, useRef, startTransition } from 'react';
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
  
  const initialCheckDone = useRef(false);
  const previousPathname = useRef(pathname);

  // 1️⃣ Vérification d'authentification - avec startTransition pour éviter l'erreur
  useEffect(() => {
    if (initialCheckDone.current) return;
    initialCheckDone.current = true;
    
    const token = localStorage.getItem('admin_token');
    startTransition(() => {
      setIsAuthenticated(!!token);
      setLoading(false);
    });
  }, []);

  // 2️⃣ Détection mobile - avec startTransition
  useEffect(() => {
    let isMounted = true;
    
    const checkMobile = () => {
      if (isMounted) {
        const mobile = window.innerWidth <= 992;
        startTransition(() => {
          setIsMobile(mobile);
        });
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      isMounted = false;
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 3️⃣ Redirection si non authentifié
  useEffect(() => {
    if (loading) return;
    if (isLoginPage) return;
    if (!isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [loading, isAuthenticated, isLoginPage, router]);

  // 4️⃣ Fermer la sidebar quand la route change - avec startTransition
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      if (isMobile && sidebarOpen) {
        startTransition(() => {
          setSidebarOpen(false);
        });
      }
    }
  }, [pathname, isMobile, sidebarOpen]);

  // 5️⃣ toggleSidebar - avec fonction de mise à jour fonctionnelle (pas d'erreur)
  const toggleSidebar = useCallback(() => {
    startTransition(() => {
      setSidebarOpen(prev => !prev);
    });
  }, []);

  // 6️⃣ closeSidebar - avec startTransition
  const closeSidebar = useCallback(() => {
    startTransition(() => {
      setSidebarOpen(false);
    });
  }, []);

  // Éviter les rendus pendant le chargement
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

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
        <div className={styles.adminContent}>
          {children}
        </div>
      </div>
    </div>
  );
}