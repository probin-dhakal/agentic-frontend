import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from './store/appStore';

// Components
import SplashScreen from './components/SplashScreen';
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import Layout from './components/Layout/Layout';

import Home from "./pages/Home.jsx"
import VoiceInput from './pages/VoiceInput.jsx';
import CropHealth from './pages/CropHealth.jsx';
import MarketPrices from './pages/MarketPrices.jsx';
import CropCalendar from './pages/CropCalendar.jsx';
import GovernmentSchemes from './pages/GovernmentSchemes.jsx';
import PlaceholderScreen from './pages/PlaceholderScreen.jsx';
import CropSelection from './components/Onboarding/CropSelection.jsx';

function App() {
  const { loading, currentScreen, onboardingCompleted } = useAppStore();

  // Show splash screen while loading
  if (loading) {
    return <SplashScreen />;
  }

  // Show onboarding if not completed
  if (currentScreen === 'onboarding' || !onboardingCompleted) {
    return <OnboardingFlow />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="voice-input" element={<VoiceInput />} />
          <Route path="crop-health" element={<CropHealth />} />
          <Route path="market" element={<MarketPrices />} />
          <Route path="crop-calendar" element={<CropCalendar />} />
          <Route path="government-schemes" element={<GovernmentSchemes />} />
          <Route path="community" element={<PlaceholderScreen title="Community" />} />
          <Route path="profile" element={<PlaceholderScreen title="Profile" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          jsx
<Route path="/add-crops" element={<CropSelection />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;