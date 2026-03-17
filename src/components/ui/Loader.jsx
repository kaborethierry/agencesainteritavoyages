// src/components/ui/Loader.jsx
import styles from './Loader.module.css';

export default function Loader({ text = 'Chargement...' }) {
  return (
    <div className={styles.loader}>
      <div className={styles.ring}></div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}