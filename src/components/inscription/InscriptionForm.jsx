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
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { inscriptionAPI, pilgrimageAPI } from '@/lib/api';
import styles from './InscriptionForm.module.css';

export default function InscriptionForm() {
  const searchParams = useSearchParams();
  const pelerinageIdFromUrl = searchParams.get('pelerinage');

  const [pelerinagesList, setPelerinagesList] = useState([]);
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
    grand_pere_paternel: '',
    regime_alimentaire: 'standard',
    remarques: '',
    urgence_nom: '',
    urgence_tel: '',
    prix_total: null,
    cgv_accepted: false,
    newsletter: false
  });

  const [selectedDestination, setSelectedDestination] = useState('europe');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [documentsExpanded, setDocumentsExpanded] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Charger les pèlerinages depuis l'API
  useEffect(() => {
    const fetchPelerinages = async () => {
      try {
        const data = await pilgrimageAPI.getAll();
        setPelerinagesList(data);
      } catch (err) {
        console.error('Erreur chargement pèlerinages:', err);
      }
    };
    fetchPelerinages();
  }, []);

  // Mettre à jour la destination et le prix quand le pèlerinage change
  useEffect(() => {
    const selectedPelerinage = pelerinagesList.find(p => p.id === formData.pelerinage_id);
    if (selectedPelerinage) {
      setSelectedDestination(selectedPelerinage.destination || 'europe');
      setFormData(prev => ({
        ...prev,
        prix_total: selectedPelerinage.price
      }));
    }
  }, [formData.pelerinage_id, pelerinagesList]);

  // Validation du formulaire
  const validate = () => {
    const newErrors = {};

    if (!formData.pelerinage_id) newErrors.pelerinage_id = "Veuillez sélectionner un voyage";
    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";
    if (!formData.date_naissance) newErrors.date_naissance = "La date de naissance est requise";
    if (!formData.nationalite) newErrors.nationalite = "La nationalité est requise";
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
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Soumission du formulaire vers l'API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      const firstError = document.querySelector('[class*="inputError"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      // Préparer les données pour l'API - CORRECTION : utiliser null au lieu de chaînes vides
      const submitData = {
        pelerinage_id: formData.pelerinage_id,
        statut_professionnel: formData.statut_professionnel,
        civilite: formData.civilite,
        nom: formData.nom,
        prenom: formData.prenom,
        date_naissance: formData.date_naissance,
        lieu_naissance: formData.lieu_naissance || null,
        nationalite: formData.nationalite,
        numero_passeport: formData.numero_passeport || null,
        date_expiration_passeport: formData.date_expiration_passeport || null,
        email: formData.email,
        telephone: formData.telephone,
        adresse: formData.adresse,
        profession: formData.profession || null,
        employeur: formData.employeur || null,
        grand_pere_paternel: formData.grand_pere_paternel || null,
        regime_alimentaire: formData.regime_alimentaire,
        remarques: formData.remarques || null,
        urgence_nom: formData.urgence_nom || null,
        urgence_tel: formData.urgence_tel || null,
        prix_total: formData.prix_total,
        cgv_accepted: formData.cgv_accepted,
        newsletter: formData.newsletter
      };
      
      await inscriptionAPI.create(submitData);
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 5000);
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      setApiError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  // Rendu des documents (identique à avant)
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
            {/* Belgique / Europe */}
            {destination === 'europe' && (
              <div className={styles.destinationSection}>
                <h4 className={styles.destinationTitle}>Pièces à fournir pour la demande de visa (Circuits Europe)</h4>
                
                {statut === 'salarie' && (
                  <div className={styles.statutSection}>
                    <h5>Salariés (employés ou fonctionnaire)</h5>
                    <ul className={styles.documentList}>
                      <li>Passeport original + une copie simple</li>
                      <li>Certificat de travail</li>
                      <li>Autorisation de sortie</li>
                      <li>Les 3 derniers bulletins de salaires</li>
                      <li>Les relevés bancaires des 3 derniers mois</li>
                      <li>Carte CNSS</li>
                      <li>Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'retraite' && (
                  <div className={styles.statutSection}>
                    <h5>Retraité(e)</h5>
                    <ul className={styles.documentList}>
                      <li>Passeport original + une copie simple</li>
                      <li>Arrêté de mise en retraite</li>
                      <li>Dernier bulletin trimestriel de pension</li>
                      <li>Les relevés bancaires des 3 derniers mois</li>
                      <li>Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'commercant' && (
                  <div className={styles.statutSection}>
                    <h5>Commerçant(s)</h5>
                    <ul className={styles.documentList}>
                      <li>Passeport original + une copie simple</li>
                      <li>Inscription au RCCM</li>
                      <li>Les relevés bancaires des 3 derniers mois</li>
                      <li>Carte professionnelle de commerçant</li>
                      <li>Certificat de non-imposition</li>
                      <li>Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'menagere' && (
                  <div className={styles.statutSection}>
                    <h5>Ménagères</h5>
                    <ul className={styles.documentList}>
                      <li>Passeport original + une copie simple</li>
                      <li>Acte de mariage</li>
                      <li>Attestation de prise en charge notariée</li>
                      <li>Bulletins de salaire du tiers (3 mois)</li>
                      <li>Relevé bancaire du tiers (3 mois)</li>
                      <li>Livret de famille</li>
                    </ul>
                  </div>
                )}

                {statut === 'religieux' && (
                  <div className={styles.statutSection}>
                    <h5>Religieux(se)</h5>
                    <ul className={styles.documentList}>
                      <li>Passeport original + une copie simple</li>
                      <li>Attestation de prise en charge notariée</li>
                      <li>Autorisation de la hiérarchie</li>
                      <li>Ordre de mission</li>
                      <li>Les relevés bancaires des 3 derniers mois</li>
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
                    <li>Copie simple du passeport</li>
                    <li>Copie de l'extrait d'acte de naissance</li>
                    <li>Copie du carnet de baptême à jour</li>
                    <li>Nom et prénom(s) du grand-père paternel</li>
                    <li>Engagement signé</li>
                    <li>2 photos d'identité</li>
                  </ul>
                </div>

                {statut === 'salarie' && (
                  <div className={styles.statutSection}>
                    <h5>Salariés (employés ou fonctionnaire)</h5>
                    <ul className={styles.documentList}>
                      <li>Certificat de travail</li>
                      <li>Autorisation de sortie</li>
                      <li>Demande de congé</li>
                      <li>Carte CNSS</li>
                      <li>Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'retraite' && (
                  <div className={styles.statutSection}>
                    <h5>Retraité(e)</h5>
                    <ul className={styles.documentList}>
                      <li>Arrêté de mise en retraite</li>
                      <li>Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'commercant' && (
                  <div className={styles.statutSection}>
                    <h5>Commerçant(s)</h5>
                    <ul className={styles.documentList}>
                      <li>Inscription au RCCM</li>
                      <li>Carte professionnelle de commerçant</li>
                      <li>Certificat de non-imposition</li>
                      <li>Acte de mariage (si nécessaire)</li>
                    </ul>
                  </div>
                )}

                {statut === 'menagere' && (
                  <div className={styles.statutSection}>
                    <h5>Ménagères</h5>
                    <ul className={styles.documentList}>
                      <li>Acte de mariage</li>
                      <li>Attestation de prise en charge notariée</li>
                      <li>Livret de famille</li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Canada */}
            {destination === 'canada' && (
              <div className={styles.destinationSection}>
                <h4 className={styles.destinationTitle}>Documents requis pour une demande de visa touristique au Canada</h4>
                
                <div className={styles.commonDocs}>
                  <h5>Documents de base</h5>
                  <ul className={styles.documentList}>
                    <li>Acte de naissance (noms des deux parents)</li>
                    <li>Photo d'identité numérique (35mm x 45mm)</li>
                    <li>Passeport valide au moins 3 ans</li>
                    <li>Acte de mariage (si applicable)</li>
                    <li>Historique de voyage (anciens visas)</li>
                  </ul>
                </div>

                <div className={styles.financialNote}>
                  <InfoIcon fontSize="small" />
                  <div>
                    <p><strong>Justificatifs financiers :</strong> Minimum 8 000 000 F CFA sur comptes personnels, 13 000 000 F CFA si pris en charge. Relevés bancaires des 6 derniers mois requis.</p>
                  </div>
                </div>

                {statut === 'salarie' && (
                  <div className={styles.statutSection}>
                    <h5>Pour les salariés</h5>
                    <ul className={styles.documentList}>
                      <li>Contrat de travail</li>
                      <li>Six derniers bulletins de salaire</li>
                      <li>Relevés bancaires six mois</li>
                      <li>Lettre de congé</li>
                    </ul>
                  </div>
                )}

                {statut === 'commercant' && (
                  <div className={styles.statutSection}>
                    <h5>Pour les entrepreneurs</h5>
                    <ul className={styles.documentList}>
                      <li>Registre de Commerce (RCCM)</li>
                      <li>Identifiant Fiscal (IFU)</li>
                      <li>Attestation de Situation Fiscale</li>
                      <li>Relevés bancaires six mois de l'entreprise</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
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
                Merci pour votre inscription. Notre équipe vous contactera dans les 48 heures.
              </p>
              <p className={styles.successInstruction}>
                Un email de confirmation a été envoyé à : <strong>{formData.email}</strong>
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
            {apiError && (
              <div className={styles.apiError}>
                <ErrorIcon fontSize="small" />
                <span>{apiError}</span>
              </div>
            )}

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
                      {p.title}
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
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label>Statut professionnel <span className={styles.required}>*</span></label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="statut_professionnel" value="salarie" checked={formData.statut_professionnel === 'salarie'} onChange={(e) => handleChange('statut_professionnel', e.target.value)} disabled={loading} /> Salarié
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="statut_professionnel" value="retraite" checked={formData.statut_professionnel === 'retraite'} onChange={(e) => handleChange('statut_professionnel', e.target.value)} disabled={loading} /> Retraité
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="statut_professionnel" value="commercant" checked={formData.statut_professionnel === 'commercant'} onChange={(e) => handleChange('statut_professionnel', e.target.value)} disabled={loading} /> Commerçant
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="statut_professionnel" value="menagere" checked={formData.statut_professionnel === 'menagere'} onChange={(e) => handleChange('statut_professionnel', e.target.value)} disabled={loading} /> Ménagère
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="statut_professionnel" value="religieux" checked={formData.statut_professionnel === 'religieux'} onChange={(e) => handleChange('statut_professionnel', e.target.value)} disabled={loading} /> Religieux(se)
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Civilité <span className={styles.required}>*</span></label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="civilite" value="M." checked={formData.civilite === 'M.'} onChange={(e) => handleChange('civilite', e.target.value)} disabled={loading} /> M.
                    </label>
                    <label className={styles.radioLabel}>
                      <input type="radio" name="civilite" value="Mme" checked={formData.civilite === 'Mme'} onChange={(e) => handleChange('civilite', e.target.value)} disabled={loading} /> Mme
                    </label>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="nom">Nom <span className={styles.required}>*</span></label>
                  <input type="text" id="nom" value={formData.nom} onChange={(e) => handleChange('nom', e.target.value)} className={errors.nom ? styles.inputError : ''} disabled={loading} />
                  {errors.nom && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.nom}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="prenom">Prénom <span className={styles.required}>*</span></label>
                  <input type="text" id="prenom" value={formData.prenom} onChange={(e) => handleChange('prenom', e.target.value)} className={errors.prenom ? styles.inputError : ''} disabled={loading} />
                  {errors.prenom && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.prenom}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="date_naissance">Date de naissance <span className={styles.required}>*</span></label>
                  <input type="date" id="date_naissance" value={formData.date_naissance} onChange={(e) => handleChange('date_naissance', e.target.value)} className={errors.date_naissance ? styles.inputError : ''} disabled={loading} />
                  {errors.date_naissance && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.date_naissance}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="lieu_naissance">Lieu de naissance</label>
                  <input type="text" id="lieu_naissance" value={formData.lieu_naissance} onChange={(e) => handleChange('lieu_naissance', e.target.value)} disabled={loading} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="nationalite">Nationalité <span className={styles.required}>*</span></label>
                  <input type="text" id="nationalite" value={formData.nationalite} onChange={(e) => handleChange('nationalite', e.target.value)} className={errors.nationalite ? styles.inputError : ''} disabled={loading} />
                  {errors.nationalite && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.nationalite}</span>}
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
                  <label htmlFor="numero_passeport">Numéro de passeport</label>
                  <input type="text" id="numero_passeport" value={formData.numero_passeport} onChange={(e) => handleChange('numero_passeport', e.target.value)} disabled={loading} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="date_expiration_passeport">Date d'expiration</label>
                  <input type="date" id="date_expiration_passeport" value={formData.date_expiration_passeport} onChange={(e) => handleChange('date_expiration_passeport', e.target.value)} disabled={loading} />
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
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email <span className={styles.required}>*</span></label>
                  <input type="email" id="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className={errors.email ? styles.inputError : ''} placeholder="votre@email.com" disabled={loading} />
                  {errors.email && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="telephone">Téléphone <span className={styles.required}>*</span></label>
                  <input type="tel" id="telephone" value={formData.telephone} onChange={(e) => handleChange('telephone', e.target.value)} className={errors.telephone ? styles.inputError : ''} placeholder="+226 XX XX XX XX" disabled={loading} />
                  {errors.telephone && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.telephone}</span>}
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="adresse">Adresse <span className={styles.required}>*</span></label>
                  <textarea id="adresse" value={formData.adresse} onChange={(e) => handleChange('adresse', e.target.value)} className={errors.adresse ? styles.inputError : ''} rows="3" placeholder="Votre adresse complète" disabled={loading} />
                  {errors.adresse && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.adresse}</span>}
                </div>
              </div>
            </div>

            {/* Section 5 : Contact urgence */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>5</span>
                <h2 className={styles.sectionTitle}>Contact urgence</h2>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="urgence_nom">Nom complet</label>
                  <input type="text" id="urgence_nom" value={formData.urgence_nom} onChange={(e) => handleChange('urgence_nom', e.target.value)} disabled={loading} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="urgence_tel">Téléphone</label>
                  <input type="tel" id="urgence_tel" value={formData.urgence_tel} onChange={(e) => handleChange('urgence_tel', e.target.value)} placeholder="+226 XX XX XX XX" disabled={loading} />
                </div>
              </div>
            </div>

            {/* Section 6 : Documents requis */}
            {formData.pelerinage_id && (
              <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionNumber}>6</span>
                  <h2 className={styles.sectionTitle}>Documents requis</h2>
                </div>

                {renderDocuments()}

                <div className={styles.contactInfo}>
                  <h4>Comment fournir vos documents ?</h4>
                  <p>Après votre inscription, notre équipe vous contactera. Vous pourrez nous les faire parvenir par :</p>
                  <ul className={styles.contactList}>
                    <li><EmailIcon fontSize="small" /> <strong>asritavoyages@gmail.com</strong></li>
                    <li><PhoneIcon fontSize="small" /> <strong>+226 25 47 92 22 / +226 66 88 83 83</strong></li>
                    <li><WhatsAppIcon fontSize="small" /> <strong>+226 60 64 33 33</strong></li>
                  </ul>
                </div>
              </div>
            )}

            {/* Section 7 : Acceptation des conditions */}
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>7</span>
                <h2 className={styles.sectionTitle}>Confirmation</h2>
              </div>

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="cgv_accepted" checked={formData.cgv_accepted} onChange={(e) => handleChange('cgv_accepted', e.target.checked)} disabled={loading} />
                <label htmlFor="cgv_accepted" className={styles.checkboxLabel}>Je certifie l'exactitude des informations fournies. <span className={styles.required}>*</span></label>
              </div>
              {errors.cgv_accepted && <span className={styles.errorMsg}><ErrorIcon fontSize="small" /> {errors.cgv_accepted}</span>}

              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="newsletter" checked={formData.newsletter} onChange={(e) => handleChange('newsletter', e.target.checked)} disabled={loading} />
                <label htmlFor="newsletter" className={styles.checkboxLabel}>Je souhaite recevoir les actualités par email</label>
              </div>
            </div>

            <div className={styles.submitArea}>
              <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} disabled={loading}>
                Envoyer ma demande
              </Button>
              <p className={styles.formFootnote}>Les champs marqués d'un <span className={styles.required}>*</span> sont obligatoires</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}