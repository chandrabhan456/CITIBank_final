import React, { useState, useEffect } from "react";
import TableView from "./Overview/TableView";

import PersonaCards from "./Overview/PersonaCards"; // import the new component
import GraphPage from "./AnlyticsMainPage/GraphPage";
import Activity from "./CustomerActivity/CustomerActivity";
import { useStateContext } from "../../contexts/ContextProvider";

const DUMMY_DASHBOARD_DATA = [
  {
    value: "--",
    label: "Total Customers",
    change: "+25%",
    icon: "👥",
    changeColor: "#22c55e",
  },
  {
    value: "$--",
    label: "Total Portfolio Value (Last 12 Months)",
    change: "+18%",
    icon: "💰",
    changeColor: "#22c55e",
  },

  {
    value: "$--",
    label: "Average Monthly Transaction Value",
    change: "+15%",
    icon: "💳",
    changeColor: "#22c55e",
  },
     {
          value: "--",
          label: "Avg Spend per Customer (Last 12 Months)",
          icon: "📈",
          changeColor: "#22c55e",
        },
];

const personaData1 = [
  {
    label: "Frequent Traveler",
    value: "3,240",
    color: "#2196f3",
  },
  {
    label: "Cashback Maximizer",
    value: "2,891",
    color: "#22c55e",
  },
  {
    label: "College Student",
    value: "2,156",
    color: "#8b5cf6",
  },
  {
    label: "Business Owner",
    value: "1,876",
    color: "#f97316",
  },
  {
    label: "Premium Spender",
    value: "1,432",
    color: "#ef4444",
  },
];

function MainPage() {
  const {
    selectedCustomerId,
    showSection,
    setShowSection,
    recommendation,
    setRecommendations,
    mode,
    clickedCardIndex,
  } = useStateContext();

  const [showSection1, setShowSection1] = useState("button1");
  const [portfolio, setPortfolio] = useState(null);
  const [personaData, setPersonaData] = useState(null);
  const [activeButton, setButton] = useState(1);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(DUMMY_DASHBOARD_DATA);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/portfolio", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }
        const data = await response.json();
        setPortfolio(data);

        // Map API label to dashboard label
        const labelMapping = {
          "Total Customers": "Total Customers",
          "Total Portfolio Value (Last 12 Months)":
            "Total Portfolio Value (Last 12 Months)",
          "Average Monthly Transaction Value":
            "Average Monthly Transaction Value",
            "Avg Spend per Customer (Last 12 Months)":"Avg Spend per Customer (Last 12 Months)"
        };

        // Build a map from API response
        const apiDataMap = {};
        data.forEach((item) => {
          const mappedLabel = labelMapping[item.label];
          if (mappedLabel) apiDataMap[mappedLabel] = item.value;
        });

        // Update dashboard data using API values
        setDashboardData((prevData) =>
          prevData.map((item) => ({
            ...item,
            value: apiDataMap[item.label] || item.value,
          }))
        );
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Portfolio: " + err.message);
        setPortfolio(null);
      }
    };

    const fetchRecommendations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/recommendations", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch recommendations: ${response.statusText}`
          );
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Recommendations: " + err.message);
        setRecommendations(null);
      }
    };
    const personaCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/persona-count", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch recommendations: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPersonaData(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Recommendations: " + err.message);
        setPersonaData(null);
      }
    };
    fetchPortfolio();
    fetchRecommendations();
    personaCount();
  }, []);

  console.log("api responce", portfolio);
  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-page-bg-light dark:bg-page-bg-dark px-4 py-8">
        {/* KPI Cards */}
   <div className="flex flex-wrap gap-6 justify-center">
  {dashboardData.map((card, idx) => (
    <div
      key={idx}
      className="rounded-[10px] shadow-lg flex items-center justify-between px-6 py-5 w-full sm:w-[calc(50%-12px)] xl:w-[calc(25%-18px)]"
      style={{
        background:
          mode === "dark"
            ? "linear-gradient(106deg, #352F6E 0%, #594EBC 100%)"
            : "white",
        maxWidth: 400,
        height: 132,
        minWidth: 200,
        color: "#fff",
      }}
    >
      {/* Rest of your content remains the same */}
      <div className="flex items-center justify-center mr-6 h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-2xl shadow-lg">
        {card.icon}
      </div>
      <div className="flex flex-col justify-center flex-1 items-end text-right">
        <div className="text-gray-900 text-sm font-semibold mb-2 uppercase tracking-wide dark:text-[#e0e5fa]">
          {card.label}
        </div>
        <div className="text-black dark:text-[#e0e5fa] text-[1.35rem] font-extrabold">
          {card.value}
        </div>
      </div>
    </div>
  ))}
</div>

        <div
          className=" bg-page-bg-light dark:bg-page-bg-dark"
          style={{
            color: "white",
            padding: "20px",
            minHeight: "100vh",
          }}
        >
          <div
            className="w-[100%] mx-auto"
            style={{ display: "flex", marginBottom: "0px", marginTop: 16 }}
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
                    ? "#2563EB" // Tailwind blue-400 for active
                    : "#F0F4F8",
                color:
                  mode === "dark"
                    ? "white"
                    : activeButton === 1
                    ? "#fff" // dark text for contrast
                    : "black",
                fontWeight: activeButton === 1 ? "normal" : "normal",
                padding: "10px",
                cursor: "pointer",
                outline: "none",
                transition: "background-color 0.3s, color 0.3s",
              }}
               className='text-sm'
            >
              Customer Persona Distribution
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
              Customer Activity
            </button>
          </div>

          <div className="w-[100%] mx-auto mt-2  bg-page-bg-light dark:bg-page-bg-dark border dark:border-gray-700 border-gray-300 shadow-lg rounded-xl">
            {activeButton === 1 && (
              <>
                {personaData && personaData.length > 0 && (
                  <PersonaCards data={personaData} />
                )}

                {clickedCardIndex != null && (
                  <TableView data={recommendation} />
                )}
              </>
            )}
            {activeButton === 2 && <GraphPage />}
            {activeButton === 3 && <Activity />}
          </div>
        </div>
        {/* Persona Distribution */}
      </div>
    </div>
  );
}

export default MainPage;
