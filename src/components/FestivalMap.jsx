'use client';
import { useState, useRef, useCallback } from 'react';
import { booths, landmarks, CATEGORIES } from '@/data/booths';
import BoothModal from './BoothModal';
import styles from './FestivalMap.module.css';

const MAP_WIDTH = 800;
const MAP_HEIGHT = 620;

export default function FestivalMap() {
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [hoveredBooth, setHoveredBooth] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  const filteredBooths = activeFilter === 'all'
    ? booths
    : booths.filter((b) => b.category.id === activeFilter);

  const handleBoothClick = useCallback((booth) => {
    setSelectedBooth(booth);
  }, []);

  const handleZoom = (dir) => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(0.5, Math.min(2.5, prev.scale + dir * 0.25)),
    }));
  };

  const handleReset = () => {
    setTransform({ scale: 1, x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest(`.${styles.booth}`)) return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    }));
  };

  const handleMouseUp = () => setIsPanning(false);

  const categories = [
    { id: 'all', label: 'All', icon: '🎪', color: '#8b5cf6' },
    ...Object.values(CATEGORIES),
  ];

  return (
    <section id="map" className={styles.section}>
      <div className={styles.container}>
        <h2 className="section-title">Festival Map</h2>
        <p className="section-subtitle">
          Explore our venue! Click any booth to see details about vendors, activities, and schedules.
        </p>

        {/* Category Filter */}
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.filterActive : ''}`}
              onClick={() => setActiveFilter(cat.id)}
              style={activeFilter === cat.id ? { borderColor: cat.color, boxShadow: `0 0 15px ${cat.color}40` } : {}}
            >
              <span className={styles.filterIcon}>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Map Controls */}
        <div className={styles.controls}>
          <button className={styles.controlBtn} onClick={() => handleZoom(1)} title="Zoom In">+</button>
          <button className={styles.controlBtn} onClick={() => handleZoom(-1)} title="Zoom Out">−</button>
          <button className={styles.controlBtn} onClick={handleReset} title="Reset View">⟲</button>
        </div>

        {/* SVG Map */}
        <div
          className={styles.mapWrapper}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            ref={svgRef}
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            className={styles.map}
            style={{
              transform: `scale(${transform.scale}) translate(${transform.x / transform.scale}px, ${transform.y / transform.scale}px)`,
              cursor: isPanning ? 'grabbing' : 'grab',
            }}
          >
            {/* Defs */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="stageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
              </linearGradient>
              <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(139,92,246,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>

            {/* Background */}
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="var(--bg-secondary)" rx="16" />
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#gridPattern)" rx="16" />

            {/* Map Border */}
            <rect
              x="2" y="2"
              width={MAP_WIDTH - 4} height={MAP_HEIGHT - 4}
              fill="none"
              stroke="var(--glass-border)"
              strokeWidth="2"
              rx="14"
            />

            {/* Pathways */}
            {/* Horizontal paths */}
            <rect x="40" y="200" width={MAP_WIDTH - 80} height="20" fill="rgba(139,92,246,0.05)" rx="4" />
            <rect x="40" y="305" width={MAP_WIDTH - 80} height="45" fill="rgba(139,92,246,0.04)" rx="4" />
            <rect x="40" y="440" width={MAP_WIDTH - 80} height="20" fill="rgba(139,92,246,0.05)" rx="4" />

            {/* Vertical paths */}
            <rect x="350" y="70" width="100" height={MAP_HEIGHT - 140} fill="rgba(139,92,246,0.03)" rx="4" />

            {/* Landmarks */}
            {landmarks.map((lm) => (
              <g key={lm.id}>
                {lm.type === 'stage' && (
                  <>
                    <rect
                      x={lm.x} y={lm.y}
                      width={lm.width} height={lm.height}
                      fill="url(#stageGrad)"
                      stroke="var(--accent-violet)"
                      strokeWidth="1.5"
                      rx="12"
                      strokeDasharray="6 3"
                    />
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 - 12}
                      textAnchor="middle" fill="var(--accent-violet)"
                      fontSize="24"
                    >
                      {lm.icon}
                    </text>
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 + 14}
                      textAnchor="middle" fill="var(--accent-violet)"
                      fontSize="13" fontFamily="Outfit" fontWeight="700"
                      letterSpacing="2"
                    >
                      MAIN STAGE
                    </text>
                  </>
                )}
                {lm.type === 'food-court' && (
                  <>
                    <rect
                      x={lm.x} y={lm.y}
                      width={lm.width} height={lm.height}
                      fill="rgba(244,114,182,0.08)"
                      stroke="rgba(244,114,182,0.3)"
                      strokeWidth="1"
                      rx="10"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 - 8}
                      textAnchor="middle" fill="rgba(244,114,182,0.7)"
                      fontSize="20"
                    >
                      {lm.icon}
                    </text>
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 + 16}
                      textAnchor="middle" fill="rgba(244,114,182,0.6)"
                      fontSize="10" fontFamily="Outfit" fontWeight="600"
                      letterSpacing="1.5"
                    >
                      FOOD COURT
                    </text>
                  </>
                )}
                {lm.type === 'entrance' && (
                  <>
                    <rect
                      x={lm.x} y={lm.y}
                      width={lm.width} height={lm.height}
                      fill="rgba(74,222,128,0.1)"
                      stroke="rgba(74,222,128,0.4)"
                      strokeWidth="1.5"
                      rx="8"
                    />
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 + 5}
                      textAnchor="middle" fill="rgba(74,222,128,0.8)"
                      fontSize="11" fontFamily="Outfit" fontWeight="700"
                      letterSpacing="3"
                    >
                      🚪 ENTRANCE
                    </text>
                  </>
                )}
                {lm.type === 'exit' && (
                  <>
                    <rect
                      x={lm.x} y={lm.y}
                      width={lm.width} height={lm.height}
                      fill="rgba(248,113,113,0.1)"
                      stroke="rgba(248,113,113,0.3)"
                      strokeWidth="1.5"
                      rx="8"
                    />
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 + 5}
                      textAnchor="middle" fill="rgba(248,113,113,0.7)"
                      fontSize="11" fontFamily="Outfit" fontWeight="700"
                      letterSpacing="3"
                    >
                      🚶 EXIT
                    </text>
                  </>
                )}
                {lm.type === 'restroom' && (
                  <>
                    <rect
                      x={lm.x} y={lm.y}
                      width={lm.width} height={lm.height}
                      fill="rgba(96,165,250,0.08)"
                      stroke="rgba(96,165,250,0.3)"
                      strokeWidth="1"
                      rx="8"
                    />
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 - 4}
                      textAnchor="middle" fontSize="16"
                    >
                      {lm.icon}
                    </text>
                    <text
                      x={lm.x + lm.width / 2} y={lm.y + lm.height / 2 + 14}
                      textAnchor="middle" fill="rgba(96,165,250,0.6)"
                      fontSize="8" fontFamily="Outfit" fontWeight="600"
                      letterSpacing="1"
                    >
                      RESTROOM
                    </text>
                  </>
                )}
              </g>
            ))}

            {/* Booths */}
            {booths.map((booth) => {
              const isFiltered = activeFilter !== 'all' && booth.category.id !== activeFilter;
              const isHovered = hoveredBooth === booth.id;
              return (
                <g
                  key={booth.id}
                  className={styles.booth}
                  onClick={() => handleBoothClick(booth)}
                  onMouseEnter={() => setHoveredBooth(booth.id)}
                  onMouseLeave={() => setHoveredBooth(null)}
                  style={{
                    opacity: isFiltered ? 0.15 : 1,
                    cursor: isFiltered ? 'default' : 'pointer',
                    transition: 'opacity 0.3s ease',
                  }}
                  filter={isHovered && !isFiltered ? 'url(#glow)' : undefined}
                >
                  {/* Booth background */}
                  <rect
                    x={booth.x} y={booth.y}
                    width={booth.width} height={booth.height}
                    fill={isHovered ? `${booth.category.color}30` : `${booth.category.color}15`}
                    stroke={booth.category.color}
                    strokeWidth={isHovered ? 2 : 1}
                    rx="8"
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  {/* Booth number */}
                  <text
                    x={booth.x + booth.width / 2}
                    y={booth.y + 20}
                    textAnchor="middle"
                    fill={booth.category.color}
                    fontSize="10"
                    fontFamily="Outfit"
                    fontWeight="700"
                    letterSpacing="1"
                  >
                    {booth.number}
                  </text>
                  {/* Booth category icon */}
                  <text
                    x={booth.x + booth.width / 2}
                    y={booth.y + 38}
                    textAnchor="middle"
                    fontSize="16"
                  >
                    {booth.category.icon}
                  </text>
                  {/* Booth name (truncated) */}
                  <text
                    x={booth.x + booth.width / 2}
                    y={booth.y + 56}
                    textAnchor="middle"
                    fill="var(--text-secondary)"
                    fontSize="7"
                    fontFamily="Inter"
                  >
                    {booth.name.length > 14 ? booth.name.slice(0, 13) + '…' : booth.name}
                  </text>
                </g>
              );
            })}

            {/* Hovered booth tooltip */}
            {hoveredBooth && (() => {
              const booth = booths.find((b) => b.id === hoveredBooth);
              if (!booth) return null;
              const tx = Math.min(booth.x + booth.width / 2, MAP_WIDTH - 100);
              const ty = booth.y - 12;
              return (
                <g>
                  <rect
                    x={tx - 70} y={ty - 24}
                    width="140" height="22"
                    fill="rgba(10,10,26,0.9)"
                    stroke={booth.category.color}
                    strokeWidth="1"
                    rx="6"
                  />
                  <text
                    x={tx} y={ty - 10}
                    textAnchor="middle"
                    fill="white"
                    fontSize="9"
                    fontFamily="Outfit"
                    fontWeight="500"
                  >
                    {booth.name} — Click for details
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <span className={styles.legendTitle}>Legend:</span>
          {Object.values(CATEGORIES).map((cat) => (
            <div key={cat.id} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: cat.color }} />
              <span>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booth Modal */}
      {selectedBooth && (
        <BoothModal booth={selectedBooth} onClose={() => setSelectedBooth(null)} />
      )}
    </section>
  );
}
