// src/components/inscription/InscriptionForm.jsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from './InscriptionForm.module.css';

// Données des pèlerinages pour le select
const pelerinagesList = [
  { id: 'terre-sainte-jerusalem-paques-2026', titre: 'Terre Sainte – Jérusalem (Spécial Pâques) - 27 mars 2026', tarif: '2 000 000 FCFA', destination: 'jerusalem' },
  { id: 'terre-sainte-jerusalem-juin-2026', titre: 'Terre Sainte – Jérusalem (1er Groupe) - 17 juin 2026', tarif: '2 000 000 FCFA', destination: 'jerusalem' },
  { id: 'terre-sainte-jerusalem-juillet-2026', titre: 'Terre Sainte – Jérusalem (2e Groupe) - 17 juillet 2026', tarif: '2 000 000 FCFA', destination: 'jerusalem' },
  { id: 'terre-sainte-jerusalem-noel-2026', titre: 'Terre Sainte – Jérusalem (Spécial Noël) - 18 décembre 2026', tarif: '2 000 000 FCFA', destination: 'jerusalem' },
  { id: 'pologne-faustine-jean-paul-ii-2026', titre: 'Pologne – Sur les pas de Sainte Faustine et Saint Jean-Paul II - 08 avril 2026', tarif: '2 500 000 FCFA', destination: 'europe' },
  { id: 'grand-circuit-marial-europe-2026', titre: 'Grand Circuit Marial en Europe - 04 mai 2026', tarif: '3 000 000 FCFA', destination: 'europe' },
  { id: 'banneux-lourdes-rome-2026', titre: 'Banneux – Lourdes – Rome - 09 août 2026', tarif: '2 500 000 FCFA', destination: 'europe' },
  { id: 'canada-montreal-quebec-2026', titre: 'Canada – Montréal, Trois-Rivières et Québec - 30 août 2026', tarif: '3 700 000 FCFA', destination: 'canada' },
  { id: 'assise-saint-francois-2026', titre: 'Assise – Sur les pas de Saint François - 29 septembre 2026', tarif: '2 500 000 FCFA', destination: 'europe' },
  { id: 'afrique-cote-ivoire-2026-route', titre: 'Afrique – Côte d’Ivoire (par route) - 09 août 2026', tarif: '300 000 FCFA', destination: 'afrique' },
  { id: 'afrique-cote-ivoire-2026-avion', titre: 'Afrique – Côte d’Ivoire (par avion) - 09 août 2026', tarif: '700 000 FCFA', destination: 'afrique' },
];

export default function InscriptionForm() {
  const searchParams = useSearchParams();
  const pelerinageIdFromUrl = searchParams.get('pelerinage');

  const [formData, setFormData] = useState({
    pelerinage_id: pelerinageIdFromUrl || '',
    statut_professionnel: 'salarie',
    civilite: 'M.',
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    nationalite: 'Burkinabè',
    numero_passeport: '',
    date_expiration_passeport: '',
    email: '',
    telephone: '',
    adresse: '',
    profession: '',
    employeur: '',
    salaire: '',
    numero_cnss: '',
    date_embauche: '',
    nom_pere: '',
    prenom_pere: '',
    nom_mere: '',
    prenom_mere: '',
    grand_pere_paternel: '',
    extrait_naissance: false,
    carnet_bapteme: false,
    certificat_travail: false,
    autorisation_sortie: false,
    bulletin_salaire_3mois: false,
    relevé_bancaire_3mois: false,
    acte_mariage: false,
    inscription_rccm: false,
    carte_commercant: false,
    certificat_non_imposition: false,
    attestation_prise_en_charge: false,
    livret_famille: false,
    autorisation_hierarchie: false,
    ordre_mission: false,
    engagement_signe: false,
    photos_identite: false,
    regime_alimentaire: 'standard',
    remarques: '',
    cgv_accepted: false,
    newsletter: false
  });

  const [selectedDestination, setSelectedDestination] = useState('europe');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [documentsExpanded, setDocumentsExpanded] = useState(true);

  // Mettre à jour la destination quand le pèlerinage change
  useEffect(() => {
    const selectedPelerinage = pelerinagesList.find(p => p.id === formData.pelerinage_id);
    if (selectedPelerinage) {
      setSelectedDestination(selectedPelerinage.destination);
    }
  }, [formData.pelerinage_id]);

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};

    if (!formData.pelerinage_id) newErrors.pelerinage_id = "Veuillez sélectionner un pèlerinage";
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.date_naissance) newErrors.date_naissance = "La date de naissance est requise";
    if (!formData.nationalite) newErrors.nationalite = "La nationalité est requise";
    if (!formData.numero_passeport.trim()) newErrors.numero_passeport = "Le numéro de passeport est requis";
    if (!formData.date_expiration_passeport) newErrors.date_expiration_passeport = "La date d'expiration du passeport est requise";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email invalide";
    }
    if (!formData.telephone.trim()) newErrors.telephone = "Le téléphone est requis";
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
      const firstError = document.querySelector('[class*="inputError"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 5000);
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
    } finally {
      setLoading(false);
    }
  };

  // Rendu des documents selon la destination et le statut
  const renderDocuments = () => {
    const destination = selectedDestination;
    const statut = formData.statut_professionnel;

    return (
      <div className={styles.documentsContainer}>
        <div className={styles.documentsHeader} onClick={() => setDocumentsExpanded(!documentsExpanded)}>
          <div className={styles.documentsTitle}>
            <InfoIcon className={styles.documentsIcon} />
            <h3>Documents requis pour votre dossier</h3>
          </div>
          {documentsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>

        {documentsExpanded && (
          <div className={styles.documentsContent}>
            {/* En-tête Europe */}
            {destination === 'europe' && (
              <div className={styles.destinationSection}>
                <h4 className={styles.destinationTitle}>Pièces à fournir pour la demande de visa (Circuits Europe)</h4>
                
                {statut === 'salarie' && (
                  <div className={styles.statutSection}>
                    <h5>Salariés (employés ou fonctionnaire)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Passeport original + une copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('certificat_travail', e.target.checked)} /> Certificat de travail (précisant les fonctions exercées, la date d’embauche et le salaire mensuel)</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('autorisation_sortie', e.target.checked)} /> Autorisation de sortie (délivrée par le Responsable du service) + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('bulletin_salaire_3mois', e.target.checked)} /> Les 3 derniers bulletins de salaires + copies simples</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_3mois', e.target.checked)} /> Les relevés bancaires des 3 derniers mois</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('numero_cnss', e.target.checked)} /> Carte CNSS + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage + copie simple (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'retraite' && (
                  <div className={styles.statutSection}>
                    <h5>Retraité(e)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Passeport original + une copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('arrete_retraite', e.target.checked)} /> Arrêté de mise en retraite + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('bulletin_pension', e.target.checked)} /> Dernier bulletin trimestriel de pension de retraite + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_3mois', e.target.checked)} /> Les relevés bancaires des 3 derniers mois</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage + copie simple (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'commercant' && (
                  <div className={styles.statutSection}>
                    <h5>Commerçant(s)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Passeport original + une copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('inscription_rccm', e.target.checked)} /> Inscription au RCCM + une copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('carte_commercant', e.target.checked)} /> Carte professionnelle de commerçant ou attestation d’activité + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('certificat_non_imposition', e.target.checked)} /> Certificat de non-imposition ou attestation de situation fiscale + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_3mois', e.target.checked)} /> Les relevés bancaires des 3 derniers mois</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage + copie simple (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'menagere' && (
                  <div className={styles.statutSection}>
                    <h5>Ménagères</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Passeport original + une copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('attestation_prise_en_charge', e.target.checked)} /> Attestation de prise en charge (d’un tiers) signée chez un notaire avec justificatif du lien familial</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('bulletin_salaire_3mois', e.target.checked)} /> Bulletins de salaire des 3 derniers mois (du tiers)</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_3mois', e.target.checked)} /> Relevé bancaire des 3 derniers mois (du tiers)</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('livret_famille', e.target.checked)} /> Livret de famille + copie simple</li>
                    </ul>
                  </div>
                )}

                {statut === 'religieux' && (
                  <div className={styles.statutSection}>
                    <h5>Religieux(se)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Passeport original + une copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('attestation_prise_en_charge', e.target.checked)} /> Attestation de prise en charge signée chez un notaire avec justificatif du lien familial</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('autorisation_hierarchie', e.target.checked)} /> Autorisation de la hiérarchie + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('ordre_mission', e.target.checked)} /> Ordre de mission délivré par la hiérarchie + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_3mois', e.target.checked)} /> Les relevés bancaires des 3 derniers mois</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Jérusalem */}
            {destination === 'jerusalem' && (
              <div className={styles.destinationSection}>
                <h4 className={styles.destinationTitle}>Pièces à fournir pour l'obtention du visa en Terre Sainte</h4>
                
                <div className={styles.commonDocs}>
                  <h5>Documents communs à tous</h5>
                  <ul className={styles.documentList}>
                    <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Copie simple du passeport</li>
                    <li><input type="checkbox" onChange={(e) => handleChange('extrait_naissance', e.target.checked)} /> Copie de l'extrait d'acte de naissance</li>
                    <li><input type="checkbox" onChange={(e) => handleChange('carnet_bapteme', e.target.checked)} /> Copie du carnet de baptême à jour</li>
                    <li><input type="checkbox" onChange={(e) => handleChange('grand_pere_paternel', e.target.value === formData.grand_pere_paternel)} /> Nom et prénom(s) du grand-père paternel</li>
                    <li><input type="checkbox" onChange={(e) => handleChange('engagement_signe', e.target.checked)} /> Engagement signé et déposé à l'agence Sainte Rita avant le départ</li>
                    <li><input type="checkbox" onChange={(e) => handleChange('photos_identite', e.target.checked)} /> 2 photos d'identité</li>
                  </ul>
                </div>

                {statut === 'salarie' && (
                  <div className={styles.statutSection}>
                    <h5>Salariés (employés ou fonctionnaire)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" onChange={(e) => handleChange('certificat_travail', e.target.checked)} /> Certificat de travail</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('autorisation_sortie', e.target.checked)} /> Autorisation de sortie</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('demande_conge', e.target.checked)} /> Demande de congé</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('numero_cnss', e.target.checked)} /> Carte CNSS + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'retraite' && (
                  <div className={styles.statutSection}>
                    <h5>Retraité(e)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" onChange={(e) => handleChange('arrete_retraite', e.target.checked)} /> Arrêté de mise en retraite + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'commercant' && (
                  <div className={styles.statutSection}>
                    <h5>Commerçant(s)</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" onChange={(e) => handleChange('inscription_rccm', e.target.checked)} /> Inscription au RCCM</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('carte_commercant', e.target.checked)} /> Carte professionnelle de commerçant ou attestation d'activité</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('certificat_non_imposition', e.target.checked)} /> Certificat de non-imposition ou attestation de situation fiscale</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'menagere' && (
                  <div className={styles.statutSection}>
                    <h5>Ménagères</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage + copie simple</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('attestation_prise_en_charge', e.target.checked)} /> Attestation de prise en charge signée chez un notaire</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('livret_famille', e.target.checked)} /> Livret de famille + copie simple</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Canada */}
            {destination === 'canada' && (
              <div className={styles.destinationSection}>
                <h4 className={styles.destinationTitle}>Documents requis pour une demande de visa touristique au Canada</h4>
                
                <ul className={styles.documentList}>
                  <li><input type="checkbox" onChange={(e) => handleChange('extrait_naissance_parents', e.target.checked)} /> Acte de naissance incluant les noms des deux parents</li>
                  <li><input type="checkbox" onChange={(e) => handleChange('photo_numerique', e.target.checked)} /> Photo d'identité numérique (35mm x 45mm, fond blanc) - à envoyer par email ou WhatsApp</li>
                  <li><input type="checkbox" checked={formData.numero_passeport} readOnly /> Passeport valide au moins 3 ans - copie de la page d'information</li>
                  <li><input type="checkbox" onChange={(e) => handleChange('acte_mariage', e.target.checked)} /> Acte de mariage (si applicable)</li>
                  <li><input type="checkbox" onChange={(e) => handleChange('historique_voyage', e.target.checked)} /> Historique de voyage - photocopies des anciens visas et passeports</li>
                </ul>

                <div className={styles.financialNote}>
                  <InfoIcon fontSize="small" />
                  <p><strong>Justificatifs financiers :</strong> Preuve de fonds suffisants (minimum 8 000 000 F CFA sur comptes personnels, 13 000 000 F CFA si pris en charge). Relevés bancaires des 6 derniers mois requis.</p>
                </div>

                {statut === 'salarie' && (
                  <div className={styles.statutSection}>
                    <h5>Pour les salariés</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" onChange={(e) => handleChange('contrat_travail', e.target.checked)} /> Contrat de travail</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('bulletin_salaire_6mois', e.target.checked)} /> Six derniers bulletins de salaire</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_6mois', e.target.checked)} /> Relevés bancaires des six derniers mois</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('lettre_conge', e.target.checked)} /> Lettre de congé</li>
                    </ul>
                  </div>
                )}

                {statut === 'commercant' && (
                  <div className={styles.statutSection}>
                    <h5>Pour les entrepreneurs</h5>
                    <ul className={styles.documentList}>
                      <li><input type="checkbox" onChange={(e) => handleChange('inscription_rccm', e.target.checked)} /> Registre de Commerce (RCCM)</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('ifu', e.target.checked)} /> Identifiant Fiscal Unique (IFU)</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('attestation_fiscale', e.target.checked)} /> Attestation de Situation Fiscale</li>
                      <li><input type="checkbox" onChange={(e) => handleChange('relevé_bancaire_6mois_entreprise', e.target.checked)} /> Relevés bancaires des six derniers mois du compte de l'entreprise</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            <p className={styles.documentsNote}>
              <InfoIcon fontSize="small" /> Ces documents seront à fournir après votre inscription. Notre équipe vous contactera pour la constitution complète de votre dossier.
            </p>
          </div>
        )}
      </div>
    );
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
                Merci pour votre inscription. Notre équipe vous contactera dans les 48 heures pour finaliser votre dossier.
              </p>
              <p className={styles.successInstruction}>
                Un email de confirmation vous a été envoyé à l'adresse : <strong>{formData.email}</strong>
              </p>
              <div className={styles.successActions}>
                <Link href="/pelerinages">
                  <Button variant="outline">Voir nos voyages</Button>
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
            {/* Section 1 : Choix du voyage */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>1</span>
                <h2 className={styles.sectionTitle}>Choix du voyage</h2>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="pelerinage_id">
                  Voyage <span className={styles.required}>*</span>
                </label>
                <select
                  id="pelerinage_id"
                  value={formData.pelerinage_id}
                  onChange={(e) => handleChange('pelerinage_id', e.target.value)}
                  className={errors.pelerinage_id ? styles.inputError : ''}
                  disabled={loading}
                >
                  <option value="">Sélectionnez un voyage</option>
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
                {/* Statut professionnel */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Statut professionnel <span className={styles.required}>*</span></label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="statut_professionnel"
                        value="salarie"
                        checked={formData.statut_professionnel === 'salarie'}
                        onChange={(e) => handleChange('statut_professionnel', e.target.value)}
                        disabled={loading}
                      />
                      Salarié
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="statut_professionnel"
                        value="retraite"
                        checked={formData.statut_professionnel === 'retraite'}
                        onChange={(e) => handleChange('statut_professionnel', e.target.value)}
                        disabled={loading}
                      />
                      Retraité
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="statut_professionnel"
                        value="commercant"
                        checked={formData.statut_professionnel === 'commercant'}
                        onChange={(e) => handleChange('statut_professionnel', e.target.value)}
                        disabled={loading}
                      />
                      Commerçant
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="statut_professionnel"
                        value="menagere"
                        checked={formData.statut_professionnel === 'menagere'}
                        onChange={(e) => handleChange('statut_professionnel', e.target.value)}
                        disabled={loading}
                      />
                      Ménagère
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="statut_professionnel"
                        value="religieux"
                        checked={formData.statut_professionnel === 'religieux'}
                        onChange={(e) => handleChange('statut_professionnel', e.target.value)}
                        disabled={loading}
                      />
                      Religieux(se)
                    </label>
                  </div>
                </div>

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

                {/* Lieu de naissance */}
                <div className={styles.formGroup}>
                  <label htmlFor="lieu_naissance">Lieu de naissance</label>
                  <input
                    type="text"
                    id="lieu_naissance"
                    value={formData.lieu_naissance}
                    onChange={(e) => handleChange('lieu_naissance', e.target.value)}
                    disabled={loading}
                  />
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
                <div className={styles.formGroup}>
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
                  {errors.numero_passeport && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.numero_passeport}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="date_expiration_passeport">
                    Date d'expiration <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="date_expiration_passeport"
                    value={formData.date_expiration_passeport}
                    onChange={(e) => handleChange('date_expiration_passeport', e.target.value)}
                    className={errors.date_expiration_passeport ? styles.inputError : ''}
                    disabled={loading}
                  />
                  {errors.date_expiration_passeport && (
                    <span className={styles.errorMsg}>
                      <ErrorIcon fontSize="small" /> {errors.date_expiration_passeport}
                    </span>
                  )}
                </div>

                {/* Grand-père paternel (pour Jérusalem) */}
                {selectedDestination === 'jerusalem' && (
                  <div className={styles.formGroup}>
                    <label htmlFor="grand_pere_paternel">
                      Nom et prénom(s) du grand-père paternel
                    </label>
                    <input
                      type="text"
                      id="grand_pere_paternel"
                      value={formData.grand_pere_paternel}
                      onChange={(e) => handleChange('grand_pere_paternel', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Section 4 : Coordonnées */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>4</span>
                <h2 className={styles.sectionTitle}>Coordonnées</h2>
              </div>

              <div className={styles.formGrid}>
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

            {/* Section 5 : Documents requis dynamiques */}
            {formData.pelerinage_id && (
              <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>5</span>
                  <h2 className={styles.sectionTitle}>Documents requis</h2>
                </div>

                {renderDocuments()}
              </div>
            )}

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

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="cgv_accepted"
                  checked={formData.cgv_accepted}
                  onChange={(e) => handleChange('cgv_accepted', e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="cgv_accepted" className={styles.checkboxLabel}>
                  Je certifie l'exactitude des informations fournies et j'accepte les <Link href="/cgv" target="_blank" className={styles.link}>conditions générales de vente</Link>. <span className={styles.required}>*</span>
                </label>
              </div>
              {errors.cgv_accepted && (
                <span className={styles.errorMsg}>
                  <ErrorIcon fontSize="small" /> {errors.cgv_accepted}
                </span>
              )}

              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) => handleChange('newsletter', e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="newsletter" className={styles.checkboxLabel}>
                  Je souhaite recevoir les actualités et offres de voyages par email
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