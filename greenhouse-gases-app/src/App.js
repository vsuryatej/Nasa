import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import GreenhouseGasDetail from './pages/GreenhouseGasDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gas/:name" element={<GreenhouseGasDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
