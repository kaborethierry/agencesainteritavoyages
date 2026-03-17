// src/app/admin/messages/page.jsx
'use client';

import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import styles from './page.module.css';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileView, setMobileView] = useState('list'); // 'list' ou 'detail'

  // Charger les messages
  useEffect(() => {
    fetchMessages();
  }, []);

  // Détecter la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileView('list');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Données simulées
      const mockMessages = [
        {
          id: 1,
          nom: 'Jean Dupont',
          email: 'jean.dupont@email.com',
          telephone: '70 12 34 56',
          sujet: 'Demande d\'information générale',
          message: 'Bonjour, je souhaiterais avoir plus d\'informations sur les pèlerinages en Terre Sainte. Quelles sont les dates disponibles pour 2026 ? Merci d\'avance.',
          date: '2026-03-15T10:30:00',
          lu: false,
          repondu: false
        },
        {
          id: 2,
          nom: 'Marie Claire Kaboré',
          email: 'mc.kabore@email.com',
          telephone: '71 23 45 67',
          sujet: 'Informations sur un pèlerinage',
          message: 'Bonjour, je suis intéressée par le pèlerinage en Pologne. Pourriez-vous m\'envoyer le programme détaillé et les conditions d\'inscription ? Cordialement.',
          date: '2026-03-14T15:45:00',
          lu: true,
          repondu: false
        },
        {
          id: 3,
          nom: 'Paul Ouédraogo',
          email: 'paul.o@email.com',
          telephone: '72 34 56 78',
          sujet: 'Demande de devis groupe',
          message: 'Bonjour, nous sommes un groupe de 15 personnes et nous souhaiterions un devis pour le pèlerinage à Lourdes. Merci de nous contacter pour plus d\'informations.',
          date: '2026-03-13T09:15:00',
          lu: true,
          repondu: true
        },
        {
          id: 4,
          nom: 'Sœur Anne-Claire',
          email: 'soeur.anne@email.com',
          telephone: '73 45 67 89',
          sujet: 'Question sur une inscription',
          message: 'Bonjour, j\'ai inscrit un groupe de 10 personnes pour le pèlerinage à Rome mais je n\'ai pas reçu de confirmation. Pouvez-vous vérifier ? Merci.',
          date: '2026-03-12T14:20:00',
          lu: false,
          repondu: false
        },
        {
          id: 5,
          nom: 'Tiendrebeogo Iréné',
          email: 'irene.t@email.com',
          telephone: '70 26 64 41',
          sujet: 'Autre',
          message: 'Bonjour, je suis le responsable de l\'agence et je teste la messagerie. Tout fonctionne correctement.',
          date: '2026-03-11T11:00:00',
          lu: true,
          repondu: true
        }
      ];

      setMessages(mockMessages);
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Marquer un message comme lu
  const markAsRead = async (id) => {
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setMessages(prev => prev.map(m => 
        m.id === id ? { ...m, lu: true } : m
      ));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(prev => ({ ...prev, lu: true }));
      }
    } catch (err) {
      console.error('Erreur lors du marquage:', err);
    }
  };

  // Supprimer un message
  const deleteMessage = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMessages(prev => prev.filter(m => m.id !== id));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
        setMobileView('list');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    }
  };

  // Répondre (ouvre le client mail)
  const replyTo = (email, sujet) => {
    window.location.href = `mailto:${email}?subject=Re: ${sujet}`;
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Aujourd'hui à ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
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
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Messages reçus</h1>
        {unreadCount > 0 && (
          <span className={styles.unreadBadge}>{unreadCount} non lu(s)</span>
        )}
      </div>

      {/* Layout messagerie */}
      <div className={styles.messagingLayout}>
        {/* Liste des messages (gauche) */}
        <div className={`${styles.messageList} ${mobileView === 'detail' ? styles.hideOnMobile : ''}`}>
          {messages.length === 0 ? (
            <div className={styles.emptyList}>
              <p>Aucun message pour le moment</p>
            </div>
          ) : (
            messages
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(message => (
                <div
                  key={message.id}
                  className={`${styles.messageItem} ${!message.lu ? styles.unread : ''} ${
                    selectedMessage?.id === message.id ? styles.selected : ''
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    setMobileView('detail');
                    if (!message.lu) {
                      markAsRead(message.id);
                    }
                  }}
                >
                  <div className={styles.messageHeader}>
                    <h3 className={styles.messageName}>{message.nom}</h3>
                    <span className={styles.messageDate}>{formatDate(message.date)}</span>
                  </div>
                  
                  <div className={styles.messageSubject}>
                    <strong>{message.sujet}</strong>
                    {!message.lu && <span className={styles.unreadDot}></span>}
                  </div>
                  
                  <p className={styles.messagePreview}>
                    {message.message.length > 80 
                      ? message.message.substring(0, 80) + '...' 
                      : message.message}
                  </p>
                </div>
              ))
          )}
        </div>

        {/* Détail du message (droite) */}
        <div className={`${styles.messageDetail} ${mobileView === 'list' ? styles.hideOnMobile : ''}`}>
          {selectedMessage ? (
            <>
              {/* Bouton retour (mobile) */}
              <button
                className={styles.backButton}
                onClick={() => setMobileView('list')}
              >
                <ArrowBackIcon /> Retour
              </button>

              <div className={styles.detailContent}>
                {/* En-tête du message */}
                <div className={styles.detailHeader}>
                  <div>
                    <h2 className={styles.detailSubject}>{selectedMessage.sujet}</h2>
                    <div className={styles.detailMeta}>
                      <span className={styles.detailName}>{selectedMessage.nom}</span>
                      <span className={styles.detailDate}>
                        {new Date(selectedMessage.date).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.detailStatus}>
                    {!selectedMessage.lu && (
                      <span className={styles.unreadTag}>Non lu</span>
                    )}
                    {selectedMessage.repondu && (
                      <span className={styles.repliedTag}>Répondu</span>
                    )}
                  </div>
                </div>

                {/* Coordonnées */}
                <div className={styles.contactInfo}>
                  <div className={styles.contactRow}>
                    <span className={styles.contactLabel}>Email :</span>
                    <a href={`mailto:${selectedMessage.email}`} className={styles.contactValue}>
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className={styles.contactRow}>
                    <span className={styles.contactLabel}>Téléphone :</span>
                    <a href={`tel:${selectedMessage.telephone}`} className={styles.contactValue}>
                      {selectedMessage.telephone}
                    </a>
                  </div>
                </div>

                {/* Corps du message */}
                <div className={styles.messageBody}>
                  <p>{selectedMessage.message}</p>
                </div>

                {/* Actions */}
                <div className={styles.messageActions}>
                  <Button
                    variant="primary"
                    onClick={() => replyTo(selectedMessage.email, selectedMessage.sujet)}
                  >
                    <ReplyIcon /> Répondre
                  </Button>
                  
                  {!selectedMessage.lu && (
                    <Button
                      variant="outline"
                      onClick={() => markAsRead(selectedMessage.id)}
                    >
                      <MarkEmailReadIcon /> Marquer comme lu
                    </Button>
                  )}
                  
                  <Button
                    variant="danger"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
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