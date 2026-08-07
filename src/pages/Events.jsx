import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import { eventsData } from '../lib/events'
import eventSpecificData from '../lib/eventSpecificData.json'
import { FaCalendarAlt, FaTrophy, FaLightbulb, FaCheckCircle, FaInfoCircle, FaTools } from 'react-icons/fa'
import './Events.css'

const sectionStyles = [
  {
    gradient: 'linear-gradient(135deg, #3b82f6, #0ea5e9)',
    color: '#0ea5e9',
    icon: <FaInfoCircle size={24} />
  },
  {
    gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    color: '#6366f1',
    icon: <FaCalendarAlt size={24} />
  },
  {
    gradient: 'linear-gradient(135deg, #34d399, #10b981)',
    color: '#10b981',
    icon: <FaTrophy size={24} />
  },
  {
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    color: '#f59e0b',
    icon: <FaLightbulb size={24} />
  },
  {
    gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    color: '#e11d48',
    icon: <FaTools size={24} />
  }
]

const getExternalLink = (url) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [viewingProblems, setViewingProblems] = useState(false)

  return (
    <PageTransition className="page events-page">
      <div className="events-container">
        <AnimatePresence mode="wait">
          {!selectedEvent ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="events-grid"
            >
              <h1 className="events-title">
                Our <span className="cs-gradient">Events</span>
              </h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {eventsData.map((event) => (
                  <motion.div
                    layoutId={`card-container-${event.id}`}
                    key={event.id}
                    className="event-card-preview"
                    onClick={() => { setSelectedEvent(event); setViewingProblems(false); }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div layoutId={`card-header-${event.id}`} className="event-header-info">
                      <span className="event-type">{event.type}</span>
                      <span className="event-status">{event.status}</span>
                    </motion.div>
                    <motion.img 
                      layoutId={`card-image-${event.id}`} 
                      src={event.image} 
                      alt={event.title} 
                      className="event-img" 
                    />
                    <motion.h2 layoutId={`card-title-${event.id}`} className="event-preview-title">
                      {event.title}
                    </motion.h2>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="event-detail-view"
            >
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="back-btn"
                onClick={() => {
                  if (viewingProblems) setViewingProblems(false);
                  else setSelectedEvent(null);
                }}
              >
                &larr; {viewingProblems ? "Back to Details" : "Back to Events"}
              </motion.button>

              <div className="event-detail-layout">
                {/* Left side: Card */}
                <motion.div layoutId={`card-container-${selectedEvent.id}`} className="event-left-card">
                  <motion.div layoutId={`card-header-${selectedEvent.id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span className="card-type">{selectedEvent.type}</span>
                    <span className="card-status" style={{ marginBottom: '2rem', marginTop: '0.5rem' }}>{selectedEvent.status}</span>
                  </motion.div>
                  <motion.img
                    layoutId={`card-image-${selectedEvent.id}`}
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="card-img"
                  />
                  <motion.h2 layoutId={`card-title-${selectedEvent.id}`} className="card-title">
                    {selectedEvent.title}
                  </motion.h2>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="card-footer"
                  >
                    {selectedEvent.endDate && new Date() < new Date(selectedEvent.endDate) ? (
                      <a href={getExternalLink(selectedEvent.registrationLink)} className="register-glow-btn" target="_blank" rel="noopener noreferrer">
                        REGISTER NOW
                      </a>
                    ) : (
                      <span>{selectedEvent.footerText}</span>
                    )}
                  </motion.div>
                </motion.div>

                {/* Right side: Details */}
                <div className="event-right-details">
                  <AnimatePresence mode="wait">
                    {viewingProblems ? (
                      <motion.div
                        key="problems-view"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}
                      >
                        <h2 style={{ color: '#fff', fontSize: '2rem', marginBottom: '1rem', fontWeight: 800 }}>
                          Problem Statements
                        </h2>
                        {eventSpecificData[selectedEvent.id]?.map((point, i) => {
                          const splitIndex = point.text.indexOf(':');
                          const hasBoldPrefix = splitIndex !== -1;
                          
                          return (
                            <div className="problem-statement-card" key={i} style={{
                              background: '#fdfdfd',
                              borderLeft: '4px solid #f59e0b',
                              padding: '1.5rem',
                              borderRadius: '12px',
                              boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                            }}>
                              <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: '#334155', fontWeight: 500 }}>
                                {hasBoldPrefix ? (
                                  <>
                                    <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.4rem', fontSize: '1.1rem' }}>
                                      {point.text.substring(0, splitIndex + 1)}
                                    </strong>
                                    {point.text.substring(splitIndex + 1)}
                                  </>
                                ) : (
                                  point.text
                                )}
                              </p>
                              {point.url && (
                                <a href={getExternalLink(point.url.link)} target="_blank" rel="noopener noreferrer" className="register-glow-btn" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                                  {point.url.name} &rarr;
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="details-view"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}
                      >
                        {selectedEvent.details.map((detail, idx) => {
                          const style = sectionStyles[idx % sectionStyles.length];
                          return (
                          <motion.div
                            key={idx}
                            className="new-detail-card"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                          >
                            <div className="ndc-left-flap" style={{ background: style.gradient }}>
                              <div className="ndc-icon-box" style={{ color: style.color }}>
                                {style.icon}
                              </div>
                            </div>
                            
                            <div className="ndc-right-content">
                              <div className="ndc-dots" />
                              <div className="ndc-watermark" style={{ color: style.color }}>
                                0{idx + 1}
                              </div>

                              <div className="ndc-header">
                                <div className="ndc-tag" style={{ color: style.color }}>
                                  <span className="ndc-tag-dot" style={{ backgroundColor: style.color }}></span>
                                  {detail.tag}
                                </div>
                                <h3 className="ndc-title">{detail.sectionTitle}</h3>
                                <div className="ndc-divider" style={{ backgroundColor: style.color }}></div>
                              </div>

                              <div className="ndc-list">
                                {detail.content.map((item, i) => {
                                  const splitIndex = item.indexOf(':');
                                  const hasBoldPrefix = detail.tag === 'CHALLENGES' && splitIndex !== -1;
                                  
                                  return (
                                  <div className="ndc-list-item" key={`orig-${i}`}>
                                    <div className="ndc-bullet-icon" style={{ color: style.color }}>
                                      {detail.tag === 'PRIZE' ? <FaCheckCircle size={14} /> : (detail.tag === 'PRESENTATION' ? <FaCalendarAlt size={14} /> : (detail.tag === 'INFO' ? <FaInfoCircle size={14} /> : (detail.tag === 'TOOLS' ? <FaTools size={14} /> : <span className="ndc-simple-dot" style={{ backgroundColor: style.color }}></span>)))}
                                    </div>
                                    <div>
                                      <p>
                                        {hasBoldPrefix ? (
                                          <>
                                            <strong>{item.substring(0, splitIndex + 1)}</strong>
                                            {item.substring(splitIndex + 1)}
                                          </>
                                        ) : (
                                          item
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  )
                                })}
                              </div>
                              
                              {detail.tag === 'CHALLENGES' && detail.documentLink && eventSpecificData[selectedEvent.id] && (
                                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
                                  <button 
                                    onClick={() => setViewingProblems(true)}
                                    className="register-glow-btn" 
                                    style={{ 
                                      padding: '0.5rem 1.2rem', 
                                      fontSize: '0.85rem', 
                                      background: style.color, 
                                      boxShadow: `0 0 10px ${style.color}80`,
                                      border: 'none',
                                      cursor: 'pointer',
                                      color: '#fff'
                                    }}
                                  >
                                    View Problem Statements &rarr;
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )})}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
