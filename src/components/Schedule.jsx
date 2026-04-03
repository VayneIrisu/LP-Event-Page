'use client';
import { useState } from 'react';
import { schedule } from '@/data/eventInfo';
import styles from './Schedule.module.css';

const typeColors = {
  'main-stage': { color: '#8b5cf6', label: 'Main Stage', icon: '🎵' },
  'workshop': { color: '#facc15', label: 'Workshop', icon: '🎨' },
  'activity': { color: '#4ade80', label: 'Activity', icon: '🎮' },
  'general': { color: '#60a5fa', label: 'General', icon: '📢' },
};

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="schedule" className={styles.section}>
      <div className={styles.container}>
        <h2 className="section-title">Event Schedule</h2>
        <p className="section-subtitle">
          Three days of non-stop entertainment, workshops, and experiences. Plan your visit!
        </p>

        {/* Day Tabs */}
        <div className={styles.tabs}>
          {schedule.map((day, idx) => (
            <button
              key={idx}
              className={`${styles.tab} ${activeDay === idx ? styles.tabActive : ''}`}
              onClick={() => setActiveDay(idx)}
            >
              <span className={styles.tabDay}>Day {idx + 1}</span>
              <span className={styles.tabDate}>{day.day.split('—')[1]?.trim()}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {schedule[activeDay].events.map((event, idx) => {
            const typeInfo = typeColors[event.type] || typeColors.general;
            return (
              <div key={idx} className={styles.timelineItem} style={{ animationDelay: `${idx * 0.08}s` }}>
                <div className={styles.timeBadge}>
                  <span className={styles.time}>{event.time}</span>
                </div>
                <div className={styles.timelineLine}>
                  <div className={styles.timelineDot} style={{ background: typeInfo.color, boxShadow: `0 0 12px ${typeInfo.color}60` }} />
                </div>
                <div className={styles.eventCard}>
                  <div className={styles.eventHeader}>
                    <span className={styles.eventType} style={{ color: typeInfo.color, borderColor: `${typeInfo.color}40`, background: `${typeInfo.color}10` }}>
                      {typeInfo.icon} {typeInfo.label}
                    </span>
                  </div>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <div className={styles.eventLocation}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {event.location}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
