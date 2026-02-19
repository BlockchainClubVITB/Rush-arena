import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Hash, Save, CheckCircle, Trophy, Clock, ChevronLeft, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDb } from '../lib/mockDb';

const ParticipantPortal = () => {
  const { hash_id } = useParams();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState(null);
  const [events, setEvents] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'idle' | 'saving' | 'success'

  useEffect(() => {
    const data = mockDb.getParticipantByIdentifier(hash_id);
    if (data) {
      setParticipant(data);
      setEvents(data.events);
    } else {
      navigate('/');
    }
  }, [hash_id, navigate]);

  const toggleEvent = (eventId) => {
    setEvents(prev => ({ ...prev, [eventId]: !prev[eventId] }));
    setSaveStatus('idle');
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveStatus('saving');

    // Simulate Supabase update
    setTimeout(() => {
      mockDb.updateParticipantEvents(participant.hash_id, events);
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  if (!participant) return null;

  const miniEvents = [
    { id: 'event_1_win', name: 'Aim & Fire' },
    { id: 'event_2_win', name: 'Laser Maze' },
    { id: 'event_3_win', name: 'Memory Match' },
    { id: 'event_4_win', name: 'Silent Disco' },
    { id: 'event_5_win', name: 'VR Challenge' },
    { id: 'event_6_win', name: 'Escape Room' },
    { id: 'event_7_win', name: 'Robot War' },
    { id: 'event_8_win', name: 'Trivia Rush' },
    { id: 'event_9_win', name: 'Retro Gaming' },
  ];

  const mainEvents = [
    { id: 'event_10_win', name: 'Bull Riding', desc: 'Mechanical balance challenge' },
    { id: 'event_11_win', name: 'Body Zorbing', desc: 'Full-contact inflatable arena' },
    { id: 'event_12_win', name: 'Speed Dating', desc: 'Social networking event' },
  ];

  const stats = {
    total: Object.values(events).filter(Boolean).length,
    main: [events.event_10_win, events.event_11_win, events.event_12_win].filter(Boolean).length
  };

  return (
    <div className="portal-page">
      <nav className="portal-nav">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={18} />
          Volunteer Scanner
        </button>
        <div className="portal-id">
          <ShieldCheck size={16} />
          <span>Verified ID: {participant.hash_id}</span>
        </div>
      </nav>

      <div className="grid-layout">
        <aside className="profile-column">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel profile-card">
            <div className="user-icon-lg">{participant.name[0]}</div>
            <h3>{participant.name}</h3>
            <p className="reg-no">{participant.reg_no}</p>

            <div className="contact-info">
              <div className="info-item"><Phone size={14} /> {participant.mobile}</div>
              <div className="info-item"><Mail size={14} /> {participant.email}</div>
            </div>

            <div className="score-summary">
              <div className="score-box">
                <span className="sc-val">{stats.total}</span>
                <span className="sc-lbl">Total Events</span>
              </div>
              <div className="score-box highlight">
                <span className="sc-val">{stats.main}</span>
                <span className="sc-lbl">Main Wins</span>
              </div>
            </div>
          </motion.div>
        </aside>

        <main className="events-column">
          <section className="event-section">
            <div className="section-header">
              <Zap size={18} />
              <h4>Mini Events (9)</h4>
            </div>
            <div className="mini-events-list">
              {miniEvents.map(event => (
                <div
                  key={event.id}
                  className={`mini-row ${events[event.id] ? 'active' : ''}`}
                  onClick={() => toggleEvent(event.id)}
                >
                  <div className="check-box">
                    {events[event.id] && <CheckCircle size={14} />}
                  </div>
                  <span>{event.name}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="event-section">
            <div className="section-header">
              <Trophy size={18} />
              <h4>Main Events (3)</h4>
            </div>
            <div className="main-events-stack">
              {mainEvents.map(event => (
                <div
                  key={event.id}
                  className={`main-card ${events[event.id] ? 'active' : ''}`}
                  onClick={() => toggleEvent(event.id)}
                >
                  <div className="mc-left">
                    <div className="mc-badge">FEATURED</div>
                    <h5>{event.name}</h5>
                    <p>{event.desc}</p>
                  </div>
                  <div className="mc-check">
                    {events[event.id] ? <CheckCircle size={24} color="#10b981" /> : <Clock size={24} color="#64748b" />}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="floating-save">
            <button
              className={`btn btn-primary save-action ${saveStatus === 'success' ? 'success' : ''}`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Updating Database...' : saveStatus === 'success' ? 'Records Synchronized' : 'Save Participation'}
              {saveStatus === 'success' && <CheckCircle size={18} />}
            </button>
          </div>
        </main>
      </div>

      <style jsx>{`
        .portal-page {
          max-width: 1000px;
          margin: 0 auto;
        }

        .portal-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-sub);
          font-size: 14px;
        }

        .portal-id {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid var(--border-focus);
          border-radius: 20px;
          color: var(--brand-primary);
          font-family: monospace;
          font-size: 13px;
          font-weight: 600;
        }

        .grid-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 40px;
        }

        .profile-card {
          padding: 32px;
          border-radius: var(--radius-lg);
          text-align: center;
          position: sticky;
          top: 32px;
        }

        .user-icon-lg {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, var(--brand-primary), #818cf8);
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          color: white;
          box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
        }

        .profile-card h3 { font-size: 22px; margin-bottom: 4px; }
        .reg-no { color: var(--text-sub); font-size: 14px; margin-bottom: 24px; }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 20px 0;
          border-top: 1px solid var(--border-light);
          margin-bottom: 24px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .score-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .score-box {
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }

        .score-box.highlight { background: rgba(16, 185, 129, 0.05); }
        .sc-val { font-size: 24px; font-weight: 700; color: white; }
        .sc-lbl { font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.1em; }

        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--text-sub);
        }

        .section-header h4 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; }

        .event-section { margin-bottom: 40px; }

        .mini-events-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .mini-row {
          padding: 14px 18px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mini-row:hover { background: rgba(255,255,255,0.05); }
        .mini-row.active { border-color: var(--brand-secondary); background: rgba(16, 185, 129, 0.05); }

        .check-box {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-light);
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--brand-secondary);
        }

        .active .check-box { border-color: var(--brand-secondary); }

        .main-events-stack { display: flex; flex-direction: column; gap: 16px; }

        .main-card {
          padding: 24px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .main-card:hover { transform: translateX(4px); background: rgba(255,255,255,0.04); }
        .main-card.active { border-color: var(--brand-primary); background: rgba(99, 102, 241, 0.05); }

        .mc-badge {
          font-size: 9px;
          font-weight: 800;
          color: var(--brand-primary);
          letter-spacing: 0.1em;
          margin-bottom: 6px;
        }

        .main-card h5 { font-size: 18px; margin-bottom: 4px; }
        .main-card p { font-size: 13px; color: var(--text-muted); }

        .floating-save {
          position: sticky;
          bottom: 24px;
          padding-top: 24px;
          background: linear-gradient(transparent, var(--bg-base) 20%);
        }

        .save-action { width: 100%; height: 56px; font-size: 16px; }
        .save-action.success { background: var(--brand-secondary); }

        @media (max-width: 1024px) {
          .grid-layout { grid-template-columns: 1fr; }
          .profile-card { position: static; }
          .mini-events-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ParticipantPortal;
