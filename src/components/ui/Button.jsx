// src/components/ui/Button.jsx
import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  type = 'button',
  ...props
}) {
  // Construction des classes CSS
  const buttonClasses = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className={styles.spinner}></span>}
      {icon && !loading && <span className={styles.icon}>{icon}</span>}
      {loading ? 'Chargement...' : children}
    </>
  );

  // Si un href est fourni, on utilise le composant Link de Next.js
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {content}
      </Link>
    );
  }

  // Sinon, on rend un bouton classique
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
}