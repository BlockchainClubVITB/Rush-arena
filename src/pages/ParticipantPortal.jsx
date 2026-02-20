import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  User, Hash, Phone, Mail,
  Check, Save, Clock, Trophy,
  ChevronLeft, LayoutGrid, Star,
  ShieldCheck, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { participantService } from '../lib/participantService';

const ParticipantPortal = () => {
  const { hash_id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [participant, setParticipant] = useState(null);
  const [wins, setWins] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'idle' | 'success'

  useEffect(() => {
    async function fetchData() {
      const data = await participantService.getParticipant(hash_id);
      if (data) {
        setParticipant(data);
        // Initialize win states from participant fields
        setWins({
          event_1_win: data.event_1_win,
          event_2_win: data.event_2_win,
          event_3_win: data.event_3_win,
          event_4_win: data.event_4_win,
          event_5_win: data.event_5_win,
          event_6_win: data.event_6_win,
          event_7_win: data.event_7_win,
          event_8_win: data.event_8_win,
          event_9_win: data.event_9_win,
          bull_riding_win: data.bull_riding_win,
          body_zorbing_win: data.body_zorbing_win,
          speed_dating_win: data.speed_dating_win,
        });
      } else {
        navigate('/');
      }
      setLoading(false);
    }
    fetchData();
  }, [hash_id, navigate]);

  const toggleWin = (field) => {
    setWins(prev => ({ ...prev, [field]: !prev[field] }));
    setSaveStatus(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await participantService.updateWins(participant.hash_id, wins);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="center-loader">
      <Loader2 className="animate-spin" size={40} color="var(--primary)" />
    </div>
  );

  const miniEvents = [
    { field: 'event_1_win', label: 'Aim & Fire' },
    { field: 'event_2_win', label: 'Laser Maze' },
    { field: 'event_3_win', label: 'Memory Match' },
    { field: 'event_4_win', label: 'Silent Disco' },
    { field: 'event_5_win', label: 'VR Challenge' },
    { field: 'event_6_win', label: 'Escape Room' },
    { field: 'event_7_win', label: 'Robot War' },
    { field: 'event_8_win', label: 'Trivia Rush' },
    { field: 'event_9_win', label: 'Retro Gaming' },
  ];

  const mainEvents = [
    { field: 'bull_riding_win', label: 'Bull Riding' },
    { field: 'body_zorbing_win', label: 'Body Zorbing' },
    { field: 'speed_dating_win', label: 'Speed Dating' },
  ];

  return (
    <div className="portal">
      <header className="portal-header">
        <button className="back-link" onClick={() => navigate('/')}>
          <ChevronLeft size={20} />
          Volunteer Scanner
        </button>
        <div className="verified-badge">
          <ShieldCheck size={16} />
          <span>Verified Student Path</span>
        </div>
      </header>

      <section className="profile-summary glass-card">
        <div className="profile-icon">{participant.name[0]}</div>
        <div className="profile-info">
          <h2>{participant.name}</h2>
          <div className="info-grid">
            <span className="info-tag"><Hash size={12} /> {participant.reg_no}</span>
            <span className="info-tag"><Mail size={12} /> {participant.email}</span>
          </div>
        </div>
      </section>

      <div className="events-container">
        <div className="section-title">
          <LayoutGrid size={18} />
          <h3>Mini Games (9 Total)</h3>
        </div>
        <div className="game-grid">
          {miniEvents.map(game => (
            <div
              key={game.field}
              className={`checkbox-container ${wins[game.field] ? 'checked' : ''}`}
              onClick={() => toggleWin(game.field)}
            >
              <div className="custom-checkbox">
                {wins[game.field] && <Check size={16} />}
              </div>
              <span className="game-label">{game.label}</span>
            </div>
          ))}
        </div>

        <div className="section-title main-section">
          <Star size={18} />
          <h3>Main Events</h3>
        </div>
        <div className="main-games-stack">
          {mainEvents.map(game => (
            <div
              key={game.field}
              className={`main-game-row ${wins[game.field] ? 'checked' : ''}`}
              onClick={() => toggleWin(game.field)}
            >
              <div className="main-game-info">
                <span className="main-label">{game.label}</span>
                <span className="victory-badge">{wins[game.field] ? 'WINNER' : 'NOT PLAYED'}</span>
              </div>
              <div className="custom-checkbox large">
                {wins[game.field] ? <Check size={20} /> : <Clock size={20} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="submit-area">
        <button
          className={`btn btn-primary submit-btn ${saveStatus === 'success' ? 'btn-success' : ''}`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <><Loader2 className="animate-spin" size={18} /> Updating Supabase...</>
          ) : saveStatus === 'success' ? (
            <><Check size={18} /> Record Synchronized</>
          ) : (
            <><Save size={18} /> Submit Results</>
          )}
        </button>
      </div>

      <style jsx>{`
        .portal { max-width: 600px; margin: 0 auto; padding-bottom: env(safe-area-inset-bottom, 40px); }
        
        .portal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-dim);
          background: none;
          border: none;
          font-size: 14px;
          cursor: pointer;
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          color: var(--primary);
          background: var(--primary-glow);
          padding: 6px 12px;
          border-radius: 100px;
          text-transform: uppercase;
        }

        .profile-summary {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .profile-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--primary), #60a5fa);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 800;
          color: white;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        .profile-info h2 { font-size: 24px; line-height: 1.2; margin-bottom: 4px; }
        .info-grid { display: flex; flex-wrap: wrap; gap: 12px; }
        .info-tag { font-size: 12px; color: var(--text-dim); display: flex; align-items: center; gap: 6px; }

        .section-title {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          color: var(--text-dim);
        }

        .section-title h3 { font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; }
        .main-section { margin-top: 32px; }

        .game-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .game-label { font-size: 14px; font-weight: 500; }

        .main-games-stack { display: flex; flex-direction: column; gap: 12px; }

        .main-game-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: var(--card-alt);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition);
        }

        .main-game-row.checked { border-color: var(--primary); background: var(--primary-glow); }

        .main-game-info { display: flex; flex-direction: column; }
        .main-label { font-size: 18px; font-weight: 700; }
        .victory-badge { font-size: 10px; font-weight: 800; color: var(--text-muted); }
        .checked .victory-badge { color: var(--primary); }

        .custom-checkbox.large { width: 32px; height: 32px; border-radius: 8px; border-width: 2px; }
        .checked .custom-checkbox { background: var(--primary); border-color: var(--primary); }

        .submit-area {
          position: sticky;
          bottom: 24px;
          margin-top: 40px;
          padding: 16px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
        }

        .submit-btn { width: 100%; height: 56px; font-size: 16px; gap: 12px; }
        .btn-success { background: var(--success) !important; }

        .center-loader { height: 80vh; display: flex; items-center; justify-content: center; }

        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .game-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default ParticipantPortal;
