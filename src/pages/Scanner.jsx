import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Scan, Info, ChevronRight, Camera, Search, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockDb } from '../lib/mockDb';

const Scanner = () => {
  const navigate = useNavigate();
  const [permissionError, setPermissionError] = useState(false);
  const [manualId, setManualId] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 20,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      showTorchButtonIfSupported: true,
    });

    scanner.render(
      (text) => {
        scanner.clear();
        handleLookup(text);
      },
      (err) => {
        if (err?.includes("NotAllowedError")) {
          setPermissionError(true);
        }
      }
    );

    return () => {
      scanner.clear().catch(e => console.warn("Scanner cleanup warning:", e));
    };
  }, [navigate]);

  const handleLookup = (identifier) => {
    const participant = mockDb.getParticipantByIdentifier(identifier);
    if (participant) {
      navigate(`/portal/${participant.hash_id}`);
    } else {
      setSearchError(`No participant found for "${identifier}"`);
      setTimeout(() => setSearchError(''), 3000);
    }
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (manualId.trim()) {
      handleLookup(manualId.trim());
    }
  };

  return (
    <div className="scanner-page">
      <header className="page-header">
        <h1 className="font-heading">Volunteer Portal</h1>
        <p className="subtitle">Official QR & ID Scanning System</p>
      </header>

      <div className="scanner-layout">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel scanner-wrapper"
        >
          <div className="scanner-header">
            <div className="status-badge">
              <span className="dot pulse"></span>
              Live Scanner
            </div>
            <div className="header-label">Center QR Component</div>
          </div>

          <div className="scanner-body">
            <div id="reader"></div>

            {permissionError && (
              <div className="error-overlay">
                <Camera size={40} />
                <h3>Camera Required</h3>
                <p>Enable camera access to scan QR codes.</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>Enable Camera</button>
              </div>
            )}

            <div className="scanner-frame">
              <div className="frame-corner tl"></div>
              <div className="frame-corner tr"></div>
              <div className="frame-corner bl"></div>
              <div className="frame-corner br"></div>
              <div className="scan-bar"></div>
            </div>
          </div>

          <div className="scanner-footer">
            <p><Info size={14} /> Hold QR steady within the frame</p>
          </div>
        </motion.div>

        <div className="manual-lookup-section">
          <div className="divider">
            <span>OR SEARCH MANUALLY</span>
          </div>

          <form onSubmit={handleManualSearch} className="lookup-box glass-card">
            <div className="input-with-icon">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Registration Number or QR Hash..."
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn btn-primary search-btn">
              Find Student
              <ChevronRight size={18} />
            </button>
          </form>

          <AnimatePresence>
            {searchError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="search-error"
              >
                <AlertCircle size={14} />
                <span>{searchError}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .scanner-page {
          max-width: 540px;
          margin: 0 auto;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .page-header h1 {
          font-size: 36px;
          background: linear-gradient(135deg, white 0%, #94a3b8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .subtitle {
          color: var(--text-sub);
          font-size: 15px;
          letter-spacing: 0.02em;
        }

        .scanner-wrapper {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        .scanner-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.01);
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          color: var(--brand-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dot { width: 8px; height: 8px; background: var(--brand-secondary); border-radius: 50%; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }

        .header-label { font-size: 12px; color: var(--text-muted); font-weight: 600; }

        .scanner-body {
          position: relative;
          background: #000;
          aspect-ratio: 1;
        }

        #reader { width: 100% !important; border: none !important; }
        #reader video { object-fit: cover !important; }

        .scanner-frame {
          position: absolute;
          inset: 40px;
          pointer-events: none;
          z-index: 5;
        }

        .frame-corner {
          position: absolute;
          width: 32px;
          height: 32px;
          border: 4px solid var(--brand-primary);
        }

        .tl { top: 0; left: 0; border-right: 0; border-bottom: 0; border-radius: 16px 0 0 0; }
        .tr { top: 0; right: 0; border-left: 0; border-bottom: 0; border-radius: 0 16px 0 0; }
        .bl { bottom: 0; left: 0; border-right: 0; border-top: 0; border-radius: 0 0 0 16px; }
        .br { bottom: 0; right: 0; border-left: 0; border-top: 0; border-radius: 0 0 16px 0; }

        .scan-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--brand-primary), transparent);
          box-shadow: 0 0 15px var(--brand-primary);
          animation: scan 3s ease-in-out infinite;
        }

        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }

        .error-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          z-index: 10;
        }

        .error-overlay h3 { margin: 20px 0 8px; font-size: 20px; }
        .error-overlay p { color: var(--text-sub); margin-bottom: 24px; font-size: 14px; }

        .scanner-footer {
          padding: 16px 24px;
          background: rgba(0,0,0,0.2);
          text-align: center;
        }

        .scanner-footer p {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .manual-lookup-section {
          margin-top: 32px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: var(--border-light);
        }

        .divider span {
          font-size: 11px;
          font-weight: 800;
          color: var(--text-muted);
          letter-spacing: 0.15em;
        }

        .lookup-box {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-radius: var(--radius-lg);
        }

        .input-with-icon {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .lookup-box input {
          padding-left: 44px;
          height: 52px;
          font-size: 14px;
        }

        .search-btn {
          height: 52px;
          font-size: 15px;
          display: flex;
          width: 100%;
        }

        .search-error {
          margin-top: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ef4444;
          font-size: 13px;
          font-weight: 500;
          justify-content: center;
          background: rgba(239, 68, 68, 0.05);
          padding: 10px;
          border-radius: var(--radius-sm);
        }

        @media (max-width: 480px) {
          .scanner-page { padding-bottom: 40px; }
          .scanner-body { border-radius: 0; }
          .scanner-frame { inset: 30px; }
          .page-header h1 { font-size: 30px; }
        }
      `}</style>
    </div>
  );
};

export default Scanner;
