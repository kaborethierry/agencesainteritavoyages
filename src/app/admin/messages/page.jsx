'use client';

import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { contactAPI } from '@/lib/api';
import styles from './page.module.css';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState('list');

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileView('list');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await contactAPI.getAll();
      setMessages(data);
    } catch (err) {
      console.error('Erreur chargement messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await contactAPI.markAsRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, lu: 1 } : m));
      if (selected && selected.id === id) setSelected(prev => ({ ...prev, lu: 1 }));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Supprimer ce message ?')) return;
    try {
      await contactAPI.delete(id);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (selected && selected.id === id) {
        setSelected(null);
        setMobileView('list');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const replyTo = (email, sujet) => {
    window.location.href = `mailto:${email}?subject=Re: ${sujet}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours} h`;
    if (diffDays === 0) return `Aujourd'hui à ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  const unreadCount = messages.filter(m => !m.lu).length;

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader text="Chargement des messages..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Messages reçus</h1>
        {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount} non lu(s)</span>}
      </div>

      <div className={styles.messagingLayout}>
        <div className={`${styles.messageList} ${mobileView === 'detail' ? styles.hideOnMobile : ''}`}>
          {messages.length === 0 ? (
            <div className={styles.emptyList}>
              <p>Aucun message</p>
            </div>
          ) : (
            [...messages].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(m => (
              <div
                key={m.id}
                className={`${styles.messageItem} ${!m.lu ? styles.unread : ''} ${selected?.id === m.id ? styles.selected : ''}`}
                onClick={() => {
                  setSelected(m);
                  setMobileView('detail');
                  if (!m.lu) markAsRead(m.id);
                }}
              >
                <div className={styles.messageHeader}>
                  <h3 className={styles.messageName}>{m.nom}</h3>
                  <span className={styles.messageDate}>{formatDate(m.created_at)}</span>
                </div>
                <div className={styles.messageSubject}>
                  <strong>{m.sujet}</strong>
                  {!m.lu && <span className={styles.unreadDot}></span>}
                </div>
                <p className={styles.messagePreview}>
                  {m.message.length > 80 ? m.message.substring(0, 80) + '...' : m.message}
                </p>
              </div>
            ))
          )}
        </div>

        <div className={`${styles.messageDetail} ${mobileView === 'list' ? styles.hideOnMobile : ''}`}>
          {selected ? (
            <>
              <button className={styles.backButton} onClick={() => setMobileView('list')}>
                <ArrowBackIcon /> Retour
              </button>
              <div className={styles.detailContent}>
                <div className={styles.detailHeader}>
                  <div>
                    <h2 className={styles.detailSubject}>{selected.sujet}</h2>
                    <div className={styles.detailMeta}>
                      <span className={styles.detailName}>{selected.nom}</span>
                      <span className={styles.detailDate}>
                        {new Date(selected.created_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  <div className={styles.detailStatus}>
                    {!selected.lu && <span className={styles.unreadTag}>Non lu</span>}
                    {selected.repondu === 1 && <span className={styles.repliedTag}>Répondu</span>}
                  </div>
                </div>

                <div className={styles.contactInfo}>
                  <div className={styles.contactRow}>
                    <span className={styles.contactLabel}>Email :</span>
                    <a href={`mailto:${selected.email}`} className={styles.contactValue}>{selected.email}</a>
                  </div>
                  <div className={styles.contactRow}>
                    <span className={styles.contactLabel}>Téléphone :</span>
                    <a href={`tel:${selected.telephone}`} className={styles.contactValue}>{selected.telephone || 'Non fourni'}</a>
                  </div>
                </div>

                <div className={styles.messageBody}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{selected.message}</p>
                </div>

                <div className={styles.messageActions}>
                  <Button variant="primary" onClick={() => replyTo(selected.email, selected.sujet)}>
                    <ReplyIcon /> Répondre
                  </Button>
                  {!selected.lu && (
                    <Button variant="outline" onClick={() => markAsRead(selected.id)}>
                      <MarkEmailReadIcon /> Marquer comme lu
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => deleteMessage(selected.id)}>
                    <DeleteIcon /> Supprimer
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.noSelection}>
              <p>Sélectionnez un message pour afficher son contenu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}