import React, { useState, useEffect } from "react";
import { TbZoomScan } from "react-icons/tb";
// Import your graph components
import Graph1 from "./Graphs/Graph1";
import Graph2 from "./Graphs/Graph2";
import Graph3 from "./Graphs/Graph3";
import Graph4 from "./Graphs/Graph4";
import LLMDetails from "./LLMDetails";

import { useStateContext } from "../../../contexts/ContextProvider";
import FullScreenModal from "./FullScreenModal";

// Simple SVG icons for up/down
const DownIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6" />
  </svg>
);
const UpIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeWidth="2" d="M18 15l-6-6-6 6" />
  </svg>
);
const GraphPage = () => {
  const [activeGraph, setActiveGraph] = useState(1);
  const { selectedCustomerId, mode } = useStateContext();
  const [graph1Data, setGraph1Data] = useState(null);
  const [graph2Data, setGraph2Data] = useState(null);
   const [activeSubGraph,setActiveSubGraph]= useState('graph3')
  const [error, setError] = useState(null);
  const [graph3Data, setGraph3Data] = useState(null);
  const [openGraph, setOpenGraph] = useState(true);
  const [openLLM, setOpenLLM] = useState(false);

  useEffect(() => {
    const fetchGraph1Data = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/spending-by-category`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio: ${response.statusText}`);
        }
        const data = await response.json();
        setGraph1Data(data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setError("Portfolio: " + err.message);
        setGraph1Data(null);
      }
    };

    const fetchGraph2Data = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/campaign-revenue`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch recommendations: ${response.statusText}`
          );
        }
        const data = await response.json();
        setGraph2Data(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
        setError("Recommendations: " + err.message);
        setGraph2Data(null);
      }
    };

    fetchGraph1Data();
    fetchGraph2Data();
  }, []);
  // First, add state for full-page modal
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleZoomClick = (e, graphType) => {
  e.stopPropagation(); // Prevent triggering the collapse/expand
  setIsFullScreen(true);
  setActiveSubGraph(graphType);
};


  const renderGraph = () => {
    if (graph1Data&&graph2Data) {
      switch (activeGraph) {
        case 1:
        return <Graph1 data={graph1Data.total_spending_by_category} mode={mode} />;

        case 2:
          return <Graph2 data={graph2Data} mode={mode} />;
       case 3:
  return (
    <div className="flex space-x-4 h-full">
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10">
          <TbZoomScan
            onClick={(e) => handleZoomClick(e, 'graph4')}
            className={`text-xl cursor-pointer ${
              mode === "dark"
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          />
        </div>
        <Graph4 />
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10">
          <TbZoomScan
            onClick={(e) => handleZoomClick(e, 'graph3')}
            className={`text-xl cursor-pointer ${
              mode === "dark"
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          />
        </div>
        <Graph3 />
      </div>
    </div>
  );

        default:
          return <Graph1 data={graph1Data.total_spending_by_category} />;
      }
    }
  };

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div
        className="bg-page-bg-light dark:bg-page-bg-dark"
        style={{ color: "white", padding: "20px", height: "100vh" }}
      >
        <div className="flex "></div>
        <div className="" style={{ display: "flex", marginTop: "0px" }}>
          <button
            onClick={() => setActiveGraph(1)}
            style={{
              flex: 1,
              border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
              backgroundColor:
                mode === "dark"
                  ? activeGraph === 1
                    ? "#303456"
                    : "#1d2041"
                  : activeGraph === 1
                  ? "#2563EB" // Tailwind blue-400
                  : "#F0F4F8",
              color:
                mode === "dark"
                  ? "white"
                  : activeGraph === 1
                  ? "#fff"
                  : "black",
              fontWeight: activeGraph === 1 ? "normal" : "normal",
              padding: "10px",
              cursor: "pointer",
              outline: "none",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className="text-sm"
          >
            Spendings By Category
          </button>
          <button
            onClick={() => setActiveGraph(2)}
            style={{
              flex: 1,
              border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
              backgroundColor:
                mode === "dark"
                  ? activeGraph === 2
                    ? "#303456"
                    : "#1d2041"
                  : activeGraph === 2
                  ? "#2563EB"
                  : "#F0F4F8",
              color:
                mode === "dark"
                  ? "white"
                  : activeGraph === 2
                  ? "#fff"
                  : "black",
              fontWeight: activeGraph === 2 ? "normal" : "normal",
              padding: "10px",
              cursor: "pointer",
              outline: "none",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className="text-sm"
          >
            Campaign Revenue
          </button>
          <button
            onClick={() => setActiveGraph(3)}
            style={{
              flex: 1,
              border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
              backgroundColor:
                mode === "dark"
                  ? activeGraph === 3
                    ? "#303456"
                    : "#1d2041"
                  : activeGraph === 3
                  ? "#2563EB"
                  : "#F0F4F8",
              color:
                mode === "dark"
                  ? "white"
                  : activeGraph === 3
                  ? "#fff"
                  : "black",
              fontWeight: activeGraph === 3 ? "normal" : "normal",
              padding: "10px",
              cursor: "pointer",
              outline: "none",
              transition: "background-color 0.3s, color 0.3s",
            }}
            className="text-sm"
          >
            Performance
          </button>
        </div>
       <div className={`flex flex-col gap-2 bg-white dark:bg-[#23244d] p-4 rounded-lg h-[600px] ${activeGraph === 3 ? '' : 'overflow-auto'}`}>
  {/* Graph Section */}
          <div className="border rounded-lg shadow-lg bg-white dark:bg-[#23244d] dark:border-[#4f4f4f]">
            <div
              className="flex justify-between items-center p-3 cursor-pointer"
              onClick={() => setOpenGraph((v) => !v)}
            >
              <div className="flex items-center gap-2">
                {openGraph ? <UpIcon /> : <DownIcon />}
              </div>

              {/* Zoom icon - only show when graph is open */}
              {openGraph && (
                <TbZoomScan
              onClick={(e) => handleZoomClick(e, 'graph')}
                  className={`text-xl ${
                    mode === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                />
              )}
            </div>

            {openGraph && (
              <div className="h-104" style={{ marginTop: "-50px" }}>
                {renderGraph()}
              </div>
            )}
          </div>

          {/* LLMDetails Section */}
          <div className="border rounded-lg shadow-lg bg-white dark:bg-[#23244d] dark:border-[#4f4f4f]">
            <div
              className="flex justify-between items-center p-3 cursor-pointer"
              onClick={() => setOpenLLM((v) => !v)}
            >
              {!openLLM  ? (
                <span
                  className={`font-semibold ${
                    mode === "dark" ? "text-gray-100" : "text-blue-500"
                  }`}
                >
                  🤖 Gen AI Insights on chart
                </span>
              ) : (
                <></>
              )}
              <p style={{ color: `${mode === "dark" ? "#ffffff" : "black"}` }}>
                {openLLM ? <UpIcon /> : <DownIcon />}
              </p>
            </div>
            {openLLM && (
              <div className="h-104  ">
              {activeGraph!=5 &&  <LLMDetails graphId={activeGraph} />}
              </div>
            )}
          </div>
        </div>

        {/* Full Screen Modal */}
       {activeGraph!=3 ? (<>
       <FullScreenModal
          isOpen={isFullScreen}
          onClose={() => setIsFullScreen(false)}
        >
          <div className="w-full h-full">
            {renderGraph()}
          {activeGraph!=4 && <LLMDetails graphId={activeGraph} />}
          </div>
        </FullScreenModal>
        </>):(<>
            <FullScreenModal
          isOpen={isFullScreen}
          onClose={() => setIsFullScreen(false)}
        >
          <div className="w-full h-full">

     {activeSubGraph === 'graph3' ? <Graph3 /> : <Graph4 />}
   {activeGraph!=4 && <LLMDetails graphId={activeGraph} />}
          </div>
        </FullScreenModal></>)}
      </div>
    </div>
  );
};

export default GraphPage;
