// src/components/admin/AdminSidebar.jsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar({ unreadCount = 0 }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: '/admin', icon: <DashboardIcon />, label: 'Tableau de bord' },
    { href: '/admin/pelerinages', icon: <FlightIcon />, label: 'Pèlerinages' },
    { href: '/admin/inscriptions', icon: <ListAltIcon />, label: 'Inscriptions' },
    { 
      href: '/admin/messages', 
      icon: <MailIcon />, 
      label: 'Messages', 
      badge: unreadCount 
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Image 
          src="/images/logo-white.png" 
          alt="ASR Voyages" 
          width={40} 
          height={40} 
        />
        <div>
          <span className={styles.logoText}>ASR Voyages</span>
          <span className={styles.logoSub}>Administration</span>
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${
              pathname === item.href ? styles.navItemActive : ''
            }`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge > 0 && (
              <span className={styles.navBadge}>{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <LogoutIcon />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}