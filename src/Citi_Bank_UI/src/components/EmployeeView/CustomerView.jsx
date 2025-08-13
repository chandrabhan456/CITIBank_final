import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Overview/Profile";
import Analytics from "./Overview/Analytics";
import Recommandation from "./Overview/Recommandation";
import { useStateContext } from "../../contexts/ContextProvider";

const CustomerView = () => {
  const { showSection, setShowSection, mode } = useStateContext();

  const [activeButton, setButton] = useState(1);
  const navigate = useNavigate();

  const handleButtonClick = () => {
      window.scrollTo(0, 0); // This ensures the page starts from the top
  navigate("/citiBankUI/mainPage")
  };
  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-page-bg-light dark:bg-page-bg-dark px-4 py-8">
        <div className="">
          <button
            className=" text-gray-600 dark:text-gray-200 mt-6 ml-10 hover:text-gray-500 bg-transparent py-2 px-4 focus:outline-none"
            onClick={() => handleButtonClick()} // Navigate back to the previous page
          >
            Back
          </button>

          {/* Your other component code here */}
        </div>
      <div className="flex flex-col items-center gap-6 mt-0">
  <div
    className="w-[50%] mx-auto"
    style={{
      display: "flex",
      marginBottom: "0px",
      marginTop: "0px",
    }}
  >
    <button
      onClick={() => setButton(1)}
      style={{
        flex: 1,
        border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
        backgroundColor:
          mode === "dark"
            ? activeButton === 1
              ? "#303456"
              : "#1d2041"
            : activeButton === 1
            ? "#2563EB" // Tailwind blue-400
            : "#F0F4F8",
        color:
          mode === "dark"
            ? "white"
            : activeButton === 1
            ? "#fff" // readable dark text
            : "black",
        fontWeight: activeButton === 1 ? "normal" : "normal",
        padding: "10px",
        cursor: "pointer",
        outline: "none",
        transition: "background-color 0.3s, color 0.3s",
      }}
       className='text-sm'
    >
      Customer Profile
    </button>
    <button
      onClick={() => setButton(2)}
      style={{
        flex: 1,
        border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
        backgroundColor:
          mode === "dark"
            ? activeButton === 2
              ? "#303456"
              : "#1d2041"
            : activeButton === 2
            ? "#2563EB"
            : "#F0F4F8",
        color:
          mode === "dark"
            ? "white"
            : activeButton === 2
            ? "#fff"
            : "black",
        fontWeight: activeButton === 2 ? "normal" : "normal",
        padding: "10px",
        cursor: "pointer",
        outline: "none",
        transition: "background-color 0.3s, color 0.3s",
      }}
       className='text-sm'
    >
      Analytics
    </button>
    <button
      onClick={() => setButton(3)}
      style={{
        flex: 1,
        border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
        backgroundColor:
          mode === "dark"
            ? activeButton === 3
              ? "#303456"
              : "#1d2041"
            : activeButton === 3
            ? "#2563EB"
            : "#F0F4F8",
        color:
          mode === "dark"
            ? "white"
            : activeButton === 3
            ? "#fff"
            : "black",
        fontWeight: activeButton === 3 ? "normal" : "normal",
        padding: "10px",
        cursor: "pointer",
        outline: "none",
        transition: "background-color 0.3s, color 0.3s",
      }}
       className='text-sm'
    >
      Recommendation Cards
    </button>
  </div>

  {/* Conditionally render sections below buttons */}
  <div className="w-full flex">
    {activeButton === 1 && (
      <div className="flex justify-center items-center w-full p-6  bg-page-bg-light dark:bg-page-bg-dark rounded-lg shadow-lg">
        <Profile />
      </div>
    )}
    {activeButton === 2 && (
      <div className="flex justify-center items-center w-full p-6  bg-page-bg-light dark:bg-page-bg-dark rounded-lg shadow-lg">
        <Analytics />
      </div>
    )}
    {activeButton === 3 && (
      <div className="flex justify-center items-center w-full p-6  bg-page-bg-light dark:bg-page-bg-dark rounded-lg shadow-lg">
        <Recommandation />
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default CustomerView;
