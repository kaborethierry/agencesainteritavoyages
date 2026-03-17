// src/components/ui/SectionTitle.jsx
import styles from './SectionTitle.module.css';

export default function SectionTitle({ 
  surtitre, 
  titre, 
  description, 
  centered = false,
  light = false,
  className = '' 
}) {
  // Construction des classes CSS
  const wrapperClasses = [
    styles.wrapper,
    centered ? styles.centered : '',
    light ? styles.light : '',
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {surtitre && (
        <span className={styles.surtitre}>
          {surtitre}
        </span>
      )}
      
      {titre && (
        <h2 className={styles.titre}>
          {titre}
        </h2>
      )}
      
      <div className={styles.divider} aria-hidden="true"></div>
      
      {description && (
        <p className={styles.description}>
          {description}
        </p>
      )}
    </div>
  );
}