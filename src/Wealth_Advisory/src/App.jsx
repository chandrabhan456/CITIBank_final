import { useState } from "react";
import Login from "./views/Login";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./views";
import { useStateContext } from "./contexts/ContextProvider.jsx";
import { MainPage } from "./components";
import { ThemeProvider } from "./contexts/ThemeContext";
import FloatingChatWidget from './components/FloatingChatWidget';
import { ToastProvider } from './contexts/ToastContext';

function App() {
  localStorage.setItem("OpenAI_Configuration", true);
  localStorage.removeItem("login");
  const {
    mainPage,
    login1,
    setlogin1,
    collapsed,
    selectedRole,
  } = useStateContext();

  return (
    <div baseline="/wealthAdvisoryUI">
    <ToastProvider>
      <ThemeProvider>
        {!login1 ? (
          <Login />
        ) : (
          <div className="flex flex-col min-h-screen">
            {/* Navbar - Full Width at Top */}
            <div className="fixed top-0 left-0 w-full bg-[#2d325c] z-50 shadow-md custom-navbar">
              <Navbar />
            </div>

            {/* Sidebar & Content Container (Below Navbar) */}
            <div className="flex flex-row mt-12">
              {/* Main Content - Takes Remaining Space */}
              <div className="transition-all w-full overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/mainPage" element={<MainPage />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </ThemeProvider>
    </ToastProvider>
    </div>
  );
}

export default App;
