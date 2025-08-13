import React, { useState,useEffect } from 'react';
import { useStateContext } from "../../../contexts/ContextProvider";

// Import your graph components
import Graph1 from './CustomerGraphs/Graph1';
import Graph2 from './CustomerGraphs/Graph2';
import Graph3 from './CustomerGraphs/Graph3';
import llmInsights from './CustomerGraphs/LLMInsights';
const Analytics = () => {
   const { selectedCustomerId,mode } = useStateContext();
  const [activeGraph, setActiveGraph] = useState(1);
  const [graph1Data, setGraph1Data] = useState(null);
   const [graph2Data, setGraph2Data] = useState(null);
  const [llmInsights,setLLMInsights] = useState(null)
   const [error, setError] = useState(null);
   const [graph3Data, setGraph3Data] = useState(null);
 
   useEffect(() => {
    
     const fetchGraph1Data = async () => {
       try {
         const response = await fetch(`http://127.0.0.1:5000/customer-spending-by-category?customer_id=${selectedCustomerId}`, {
           method: "GET",
         });
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
         const response = await fetch(`http://127.0.0.1:5000/customer-conversion-detail?customer_id=${selectedCustomerId}`, {
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
     const fetchGraph3Data = async () => {
       try {
         const response = await fetch(`http://127.0.0.1:5000/customer-campaign-revenue?customer_id=${selectedCustomerId}`, {
           method: "GET",
         });
         if (!response.ok) {
           throw new Error(
             `Failed to fetch recommendations: ${response.statusText}`
           );
         }
         const data = await response.json();
         setGraph3Data(data);
       } catch (err) {
         console.error("Error fetching recommendations:", err);
         setError("Recommendations: " + err.message);
         setGraph3Data(null);
       }
     };
     fetchGraph1Data();
      fetchGraph2Data();
      fetchGraph3Data();
   }, []);
  const renderGraph = () => {
  if(graph1Data&&graph3Data ){
    switch (activeGraph) {
      case 1:
        return <Graph1 data={graph1Data} mode={mode} />;
      case 2:
      return <Graph3 data={graph3Data} mode={mode} />;
    
      default:
        return  <Graph1 data={graph1Data} />;
    }
  }};
console.log('graph3Datais',graph2Data)
  return (
  <div 
  className={`w-[50%] rounded-lg shadow-lg border p-6 
  ${mode === "dark" ? "bg-[#1D2041] border-gray-700" : "bg-white border-gray-300"} ${mode === "dark" ? "bg-[#1D2041]" : "bg-white"}`} 
  style={{marginTop: '-30px'}}
>   
<div
  style={{
    display: 'flex',
    marginBottom: '0px',
    borderRadius: '6px',
    overflow: 'hidden',
    border: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
  }}
>
  <button
    onClick={() => setActiveGraph(1)}
    style={{
      flex: 1,
      border: 'none',
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
      padding: '10px 20px',
      cursor: 'pointer',
      outline: 'none',
      transition: 'background-color 0.3s, color 0.3s',
      borderRight: `1px solid ${mode === "dark" ? "#4f4f4f" : "#d1d5db"}`,
    }}
     className='text-sm'
  >
    Spendings By Category
  </button>
  <button
    onClick={() => setActiveGraph(2)}
    style={{
      flex: 1,
      border: 'none',
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
      padding: '10px 20px',
      cursor: 'pointer',
      outline: 'none',
      transition: 'background-color 0.3s, color 0.3s',
    }}
     className='text-sm'
  >
    Card Performance
  </button>
</div>



<div className='flex-col'>
  <div className='mt-2  flex justify-center items-center'>
    {renderGraph()}
  </div>
  <div className='mt-2'>
    <div className="p-5">
   
      {activeGraph === 1 ? (
        graph1Data ? (<>
         <div className="relative p-4  rounded-lg mb-4 bg-[#f1f7f9]"> 
  <div 
    className="absolute inset-0 rounded-lg"
   
  ></div>
  <h2 className="text-blue-400 text-xl font-bold mb-3"> 🤖 Gen AI Insights on chart</h2>
  <p>
 {graph1Data.llm_insight
  .split(/\.(?!\d|\s*\d)/) // Split on dots NOT followed by digits (with optional spaces)
  .filter(sentence => sentence.trim() !== '')
  .map((sentence, index) => (
    <span key={index}>
      💡
      {sentence.trim()}{sentence.trim() && !sentence.trim().endsWith('.') ? '.' : ''}
      {index < graph1Data.llm_insight.split(/\.(?!\d|\s*\d)/).filter(s => s.trim() !== '').length - 1 && <br />}
    </span>
  ))}

</p>

</div>
</>
        ) : (
          <p className='flex justify-center items-center'>Loading...</p>
        )
      ) : (
        graph2Data ? (<>
         <div className="relative p-4  rounded-lg mb-4 bg-[#f1f7f9]"> 
  <div 
    className="absolute inset-0 rounded-lg"
   
  ></div>
  <h2 className="text-blue-400 text-xl font-bold mb-3"> 🤖 Gen AI Insights on chart</h2>
   
{graph2Data.llm_insight
  .split(/\.(?!\d|\s*\d)/) // Split on dots NOT followed by digits (with optional spaces)
  .filter(sentence => sentence.trim() !== '')
  .map((sentence, index) => (
    <span key={index}>
      💡
      {sentence.trim()}{sentence.trim() && !sentence.trim().endsWith('.') ? '.' : ''}
      {index < graph1Data.llm_insight.split(/\.(?!\d|\s*\d)/).filter(s => s.trim() !== '').length - 1 && <br />}
    </span>
  ))}

</div>
</>
        ) : (
         <p className='flex justify-center items-center'>Loading...</p>
        )
      )}
    </div>
  </div>
</div>

    </div>
  );
};

export default Analytics;
