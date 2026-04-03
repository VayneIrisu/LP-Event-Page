'use client';
import { useEffect } from 'react';
import styles from './BoothModal.module.css';

export default function BoothModal({ booth, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!booth) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div
            className={styles.categoryBadge}
            style={{ background: `${booth.category.color}20`, borderColor: `${booth.category.color}50` }}
          >
            <span className={styles.categoryIcon}>{booth.category.icon}</span>
            <span style={{ color: booth.category.color }}>{booth.category.label}</span>
          </div>
          <div className={styles.boothNumber} style={{ color: booth.category.color }}>
            {booth.number}
          </div>
        </div>

        {/* Content */}
        <h2 className={styles.name}>{booth.name}</h2>
        <p className={styles.description}>{booth.description}</p>

        {/* Info Grid */}
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🕐</div>
            <div>
              <div className={styles.infoLabel}>Operating Hours</div>
              <div className={styles.infoValue}>{booth.hours}</div>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <div>
              <div className={styles.infoLabel}>Booth Location</div>
              <div className={styles.infoValue}>Zone {booth.number.split('-')[0]}, Spot {booth.number}</div>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              {booth.status === 'open' ? '🟢' : booth.status === 'sold-out' ? '🔴' : '🟡'}
            </div>
            <div>
              <div className={styles.infoLabel}>Status</div>
              <div className={styles.infoValue} style={{ textTransform: 'capitalize' }}>
                {booth.status === 'open' ? 'Open Now' : booth.status}
              </div>
            </div>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>🏷️</div>
            <div>
              <div className={styles.infoLabel}>Category</div>
              <div className={styles.infoValue}>{booth.category.label}</div>
            </div>
          </div>
        </div>

        {/* Accent line */}
        <div className={styles.accentLine} style={{ background: `linear-gradient(90deg, ${booth.category.color}, transparent)` }} />

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.btnVisit} style={{ background: booth.category.color }}>
            Navigate to Booth
          </button>
          <button className={styles.btnSave}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
