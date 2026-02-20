import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, QrCode, Scan, Users, ShieldAlert, LogOut, Menu, X } from 'lucide-react';
import { mockDb } from '../lib/mockDb';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="layout-wrapper">
      {/* Sidebar for Desktop */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">RA</div>
          <div className="brand-name">Rush Arena</div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            <Scan size={18} />
            <span>Volunteer Portal</span>
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="brand-logo sm">RA</div>
        <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay glass-panel">
          <nav className="mobile-nav">
            <NavLink to="/" className="mobile-nav-item">Volunteer Portal</NavLink>
          </nav>
        </div>
      )}

      <main className="content-area">
        <div className="content-container">
          {children}
        </div>
      </main>

      <style jsx>{`
        .layout-wrapper {
          display: flex;
          min-height: 100vh;
        }

        .sidebar {
          width: 260px;
          background: #0b1120;
          border-right: 1px solid var(--border-light);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          z-index: 50;
        }

        .sidebar-brand {
          padding: 32px 24px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-logo {
          width: 32px;
          height: 32px;
          background: var(--brand-primary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
        }

        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: white;
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          color: var(--text-sub);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: white;
        }

        .nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: var(--brand-primary);
        }

        .sidebar-footer {
          padding: 24px 16px;
          border-top: 1px solid var(--border-light);
        }

        .logout-btn {
          width: 100%;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ef4444;
          font-size: 13px;
          font-weight: 600;
          border-radius: var(--radius-sm);
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .content-area {
          flex: 1;
          margin-left: 260px;
          background: var(--bg-base);
          min-height: 100vh;
        }

        .content-container {
          padding: 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .mobile-header {
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar {
            display: none;
          }
          
          .mobile-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 24px;
            background: #0b1120;
            border-bottom: 1px solid var(--border-light);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }

          .content-area {
            margin-left: 0;
            padding-top: 64px;
          }

          .content-container {
            padding: 24px;
          }

          .mobile-nav-overlay {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 90;
            padding: 40px 24px;
          }

          .mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .mobile-nav-item {
            font-size: 24px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            color: white;
            text-decoration: none;
          }

          .mobile-logout {
            margin-top: 20px;
            color: #ef4444;
            font-size: 20px;
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
