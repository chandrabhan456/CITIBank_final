import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, Login, Chatbot } from "./views";
import { useStateContext } from "./contexts/ContextProvider.jsx";
import { MainPage, CustomerView, Customer } from "./components";
import "./App.css";

function App() {
  const ctx = useStateContext();
  console.log('context:', ctx);

  const {
    login1,
    setChatbot,
    chatbot,
    selectedRole,
    mode
  } = ctx;

  return (
    <div className={mode === 'dark' ? 'dark' : ''} baseline="/citiBankUI">
      {!login1 ? (
        <Login />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="fixed right-8 bottom-4" style={{ zIndex: 1000 }}>
            <button type="button" onClick={() => setChatbot(true)}>
         
            </button>
          </div>

          <div className="fixed top-0 left-0 w-full bg-blue-400 dark:bg-navbar-bg-dark z-50 shadow-md">
            <Navbar />
          </div>

          <div className="flex flex-row mt-12">
            {chatbot && <Chatbot />}
            <div className="transition-all mt-8 w-full overflow-x-hidden">
              <Routes>
                {selectedRole === "employee" ? (
                  <>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/mainPage" element={<MainPage />} />
                    <Route path="/customerView" element={<CustomerView />} />
                  </>
                ) : (
                  <Route path="/" element={<Customer />} />
                )}
                <Route path="*" element={<MainPage />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
