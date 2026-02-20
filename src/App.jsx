import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Scanner from './pages/Scanner';
import ParticipantPortal from './pages/ParticipantPortal';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Scanner />} />
        <Route path="/portal/:hash_id" element={<ParticipantPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
