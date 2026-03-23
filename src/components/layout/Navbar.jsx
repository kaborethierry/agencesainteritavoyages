'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Gestion de l'effet de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Empêcher le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActive = (path) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/pelerinages', label: 'Voyages' },
    { href: '/a-propos', label: 'À Propos' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`} aria-label="Navigation principale">
        <Link href="/" className={styles.logo} aria-label="Accueil">
          <Image
            src="/images/logo-white.png"
            alt="Agence Sainte Rita Voyages - Logo"
            width={45}
            height={45}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.logoName}>Agence Sainte Rita Voyages</span>
            <span className={styles.logoTagline}>Voyages de ressourcement spirituel</span>
          </div>
        </Link>

        <ul className={styles.navLinks} role="list">
          {navLinks.map((link) => (
            <li key={link.href} role="listitem">
              <Link
                href={link.href}
                className={isActive(link.href) ? styles.active : ''}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navActions}>
          <Button href="/inscription" variant="primary" size="sm" aria-label="S'inscrire à un pèlerinage">
            S'inscrire
          </Button>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Menu Mobile */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-label="Menu mobile">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Button href="/inscription" variant="primary" size="lg" fullWidth>
          S'inscrire
        </Button>
      </div>
    </>
  );
}