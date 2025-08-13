import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CitiBankUI from './Citi_Bank_UI/src/App.jsx';
import { ContextProvider as CitiBankContextProvider } from './Citi_Bank_UI/src/contexts/ContextProvider.jsx';

import WealthAdvisoryUI from './Wealth_Advisory/src/App.jsx';
import { ContextProvider as WealthAdvisoryContextProvider } from './Wealth_Advisory/src/contexts/ContextProvider.jsx';

import RootPage from './RootPage';  // Import the RootPage component

export default function App() {
  return (
    <Router>
      <div>
     
        <Routes>
          <Route path="/" element={<RootPage />} />  {/* Root route */}
          <Route
            path="/citiBankUI/*"  // Add the wildcard '*' here
            element={
              <CitiBankContextProvider>
                <CitiBankUI />
              </CitiBankContextProvider>
            }
          />
          <Route
            path="/wealthAdvisoryUI/*"  // Add the wildcard '*' here
            element={
              <WealthAdvisoryContextProvider>
                <WealthAdvisoryUI />
              </WealthAdvisoryContextProvider>
            }
          />
          <Route path="*" element={<h2>Page not found</h2>} />  {/* Catch-all route */}
        </Routes>
      </div>
    </Router>
  );
}
