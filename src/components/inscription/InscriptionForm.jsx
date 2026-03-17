// src/components/inscription/InscriptionForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import styles from './InscriptionForm.module.css';

// Données des pèlerinages pour le select
const pelerinagesList = [
  { id: 'terre-sainte-jerusalem-paques-2026', titre: 'Terre Sainte – Jérusalem (Spécial Pâques) - 27 mars 2026', tarif: '2 000 000 FCFA' },
  { id: 'terre-sainte-jerusalem-juin-2026', titre: 'Terre Sainte – Jérusalem (1er Groupe) - 17 juin 2026', tarif: '2 000 000 FCFA' },
  { id: 'terre-sainte-jerusalem-juillet-2026', titre: 'Terre Sainte – Jérusalem (2e Groupe) - 17 juillet 2026', tarif: '2 000 000 FCFA' },
  { id: 'terre-sainte-jerusalem-noel-2026', titre: 'Terre Sainte – Jérusalem (Spécial Noël) - 18 décembre 2026', tarif: '2 000 000 FCFA' },
  { id: 'pologne-faustine-jean-paul-ii-2026', titre: 'Pologne – Sur les pas de Sainte Faustine et Saint Jean-Paul II - 08 avril 2026', tarif: '2 500 000 FCFA' },
  { id: 'grand-circuit-marial-europe-2026', titre: 'Grand Circuit Marial en Europe - 04 mai 2026', tarif: '3 000 000 FCFA' },
  { id: 'banneux-lourdes-rome-2026', titre: 'Banneux – Lourdes – Rome - 09 août 2026', tarif: '2 500 000 FCFA' },
  { id: 'canada-montreal-quebec-2026', titre: 'Canada – Montréal, Trois-Rivières et Québec - 30 août 2026', tarif: '3 700 000 FCFA' },
  { id: 'assise-saint-francois-2026', titre: 'Assise – Sur les pas de Saint François - 29 septembre 2026', tarif: '2 500 000 FCFA' },
  { id: 'afrique-cote-ivoire-2026-route', titre: 'Afrique – Côte d’Ivoire (par route) - 09 août 2026', tarif: '300 000 FCFA' },
  { id: 'afrique-cote-ivoire-2026-avion', titre: 'Afrique – Côte d’Ivoire (par avion) - 09 août 2026', tarif: '700 000 FCFA' },
];

export default function InscriptionForm() {
  const searchParams = useSearchParams();
  const pelerinageIdFromUrl = searchParams.get('pelerinage');

  const [formData, setFormData] = useState({
    pelerinage_id: pelerinageIdFromUrl || '',
    civilite: 'M.',
    nom: '',
    prenom: '',
    date_naissance: '',
    nationalite: 'Burkinabè',
    numero_passeport: '',
    email: '',
    telephone: '',
    adresse: '',
    urgence_nom: '',
    urgence_tel: '',
    regime_alimentaire: 'standard',
    remarques: '',
    cgv_accepted: false,
    newsletter: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};

    if (!formData.pelerinage_id) newErrors.pelerinage_id = "Veuillez sélectionner un pèlerinage";
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.date_naissance) newErrors.date_naissance = "La date de naissance est requise";
    if (!formData.nationalite) newErrors.nationalite = "La nationalité est requise";
    if (!formData.numero_passeport.trim()) newErrors.numero_passeport = "Le numéro de passeport est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est requise";
    if (!formData.urgence_nom.trim()) newErrors.urgence_nom = "Le nom du contact urgence est requis";
    if (!formData.urgence_tel.trim()) newErrors.urgence_tel = "Le téléphone d'urgence est requis";
    if (!formData.cgv_accepted) newErrors.cgv_accepted = "Vous devez accepter les conditions générales";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion des changements
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll vers le premier champ en erreur
      const firstError = document.querySelector('[class*="inputError"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    try {
      // Simulation d'envoi - À remplacer par votre API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Succès
      setSuccess(true);
      
      // Réinitialiser le formulaire après 5 secondes
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          pelerinage_id: '',
          civilite: 'M.',
          nom: '',
          prenom: '',
          date_naissance: '',
          nationalite: 'Burkinabè',
          numero_passeport: '',
          email: '',
          telephone: '',
          adresse: '',
          urgence_nom: '',
          urgence_tel: '',
          regime_alimentaire: 'standard',
          remarques: '',
          cgv_accepted: false,
          newsletter: false
        });
      }, 5000);
      
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      // Gérer l'erreur avec un toast
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.formPage}>
        <div className={styles.formContainer}>
          <div className={styles.formCard}>
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>
                <CheckCircleIcon fontSize="inherit" />
              </div>
              <h2 className={styles.successTitle}>Demande envoyée avec succès !</h2>
              <p className={styles.successText}>
                Merci pour votre inscription. Nous vous contacterons dans les 48 heures pour confirmer votre réservation.
              </p>
              <p className={styles.successInstruction}>
                Un email de confirmation vous a été envoyé à l'adresse : <strong>{formData.email}</strong>
              </p>
              <div className={styles.successActions}>
                <Link href="/pelerinages">
                  <Button variant="outline">Voir nos pèlerinages</Button>
                </Link>
                <Link href="/">
                  <Button variant="primary">Retour à l'accueil</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formPage}>
      <div className={styles.formContainer}>
        <div className={styles.formCard}>
          <form onSubmit={handleSubmit} noValidate>
            {/* Section 1 : Choix du pèlerinage */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>1</span>
                <h2 className={styles.sectionTitle}>Choix du pèlerinage</h2>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="pelerinage_id">
                  Pèlerinage <span className={styles.required}>*</span>
                </label>
                <select
                  id="pelerinage_id"
                  value={formData.pelerinage_id}
                  onChange={(e) => handleChange('pelerinage_id', e.target.value)}
                  className={errors.pelerinage_id ? styles.inputError : ''}
                  disabled={loading}
                >
                  <option value="">Sélectionnez un pèlerinage</option>
                  {pelerinagesList.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.titre} - {p.tarif}
                    </option>
                  ))}
                </select>
                {errors.pelerinage_id && (
                  <span className={styles.errorMsg}>
                    <ErrorIcon fontSize="small" /> {errors.pelerinage_id}
                  </span>
                )}
              </div>
            </div>

            {/* Section 2 : Informations personnelles */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>2</span>
                <h2 className={styles.sectionTitle}>Informations personnelles</h2>
              </div>

              <div className={styles.formGrid}>
                {/* Civilité */}
                <div className={styles.formGroup}>
                  <label>Civilité <span className={styles.required}>*</span></label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="civilite"
                        value="M."
                        checked={formData.civilite === 'M.'}
                        onChange={(e) => handleChange('civilite', e.target.value)}
                        disabled={loading}
                      />
                      M.
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="civilite"
                        value="Mme"
                        checked={formData.civilite === 'Mme'}
                        onChange={(e) => handleChange('civilite', e.target.value)}
                        disabled={loading}
                      />
                      Mme
                    </label>
                  </div>
                </div>

                {/* Nom */}
                <div className={styles.formGroup}>
                  <label htmlFor="nom">
                    Nom <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    value={formData.nom}
                    onChange={(e) => handleChange('nom', e.target.value)}
                    className={errors.nom ? styles.inputError : ''}
                    disabled={loading}
                  />
                  {errors.nom && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.nom}
                    </span>
                  )}
                </div>

                {/* Prénom */}
                <div className={styles.formGroup}>
                  <label htmlFor="prenom">
                    Prénom <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => handleChange('prenom', e.target.value)}
                    className={errors.prenom ? styles.inputError : ''}
                    disabled={loading}
                  />
                  {errors.prenom && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.prenom}
                    </span>
                  )}
                </div>

                {/* Date de naissance */}
                <div className={styles.formGroup}>
                  <label htmlFor="date_naissance">
                    Date de naissance <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="date_naissance"
                    value={formData.date_naissance}
                    onChange={(e) => handleChange('date_naissance', e.target.value)}
                    className={errors.date_naissance ? styles.inputError : ''}
                    disabled={loading}
                  />
                  {errors.date_naissance && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.date_naissance}
                    </span>
                  )}
                </div>

                {/* Nationalité */}
                <div className={styles.formGroup}>
                  <label htmlFor="nationalite">
                    Nationalité <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="nationalite"
                    value={formData.nationalite}
                    onChange={(e) => handleChange('nationalite', e.target.value)}
                    className={errors.nationalite ? styles.inputError : ''}
                    disabled={loading}
                  />
                  {errors.nationalite && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.nationalite}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3 : Documents de voyage */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>3</span>
                <h2 className={styles.sectionTitle}>Documents de voyage</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="numero_passeport">
                    Numéro de passeport <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="numero_passeport"
                    value={formData.numero_passeport}
                    onChange={(e) => handleChange('numero_passeport', e.target.value)}
                    className={errors.numero_passeport ? styles.inputError : ''}
                    placeholder="Ex: PD0123456"
                    disabled={loading}
                  />
                  <small className={styles.fieldNote}>Passeport valide 6 mois après la date de retour</small>
                  {errors.numero_passeport && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.numero_passeport}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 4 : Coordonnées */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>4</span>
                <h2 className={styles.sectionTitle}>Coordonnées</h2>
              </div>

              <div className={styles.formGrid}>
                {/* Email */}
                <div className={styles.formGroup}>
                  <label htmlFor="email">
                    Email <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={errors.email ? styles.inputError : ''}
                    placeholder="votre@email.com"
                    disabled={loading}
                  />
                  {errors.email && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Téléphone */}
                <div className={styles.formGroup}>
                  <label htmlFor="telephone">
                    Téléphone <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="telephone"
                    value={formData.telephone}
                    onChange={(e) => handleChange('telephone', e.target.value)}
                    className={errors.telephone ? styles.inputError : ''}
                    placeholder="+226 XX XX XX XX"
                    disabled={loading}
                  />
                  {errors.telephone && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.telephone}
                    </span>
                  )}
                </div>

                {/* Adresse */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="adresse">
                    Adresse <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => handleChange('adresse', e.target.value)}
                    className={errors.adresse ? styles.inputError : ''}
                    rows="3"
                    placeholder="Votre adresse complète"
                    disabled={loading}
                  />
                  {errors.adresse && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.adresse}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 5 : Personne à contacter en urgence */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>5</span>
                <h2 className={styles.sectionTitle}>Personne à contacter en urgence</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="urgence_nom">
                    Nom complet <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="urgence_nom"
                    value={formData.urgence_nom}
                    onChange={(e) => handleChange('urgence_nom', e.target.value)}
                    className={errors.urgence_nom ? styles.inputError : ''}
                    disabled={loading}
                  />
                  {errors.urgence_nom && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.urgence_nom}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="urgence_tel">
                    Téléphone <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="urgence_tel"
                    value={formData.urgence_tel}
                    onChange={(e) => handleChange('urgence_tel', e.target.value)}
                    className={errors.urgence_tel ? styles.inputError : ''}
                    placeholder="+226 XX XX XX XX"
                    disabled={loading}
                  />
                  {errors.urgence_tel && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.urgence_tel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Section 6 : Informations complémentaires */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>6</span>
                <h2 className={styles.sectionTitle}>Informations complémentaires</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="regime_alimentaire">Régime alimentaire</label>
                  <select
                    id="regime_alimentaire"
                    value={formData.regime_alimentaire}
                    onChange={(e) => handleChange('regime_alimentaire', e.target.value)}
                    disabled={loading}
                  >
                    <option value="standard">Standard</option>
                    <option value="vegetarien">Végétarien</option>
                    <option value="halal">Halal</option>
                    <option value="sans_gluten">Sans gluten</option>
                  </select>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="remarques">Remarques particulières</label>
                  <textarea
                    id="remarques"
                    value={formData.remarques}
                    onChange={(e) => handleChange('remarques', e.target.value)}
                    rows="4"
                    placeholder="Problèmes de santé, mobilité réduite, demandes spéciales..."
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Section 7 : Acceptation des conditions */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>7</span>
                <h2 className={styles.sectionTitle}>Confirmation</h2>
              </div>

              {/* CGV */}
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="cgv_accepted"
                  checked={formData.cgv_accepted}
                  onChange={(e) => handleChange('cgv_accepted', e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="cgv_accepted" className={styles.checkboxLabel}>
                  J'accepte les <Link href="/cgv" target="_blank" className={styles.link}>conditions générales de vente</Link> et reconnais avoir pris connaissance des informations sur le pèlerinage. <span className={styles.required}>*</span>
                </label>
              </div>
              {errors.cgv_accepted && (
                <span className={styles.errorMsg}>
                  <ErrorIcon fontSize="small" /> {errors.cgv_accepted}
                </span>
              )}

              {/* Newsletter */}
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => handleChange('newsletter', e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="newsletter" className={styles.checkboxLabel}>
                  Je souhaite recevoir les actualités et offres de pèlerinages par email
                </label>
              </div>
            </div>

            {/* Bouton de soumission */}
            <div className={styles.submitArea}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                disabled={loading}
              >
                Envoyer ma demande d'inscription
              </Button>
              <p className={styles.formFootnote}>
                Les champs marqués d'un <span className={styles.required}>*</span> sont obligatoires
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}