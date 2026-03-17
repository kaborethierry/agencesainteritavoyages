// src/components/admin/StatsCard.jsx
import styles from './StatsCard.module.css';

export default function StatsCard({ 
  icon, 
  label, 
  value, 
  trend, 
  trendLabel, 
  color = 'gold' 
}) {
  const colorClass = {
    gold: styles.colorGold,
    navy: styles.colorNavy,
    success: styles.colorSuccess,
    warning: styles.colorWarning,
  }[color] || styles.colorGold;

  const isTrendPositive = trend > 0;

  return (
    <div className={styles.card}>
      <div className={`${styles.iconBox} ${colorClass}`}>
        {icon}
      </div>
      <div className={styles.info}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>
        {trend !== undefined && (
          <span className={`${styles.trend} ${isTrendPositive ? styles.trendUp : styles.trendDown}`}>
            {isTrendPositive ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel}
          </span>
        )}
      </div>
    </div>
  );
}