// src/components/layout/Footer.jsx
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

// Icônes SVG
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
);
const MapPinIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> 
);
const PhoneIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> 
);
const MailIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> 
);
const ClockIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Colonne 1 : Brand */}
          <div className={styles.colBrand}>
            <Image src="/images/logo-white.png" alt="Agence Sainte Rita Voyages" width={80} height={80} />
            <h3 className={styles.brandName}>Agence Sainte Rita Voyages</h3>
            <p className={styles.brandSlogan}>Vers les lieux saints</p>
            <p>
              Spécialiste des pèlerinages chrétiens depuis 2004. Marchez sur les pas du Christ, 
              priez dans les sanctuaires mariaux et vivez une expérience spirituelle unique.
            </p>
            <div className={styles.socialIcons}>
              <a 
                href="https://www.facebook.com/share/18bJUqC1XY/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon} 
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a 
                href="https://wa.me/22660643333" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.socialIcon} 
                aria-label="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Navigation */}
          <div>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul>
              <li><Link href="/" className={styles.footerLink}>Accueil</Link></li>
              <li><Link href="/pelerinages" className={styles.footerLink}>Pèlerinages</Link></li>
              <li><Link href="/a-propos" className={styles.footerLink}>À Propos</Link></li>
              <li><Link href="/contact" className={styles.footerLink}>Contact</Link></li>
              <li><Link href="/inscription" className={styles.footerLink}>S'inscrire</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Destinations */}
          <div>
            <h4 className={styles.colTitle}>Nos Destinations</h4>
            <ul>
              <li><Link href="/pelerinages?destination=Jerusalem" className={styles.footerLink}>Jérusalem</Link></li>
              <li><Link href="/pelerinages?destination=Rome" className={styles.footerLink}>Rome</Link></li>
              <li><Link href="/pelerinages?destination=Lourdes" className={styles.footerLink}>Lourdes</Link></li>
              <li><Link href="/pelerinages?destination=Fatima" className={styles.footerLink}>Fatima</Link></li>
              <li><Link href="/pelerinages?destination=Medjugorje" className={styles.footerLink}>Medjugorje</Link></li>
              <li><Link href="/pelerinages?destination=Pologne" className={styles.footerLink}>Pologne</Link></li>
              <li><Link href="/pelerinages?destination=Canada" className={styles.footerLink}>Canada</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Contact */}
          <div>
            <h4 className={styles.colTitle}>Nous Contacter</h4>
            
            {/* Adresse */}
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><MapPinIcon /></span>
              <div className={styles.contactText}>
                <strong>Adresse</strong>
                <span>Ouagadougou, Arrondissement 6<br />Secteur 25, Kouritenga</span>
              </div>
            </div>

            {/* Téléphone */}
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><PhoneIcon /></span>
              <div className={styles.contactText}>
                <strong>Téléphone</strong>
                <a href="tel:+22625479222">+226 25 47 92 22</a>
                <a href="tel:+22666888383">66 88 83 83</a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><WhatsAppIcon /></span>
              <div className={styles.contactText}>
                <strong>WhatsApp</strong>
                <a href="https://wa.me/22660643333">60 64 33 33</a>
              </div>
            </div>

            {/* Email */}
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><MailIcon /></span>
              <div className={styles.contactText}>
                <strong>Email</strong>
                <a href="mailto:asritavoyages@gmail.com">asritavoyages@gmail.com</a>
              </div>
            </div>

            {/* Horaires */}
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}><ClockIcon /></span>
              <div className={styles.contactText}>
                <strong>Horaires</strong>
                <span>Lundi au Vendredi : 08h30 - 18h00</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Agence Sainte Rita Voyages (ASR Voyages). Tous droits réservés.</p>
          <div className={styles.bottomLinks}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Politique de confidentialité</Link>
            <Link href="/cgv">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}