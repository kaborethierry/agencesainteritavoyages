// src/components/contact/ContactForm.jsx
'use client';

import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Button from '@/components/ui/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import { contactAPI } from '@/lib/api';
import styles from './ContactForm.module.css';

const sujets = ["Demande d'information générale", "Informations sur un pèlerinage", "Demande de devis groupe", "Question sur une inscription", "Autre"];

export default function ContactForm() {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', sujet: sujets[0], message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

  const validate = () => {
    if (!formData.nom.trim()) return "Le nom est requis";
    if (!formData.email.trim()) return "L'email est requis";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Email invalide";
    if (!formData.message.trim()) return "Le message est requis";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    setError('');
    try {
      await contactAPI.send(formData);
      setSent(true);
      setFormData({ nom: '', email: '', telephone: '', sujet: sujets[0], message: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) { setError("Une erreur est survenue. Veuillez réessayer."); } finally { setLoading(false); }
  };

  return (
    <div className={styles.contactWrapper}>
      <div className={styles.formSide}>
        <SectionTitle surtitre="CONTACT" titre="Écrivez-nous" description="Remplissez ce formulaire, nous vous répondrons rapidement." />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}><label htmlFor="nom" className={styles.label}>Nom complet <span className={styles.required}>*</span></label><input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} className={styles.input} placeholder="Votre nom" disabled={loading} /></div>
          <div className={styles.formGroup}><label htmlFor="email" className={styles.label}>Email <span className={styles.required}>*</span></label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="votre@email.com" disabled={loading} /></div>
          <div className={styles.formGroup}><label htmlFor="telephone" className={styles.label}>Téléphone</label><input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} className={styles.input} placeholder="+226 XX XX XX XX" disabled={loading} /></div>
          <div className={styles.formGroup}><label htmlFor="sujet" className={styles.label}>Sujet</label><select id="sujet" name="sujet" value={formData.sujet} onChange={handleChange} className={styles.select} disabled={loading}>{sujets.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
          <div className={styles.formGroup}><label htmlFor="message" className={styles.label}>Message <span className={styles.required}>*</span></label><textarea id="message" name="message" value={formData.message} onChange={handleChange} className={styles.textarea} rows="6" placeholder="Votre message..." disabled={loading} /></div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          {sent && <div className={styles.successMessage}>✓ Message envoyé ! Nous vous répondrons rapidement.</div>}
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} disabled={loading}>Envoyer le message</Button>
        </form>
      </div>
      <div className={styles.infoSide}>
        <div className={styles.infoCard}>
          <h3 className={styles.infoCardTitle}>Nos coordonnées</h3>
          <div className={styles.infoItem}><div className={styles.infoIconBox}><LocationOnIcon className={styles.infoIcon} /></div><div><div className={styles.infoLabel}>Adresse</div><div className={styles.infoValue}>Ouagadougou, Arrondissement 6<br />Secteur 25, Kouritenga</div></div></div>
          <div className={styles.infoItem}><div className={styles.infoIconBox}><PhoneIcon className={styles.infoIcon} /></div><div><div className={styles.infoLabel}>Téléphone</div><div className={styles.infoValue}><a href="tel:+22625479222">+226 25 47 92 22</a> / <a href="tel:+22666888383">66 88 83 83</a></div></div></div>
          <div className={styles.infoItem}><div className={styles.infoIconBox}><WhatsAppIcon className={styles.infoIcon} /></div><div><div className={styles.infoLabel}>WhatsApp</div><div className={styles.infoValue}><a href="https://wa.me/22660643333">60 64 33 33</a></div></div></div>
          <div className={styles.infoItem}><div className={styles.infoIconBox}><EmailIcon className={styles.infoIcon} /></div><div><div className={styles.infoLabel}>Email</div><div className={styles.infoValue}><a href="mailto:asritavoyages@gmail.com">asritavoyages@gmail.com</a></div></div></div>
          <div className={styles.infoItem}><div className={styles.infoIconBox}><AccessTimeIcon className={styles.infoIcon} /></div><div><div className={styles.infoLabel}>Horaires</div><div className={styles.infoValue}>Lundi au Vendredi<br />08h30 à 18h00</div></div></div>
          <div className={styles.socialSection}><h4 className={styles.socialTitle}>Suivez-nous</h4><div className={styles.socialLinks}><a href="https://www.facebook.com/share/18bJUqC1XY/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><FacebookIcon className={styles.socialIcon} /><span>Facebook</span></a></div></div>
          <div className={styles.mapPlaceholder}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39657.35155534966!2d-1.546235!3d12.364637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIxJzUyLjciTiAxwrAzMic0MC4wIlc!5e0!3m2!1sfr!2sbf!4v1234567890" width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy" title="Carte de Ouagadougou"></iframe></div>
        </div>
      </div>
    </div>
  );
}