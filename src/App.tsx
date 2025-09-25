import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PromoterPage from './pages/PromoterPage';
import SuccessPage from './pages/SuccessPage';
import GameRules from './pages/GameRules';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/promoteur" element={<PromoterPage />} />
        <Route path="/ref/:refCode" element={<LandingPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/reglement" element={<GameRules />} />
        <Route path="/conditions-generales" element={<TermsConditions />} />
        <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
}

export default App;