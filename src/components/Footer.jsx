import { eventInfo } from '@/data/eventInfo';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.glowTop} />
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>✦</span>
              <span className={styles.logoText}>LUMINA FEST</span>
            </div>
            <p className={styles.brandDesc}>{eventInfo.description}</p>
            <div className={styles.socials}>
              {['Instagram', 'Twitter', 'TikTok', 'YouTube'].map((s) => (
                <a key={s} href="#" className={styles.socialLink} title={s}>
                  {s === 'Instagram' && '📸'}
                  {s === 'Twitter' && '🐦'}
                  {s === 'TikTok' && '🎵'}
                  {s === 'YouTube' && '▶️'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <a href="#home" className={styles.footerLink}>Home</a>
            <a href="#map" className={styles.footerLink}>Festival Map</a>
            <a href="#schedule" className={styles.footerLink}>Schedule</a>
            <a href="#" className={styles.footerLink}>Buy Tickets</a>
          </div>

          {/* Info */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Information</h4>
            <a href="#" className={styles.footerLink}>FAQ</a>
            <a href="#" className={styles.footerLink}>Getting There</a>
            <a href="#" className={styles.footerLink}>Accessibility</a>
            <a href="#" className={styles.footerLink}>Terms & Conditions</a>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <p className={styles.contactItem}>📧 info@luminafest.id</p>
            <p className={styles.contactItem}>📞 +62 812 3456 7890</p>
            <p className={styles.contactItem}>📍 {eventInfo.location}</p>
            <p className={styles.contactItem}>📅 {eventInfo.date}</p>
          </div>
        </div>

        {/* Sponsors */}
        <div className={styles.sponsors}>
          <span className={styles.sponsorLabel}>Powered by</span>
          <div className={styles.sponsorLogos}>
            {['TechVibe', 'CloudNine', 'EnergyX', 'SoundWave', 'PixelArts'].map((s) => (
              <span key={s} className={styles.sponsorName}>{s}</span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>© 2026 LUMINA FEST. All rights reserved.</p>
          <p>Made with 💜 for music lovers everywhere</p>
        </div>
      </div>
    </footer>
  );
}
