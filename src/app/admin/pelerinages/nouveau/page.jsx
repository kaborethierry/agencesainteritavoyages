// src/app/admin/pelerinages/nouveau/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import styles from './page.module.css';

export default function NouveauPelerinagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    dates: true,
    programme: true,
    inclusions: true,
    conditions: true
  });

  // État du formulaire
  const [formData, setFormData] = useState({
    titre: '',
    destination: '',
    description_courte: '',
    description_longue: '',
    statut: 'actif',
    date_depart: '',
    date_retour: '',
    prix_adulte: '',
    prix_enfant: '',
    places_total: '',
    places_reservees: '0',
    programme: [{ jour: 1, titre: '', description: '' }],
    inclus: ['Vols A/R', 'Hébergement'],
    non_inclus: ['Dépenses personnelles', 'Pourboires'],
    conditions: '',
    documents_requis: ''
  });

  // Charger les données si édition
  useEffect(() => {
    if (isEditing) {
      fetchPelerinage();
    }
  }, [isEditing]);

  const fetchPelerinage = async () => {
    try {
      setLoading(true);
      // Simulation d'appel API - À remplacer par votre vrai endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données simulées pour l'édition
      setFormData({
        titre: 'Terre Sainte – Jérusalem (Spécial Pâques)',
        destination: 'Israël',
        description_courte: 'Pèlerinage en Terre Sainte sur les pas du Christ',
        description_longue: 'Un pèlerinage unique de 12 jours...',
        statut: 'actif',
        date_depart: '2026-03-27',
        date_retour: '2026-04-08',
        prix_adulte: '2000000',
        prix_enfant: '1500000',
        places_total: '30',
        places_reservees: '18',
        programme: [
          { jour: 1, titre: 'Départ', description: 'Vol pour Tel Aviv' },
          { jour: 2, titre: 'Jérusalem', description: 'Visite du Mont des Oliviers' },
          { jour: 3, titre: 'Bethléem', description: 'Basilique de la Nativité' }
        ],
        inclus: ['Vols A/R', 'Hébergement 3*', 'Pension complète', 'Guide francophone'],
        non_inclus: ['Dépenses personnelles', 'Pourboires', 'Boissons'],
        conditions: 'Passeport valide 6 mois après la date de retour. Assurance obligatoire.',
        documents_requis: 'Passeport, Visa (si nécessaire), Certificat de vaccination'
      });
      setImagePreview('/images/pelerinages/jerusalem.jpg');
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gestion des changements
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gestion de l'upload d'image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Gestion du programme (jours)
  const addJour = () => {
    setFormData(prev => ({
      ...prev,
      programme: [
        ...prev.programme,
        { jour: prev.programme.length + 1, titre: '', description: '' }
      ]
    }));
  };

  const removeJour = (index) => {
    if (formData.programme.length <= 1) return;
    
    setFormData(prev => ({
      ...prev,
      programme: prev.programme.filter((_, i) => i !== index).map((item, i) => ({
        ...item,
        jour: i + 1
      }))
    }));
  };

  const updateJour = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      programme: prev.programme.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Gestion des tags (inclus/non inclus)
  const addTag = (type, value) => {
    if (!value.trim()) return;
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], value.trim()]
    }));
  };

  const removeTag = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Toggle sections
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirection vers la liste
      router.push('/admin/pelerinages');
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader text="Chargement du pèlerinage..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {isEditing ? 'Modifier le pèlerinage' : 'Nouveau pèlerinage'}
          </h1>
          <p className={styles.subtitle}>
            {isEditing ? 'Modifiez les informations du pèlerinage' : 'Ajoutez un nouveau pèlerinage'}
          </p>
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Section 1 : Informations générales */}
        <div className={styles.section}>
          <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('general')}
          >
            <h2 className={styles.sectionTitle}>Informations générales</h2>
            {expandedSections.general ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          
          {expandedSections.general && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                {/* Image */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Image principale</label>
                  <div className={styles.imageUpload}>
                    {imagePreview ? (
                      <div className={styles.imagePreview}>
                        <Image
                          src={imagePreview}
                          alt="Aperçu"
                          width={200}
                          height={150}
                          className={styles.previewImg}
                        />
                        <button
                          type="button"
                          className={styles.removeImage}
                          onClick={() => setImagePreview(null)}
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    ) : (
                      <label className={styles.uploadPlaceholder}>
                        <CloudUploadIcon />
                        <span>Cliquez pour uploader une image</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className={styles.fileInput}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Titre */}
                <div className={styles.formGroup}>
                  <label htmlFor="titre" className={styles.label}>
                    Titre du pèlerinage <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="titre"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Destination */}
                <div className={styles.formGroup}>
                  <label htmlFor="destination" className={styles.label}>
                    Destination <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Statut */}
                <div className={styles.formGroup}>
                  <label htmlFor="statut" className={styles.label}>Statut</label>
                  <select
                    id="statut"
                    name="statut"
                    value={formData.statut}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="complet">Complet</option>
                  </select>
                </div>

                {/* Description courte */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="description_courte" className={styles.label}>
                    Description courte <span className={styles.required}>*</span>
                  </label>
                  <textarea
                    id="description_courte"
                    name="description_courte"
                    value={formData.description_courte}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows="3"
                    maxLength="150"
                    required
                  />
                  <small className={styles.fieldNote}>
                    {formData.description_courte.length}/150 caractères
                  </small>
                </div>

                {/* Description longue */}
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="description_longue" className={styles.label}>
                    Description longue
                  </label>
                  <textarea
                    id="description_longue"
                    name="description_longue"
                    value={formData.description_longue}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows="6"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2 : Dates & Tarifs */}
        <div className={styles.section}>
          <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('dates')}
          >
            <h2 className={styles.sectionTitle}>Dates & Tarifs</h2>
            {expandedSections.dates ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          
          {expandedSections.dates && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                {/* Date départ */}
                <div className={styles.formGroup}>
                  <label htmlFor="date_depart" className={styles.label}>
                    Date de départ <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="date_depart"
                    name="date_depart"
                    value={formData.date_depart}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Date retour */}
                <div className={styles.formGroup}>
                  <label htmlFor="date_retour" className={styles.label}>
                    Date de retour <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="date"
                    id="date_retour"
                    name="date_retour"
                    value={formData.date_retour}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Prix adulte */}
                <div className={styles.formGroup}>
                  <label htmlFor="prix_adulte" className={styles.label}>
                    Prix adulte (FCFA) <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    id="prix_adulte"
                    name="prix_adulte"
                    value={formData.prix_adulte}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Prix enfant */}
                <div className={styles.formGroup}>
                  <label htmlFor="prix_enfant" className={styles.label}>
                    Prix enfant (FCFA)
                  </label>
                  <input
                    type="number"
                    id="prix_enfant"
                    name="prix_enfant"
                    value={formData.prix_enfant}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                {/* Places total */}
                <div className={styles.formGroup}>
                  <label htmlFor="places_total" className={styles.label}>
                    Nombre de places total <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="number"
                    id="places_total"
                    name="places_total"
                    value={formData.places_total}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                {/* Places réservées */}
                <div className={styles.formGroup}>
                  <label htmlFor="places_reservees" className={styles.label}>
                    Places réservées
                  </label>
                  <input
                    type="number"
                    id="places_reservees"
                    name="places_reservees"
                    value={formData.places_reservees}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3 : Programme */}
        <div className={styles.section}>
          <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('programme')}
          >
            <h2 className={styles.sectionTitle}>Programme</h2>
            {expandedSections.programme ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          
          {expandedSections.programme && (
            <div className={styles.sectionContent}>
              {formData.programme.map((jour, index) => (
                <div key={index} className={styles.jourItem}>
                  <div className={styles.jourHeader}>
                    <h3 className={styles.jourTitle}>Jour {jour.jour}</h3>
                    {formData.programme.length > 1 && (
                      <button
                        type="button"
                        className={styles.removeJourBtn}
                        onClick={() => removeJour(index)}
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Titre de l'étape</label>
                      <input
                        type="text"
                        value={jour.titre}
                        onChange={(e) => updateJour(index, 'titre', e.target.value)}
                        className={styles.input}
                        placeholder="Ex: Arrivée à Jérusalem"
                      />
                    </div>
                    
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Description</label>
                      <textarea
                        value={jour.description}
                        onChange={(e) => updateJour(index, 'description', e.target.value)}
                        className={styles.textarea}
                        rows="2"
                        placeholder="Description de l'étape..."
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className={styles.addJourBtn}
                onClick={addJour}
              >
                <AddIcon /> Ajouter un jour
              </button>
            </div>
          )}
        </div>

        {/* Section 4 : Inclus / Non inclus */}
        <div className={styles.section}>
          <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('inclusions')}
          >
            <h2 className={styles.sectionTitle}>Inclus / Non inclus</h2>
            {expandedSections.inclusions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          
          {expandedSections.inclusions && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                {/* Inclus */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ce qui est inclus</label>
                  <div className={styles.tagsContainer}>
                    {formData.inclus.map((item, index) => (
                      <span key={index} className={styles.tag}>
                        {item}
                        <button
                          type="button"
                          onClick={() => removeTag('inclus', index)}
                          className={styles.tagRemove}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className={styles.tagInput}>
                    <input
                      type="text"
                      id="newInclus"
                      placeholder="Ajouter un élément..."
                      className={styles.input}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag('inclus', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Non inclus */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ce qui n'est pas inclus</label>
                  <div className={styles.tagsContainer}>
                    {formData.non_inclus.map((item, index) => (
                      <span key={index} className={styles.tag}>
                        {item}
                        <button
                          type="button"
                          onClick={() => removeTag('non_inclus', index)}
                          className={styles.tagRemove}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className={styles.tagInput}>
                    <input
                      type="text"
                      id="newNonInclus"
                      placeholder="Ajouter un élément..."
                      className={styles.input}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag('non_inclus', e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 5 : Conditions */}
        <div className={styles.section}>
          <div 
            className={styles.sectionHeader}
            onClick={() => toggleSection('conditions')}
          >
            <h2 className={styles.sectionTitle}>Conditions</h2>
            {expandedSections.conditions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          
          {expandedSections.conditions && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="conditions" className={styles.label}>
                    Conditions de participation
                  </label>
                  <textarea
                    id="conditions"
                    name="conditions"
                    value={formData.conditions}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows="4"
                    placeholder="Conditions de participation, prérequis..."
                  />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="documents_requis" className={styles.label}>
                    Documents requis
                  </label>
                  <textarea
                    id="documents_requis"
                    name="documents_requis"
                    value={formData.documents_requis}
                    onChange={handleChange}
                    className={styles.textarea}
                    rows="3"
                    placeholder="Passeport, visa, certificats..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className={styles.formActions}>
          <Link href="/admin/pelerinages">
            <Button variant="ghost" size="lg">
              Annuler
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={saving}
            disabled={saving}
          >
            {saving ? 'Enregistrement...' : 'Enregistrer le pèlerinage'}
          </Button>
        </div>
      </form>
    </div>
  );
}