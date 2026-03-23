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
import { pilgrimageAPI, uploadAPI } from '@/lib/api';
import styles from './page.module.css';

export default function NouveauPelerinagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    dates: true,
    programme: true,
    inclusions: true,
    conditions: true
  });

  const [formData, setFormData] = useState({
    id: '',
    titre: '',
    location: '',
    country: '',
    duration: '',
    price: '',
    currency: 'FCFA',
    start_date: '',
    end_date: '',
    inscription_deadline: '',
    description: '',
    long_description: '',
    image: '',
    gallery: [],
    month: '',
    featured: false,
    status: 'actif',
    places_total: 30,
    places_reservees: 0,
    prix_enfant: '',
    conditions: '',
    documents_requis: '',
    programme: [{ jour: 1, titre: '', description: '' }],
    inclus: ['Vols internationaux A/R', 'Hébergement en hôtels 3* et 4*'],
    non_inclus: ['Dépenses personnelles', 'Pourboires']
  });

  useEffect(() => {
    if (isEditing && editId) {
      fetchPelerinage();
    }
  }, [isEditing, editId]);

  const fetchPelerinage = async () => {
    try {
      setLoading(true);
      const data = await pilgrimageAPI.getById(editId);
      
      let programme = [{ jour: 1, titre: '', description: '' }];
      if (data.itinerary) {
        try {
          programme = typeof data.itinerary === 'string' ? JSON.parse(data.itinerary) : data.itinerary;
        } catch (e) {}
      }
      
      let inclus = ['Vols internationaux A/R', 'Hébergement en hôtels 3* et 4*'];
      let non_inclus = ['Dépenses personnelles', 'Pourboires'];
      
      if (data.inclus) {
        try {
          inclus = typeof data.inclus === 'string' ? JSON.parse(data.inclus) : data.inclus;
        } catch (e) {}
      }
      
      if (data.non_inclus) {
        try {
          non_inclus = typeof data.non_inclus === 'string' ? JSON.parse(data.non_inclus) : data.non_inclus;
        } catch (e) {}
      }
      
      setFormData({
        id: data.id || '',
        titre: data.titre || '',
        location: data.location || '',
        country: data.country || '',
        duration: data.duration || '',
        price: data.price || '',
        currency: data.currency || 'FCFA',
        start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
        end_date: data.end_date ? new Date(data.end_date).toISOString().split('T')[0] : '',
        inscription_deadline: data.inscription_deadline ? new Date(data.inscription_deadline).toISOString().split('T')[0] : '',
        description: data.description || '',
        long_description: data.long_description || '',
        image: data.image || '',
        gallery: data.gallery || [],
        month: data.month || '',
        featured: data.featured === 1 || data.featured === true,
        status: data.status || 'actif',
        places_total: data.places_total || 30,
        places_reservees: data.places_reservees || 0,
        prix_enfant: data.prix_enfant || '',
        conditions: data.conditions || '',
        documents_requis: data.documents_requis || '',
        programme: programme,
        inclus: inclus,
        non_inclus: non_inclus
      });
      
      setImagePreview(data.image);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Vérifications
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Format non supporté. Utilisez JPG, PNG, GIF ou WEBP.');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }
    
    // Aperçu immédiat
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    
    setUploading(true);
    try {
      const result = await uploadAPI.uploadImage(file);
      if (result && result.url) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        throw new Error('URL d\'image non reçue');
      }
    } catch (err) {
      console.error('Erreur upload:', err);
      alert('Erreur lors de l\'upload: ' + (err.message || 'Erreur inconnue'));
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const addJour = () => {
    setFormData(prev => ({
      ...prev,
      programme: [...prev.programme, { jour: prev.programme.length + 1, titre: '', description: '' }]
    }));
  };

  const removeJour = (index) => {
    if (formData.programme.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      programme: prev.programme.filter((_, i) => i !== index).map((item, i) => ({ ...item, jour: i + 1 }))
    }));
  };

  const updateJour = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      programme: prev.programme.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const addTag = (type, value) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [type]: [...prev[type], value.trim()] }));
  };

  const removeTag = (type, index) => {
    setFormData(prev => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
  };

  const handleTagKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(type, e.target.value);
      e.target.value = '';
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const submitData = {
      titre: formData.titre,
      location: formData.location,
      country: formData.country,
      duration: formData.duration,
      price: parseInt(formData.price) || 0,
      currency: formData.currency,
      start_date: formData.start_date,
      end_date: formData.end_date,
      inscription_deadline: formData.inscription_deadline || null,
      description: formData.description,
      long_description: formData.long_description,
      image: formData.image,
      gallery: formData.gallery,
      month: formData.month,
      featured: formData.featured ? 1 : 0,
      status: formData.status,
      places_total: parseInt(formData.places_total) || 30,
      places_reservees: parseInt(formData.places_reservees) || 0,
      prix_enfant: formData.prix_enfant ? parseInt(formData.prix_enfant) : null,
      conditions: formData.conditions,
      documents_requis: formData.documents_requis,
      itinerary: formData.programme,
      inclus: formData.inclus,
      non_inclus: formData.non_inclus
    };
    
    try {
      if (isEditing) {
        await pilgrimageAPI.update(editId, submitData);
      } else {
        await pilgrimageAPI.create(submitData);
      }
      router.push('/admin/pelerinages');
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement:', err);
      alert('Erreur lors de l\'enregistrement du pèlerinage');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader text="Chargement des données..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
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

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('general')}>
            <h2 className={styles.sectionTitle}>Informations générales</h2>
            {expandedSections.general ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {expandedSections.general && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>Image principale</label>
                  <div className={styles.imageUpload}>
                    {uploading && <div className={styles.uploadingIndicator}>Upload en cours...</div>}
                    {imagePreview ? (
                      <div className={styles.imagePreview}>
                        <Image 
                          src={imagePreview} 
                          alt="Aperçu de l'image du pèlerinage" 
                          width={200} 
                          height={150} 
                          className={styles.previewImg}
                        />
                        <button type="button" className={styles.removeImage} onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image: '' }));
                        }}>
                          <DeleteIcon />
                        </button>
                      </div>
                    ) : (
                      <label className={styles.uploadPlaceholder}>
                        <CloudUploadIcon />
                        <span>Cliquez pour uploader</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.fileInput} />
                      </label>
                    )}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="titre" className={styles.label}>Titre <span className={styles.required}>*</span></label>
                  <input type="text" id="titre" name="titre" value={formData.titre || ''} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="location" className={styles.label}>Destination <span className={styles.required}>*</span></label>
                  <input type="text" id="location" name="location" value={formData.location || ''} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="country" className={styles.label}>Pays</label>
                  <input type="text" id="country" name="country" value={formData.country || ''} onChange={handleChange} className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="duration" className={styles.label}>Durée <span className={styles.required}>*</span></label>
                  <input type="text" id="duration" name="duration" value={formData.duration || ''} onChange={handleChange} placeholder="Ex: 13 jours / 12 nuits" className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="month" className={styles.label}>Mois</label>
                  <select id="month" name="month" value={formData.month || ''} onChange={handleChange} className={styles.select}>
                    <option value="">Sélectionner</option>
                    <option value="Janvier">Janvier</option><option value="Février">Février</option><option value="Mars">Mars</option>
                    <option value="Avril">Avril</option><option value="Mai">Mai</option><option value="Juin">Juin</option>
                    <option value="Juillet">Juillet</option><option value="Août">Août</option><option value="Septembre">Septembre</option>
                    <option value="Octobre">Octobre</option><option value="Novembre">Novembre</option><option value="Décembre">Décembre</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="status" className={styles.label}>Statut</label>
                  <select id="status" name="status" value={formData.status || 'actif'} onChange={handleChange} className={styles.select}>
                    <option value="actif">Actif</option>
                    <option value="inactif">Inactif</option>
                    <option value="complet">Complet</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="featured" className={styles.label}>À la une</label>
                  <div className={styles.checkboxWrapper}>
                    <input type="checkbox" id="featured" name="featured" checked={formData.featured || false} onChange={handleChange} className={styles.checkbox} />
                    <label htmlFor="featured" className={styles.checkboxLabel}>Mettre en avant ce voyage</label>
                  </div>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="description" className={styles.label}>Description courte <span className={styles.required}>*</span></label>
                  <textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} className={styles.textarea} rows="3" maxLength="150" required />
                  <small className={styles.fieldNote}>{(formData.description || '').length}/150 caractères</small>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="long_description" className={styles.label}>Description longue</label>
                  <textarea id="long_description" name="long_description" value={formData.long_description || ''} onChange={handleChange} className={styles.textarea} rows="6" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('dates')}>
            <h2 className={styles.sectionTitle}>Dates & Tarifs</h2>
            {expandedSections.dates ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {expandedSections.dates && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="start_date" className={styles.label}>Date départ <span className={styles.required}>*</span></label>
                  <input type="date" id="start_date" name="start_date" value={formData.start_date || ''} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="end_date" className={styles.label}>Date retour <span className={styles.required}>*</span></label>
                  <input type="date" id="end_date" name="end_date" value={formData.end_date || ''} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="inscription_deadline" className={styles.label}>Date limite inscription</label>
                  <input type="date" id="inscription_deadline" name="inscription_deadline" value={formData.inscription_deadline || ''} onChange={handleChange} className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="price" className={styles.label}>Prix (FCFA) <span className={styles.required}>*</span></label>
                  <input type="number" id="price" name="price" value={formData.price || ''} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="prix_enfant" className={styles.label}>Prix enfant (FCFA)</label>
                  <input type="number" id="prix_enfant" name="prix_enfant" value={formData.prix_enfant || ''} onChange={handleChange} className={styles.input} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="places_total" className={styles.label}>Places total <span className={styles.required}>*</span></label>
                  <input type="number" id="places_total" name="places_total" value={formData.places_total || 30} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="places_reservees" className={styles.label}>Places réservées</label>
                  <input type="number" id="places_reservees" name="places_reservees" value={formData.places_reservees || 0} onChange={handleChange} className={styles.input} />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('programme')}>
            <h2 className={styles.sectionTitle}>Programme</h2>
            {expandedSections.programme ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {expandedSections.programme && (
            <div className={styles.sectionContent}>
              {formData.programme && formData.programme.map((jour, index) => (
                <div key={index} className={styles.jourItem}>
                  <div className={styles.jourHeader}>
                    <h3 className={styles.jourTitle}>Jour {jour.jour}</h3>
                    {formData.programme.length > 1 && (
                      <button type="button" className={styles.removeJourBtn} onClick={() => removeJour(index)}>
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Titre</label>
                      <input type="text" value={jour.titre || ''} onChange={(e) => updateJour(index, 'titre', e.target.value)} className={styles.input} placeholder="Ex: Arrivée à Jérusalem" />
                    </div>
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Description</label>
                      <textarea value={jour.description || ''} onChange={(e) => updateJour(index, 'description', e.target.value)} className={styles.textarea} rows="2" placeholder="Description détaillée..." />
                    </div>
                  </div>
                </div>
              ))}
              <button type="button" className={styles.addJourBtn} onClick={addJour}>
                <AddIcon /> Ajouter un jour
              </button>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('inclusions')}>
            <h2 className={styles.sectionTitle}>Inclus / Non inclus</h2>
            {expandedSections.inclusions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {expandedSections.inclusions && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Ce qui est inclus</label>
                  <div className={styles.tagsContainer}>
                    {formData.inclus && formData.inclus.map((item, i) => (
                      <span key={i} className={styles.tag}>
                        {item}
                        <button type="button" onClick={() => removeTag('inclus', i)} className={styles.tagRemove}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className={styles.tagInput}>
                    <input type="text" placeholder="Ajouter un élément..." className={styles.input} onKeyPress={(e) => handleTagKeyPress(e, 'inclus')} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Ce qui n'est pas inclus</label>
                  <div className={styles.tagsContainer}>
                    {formData.non_inclus && formData.non_inclus.map((item, i) => (
                      <span key={i} className={styles.tag}>
                        {item}
                        <button type="button" onClick={() => removeTag('non_inclus', i)} className={styles.tagRemove}>×</button>
                      </span>
                    ))}
                  </div>
                  <div className={styles.tagInput}>
                    <input type="text" placeholder="Ajouter un élément..." className={styles.input} onKeyPress={(e) => handleTagKeyPress(e, 'non_inclus')} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('conditions')}>
            <h2 className={styles.sectionTitle}>Conditions</h2>
            {expandedSections.conditions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>
          {expandedSections.conditions && (
            <div className={styles.sectionContent}>
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="conditions" className={styles.label}>Conditions de participation</label>
                  <textarea id="conditions" name="conditions" value={formData.conditions || ''} onChange={handleChange} className={styles.textarea} rows="4" />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                  <label htmlFor="documents_requis" className={styles.label}>Documents requis</label>
                  <textarea id="documents_requis" name="documents_requis" value={formData.documents_requis || ''} onChange={handleChange} className={styles.textarea} rows="3" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <Link href="/admin/pelerinages">
            <Button variant="ghost" size="lg">Annuler</Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" loading={saving} disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer le pèlerinage'}
          </Button>
        </div>
      </form>
    </div>
  );
}