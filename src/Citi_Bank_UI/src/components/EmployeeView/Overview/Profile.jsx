// CustomerRecommendation.jsx

import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { almostWhole } from "chart.js/helpers";
// Dummy data for 20 customers
const customers = Array.from({ length: 20 }, (_, index) => ({
  id: `CUST${String(index + 1).padStart(3, "0")}`,
  name: `Customer ${index + 1}`,
  spend: `$${(Math.random() * 20000).toFixed(2)}`,
  category: ["Travel", "Dining", "Entertainment", "Retail", "Fuel", "Wellness"][
    index % 6
  ],
  credit_score: Math.floor(Math.random() * (800 - 600 + 1)) + 600,
  age: Math.floor(Math.random() * (65 - 18 + 1)) + 18,
  income: `$${(Math.random() * 100000).toFixed(2)}`,
  last_transaction: new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  )
    .toISOString()
    .split("T")[0],
  channel: ["Online", "Mobile", "In-Store"][index % 3],
  persona: ["Health Conscious", "Budget Shopper", "Luxury Seeker"][index % 3],
}));

const Profile = () => {
  const { selectedCustomerId, recommendation, mode,selectedCustomerRecommendation, setSelectedCustomerRecommendations} = useStateContext();
  // Find the selected customer based on the ID
 function getSelectedCustomer(data, id) {
  if (id == null) { // checks for both null and undefined
    return null;
  }

  const trimmedId = id.trim();

  return Array.isArray(data)
    ? data.find((item) => item.id.trim() === trimmedId)
    : data && data.id.trim() === trimmedId
    ? data
    : null;
}



// Usage:
console.log("recommandartion",recommendation)

const selectedCustomer = getSelectedCustomer(recommendation, selectedCustomerId);
setSelectedCustomerRecommendations(selectedCustomer)
if (!selectedCustomer) {
  return <div>No customer found with ID {selectedCustomerId}</div>;
}

  // UI for displaying customer details
  return (
 <div className={`w-[50%] p-8 rounded-xl shadow-lg border  max-w-2xl mx-auto


  ${mode === "dark" ? "bg-[#1D2041] border-gray-700" : "bg-white border-gray-300"}
`} style={{marginTop:'-25px'}}>
  {/* Header with avatar and name */}
  <div className="flex items-center space-x-1 mb-6">
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-3xl font-bold">
      {selectedCustomer.name?.[0] || "?"}
    </div>
    <div>
      <div className={`text-2xl font-bold ${mode === "dark" ? "text-purple-300" : "text-purple-800"}`}>
        {selectedCustomer.name}
      </div>
      <div className={`text-sm ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>
        Customer ID: {selectedCustomerId}
      </div>
      <div className={`mt-1 px-2 py-0.5 rounded bg-blue-100 text-xs font-semibold 
        ${mode === "dark" ? " bg-green-100 text-green-700" : " bg-green-100 text-green-700"}
      `}>
         {selectedCustomer.persona}
      </div>
    </div>
  </div>

  {/* Profile details */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
    {/* Left-aligned column */}
    <div className="text-left">
      <div className="mb-2">
        <span className="block font-semibold text-blue-600 dark:text-blue-400">Annual Spend</span>
        <span className={mode === "dark" ? "text-white" : "text-gray-800"}>${selectedCustomer.annual_spend}</span>
      </div>
      <div className="mb-2">
        <span className="block font-semibold text-blue-600 dark:text-blue-400">Life Event</span>
        <span className={mode === "dark" ? "text-white" : "text-gray-800"}>{selectedCustomer.life_event}</span>
      </div>
        <div className="mb-2">
        <span className="block font-semibold text-blue-600 dark:text-blue-400">Age</span>
        <span className={mode === "dark" ? "text-white" : "text-gray-800"}>{selectedCustomer.age}</span>
      </div>
    
    </div>
    {/* Right-aligned column */}
    <div className="text-right">
      <div className="mb-2">
        <span className="block font-semibold text-blue-600 dark:text-blue-400">Credit Score</span>
        <span className={mode === "dark" ? "text-white" : "text-gray-800"}>{selectedCustomer.credit_score}</span>
      </div>
      <div className="mb-2">
        <span className="block font-semibold text-blue-600 dark:text-blue-400">Annual Income</span>
        <span className={mode === "dark" ? "text-white" : "text-gray-800"}>${selectedCustomer.annual_income}</span>
      </div>
        <div className="mb-2">
        <span className="block font-semibold text-blue-600 dark:text-blue-400">Last Transaction</span>
        <span className={mode === "dark" ? "text-white" : "text-gray-800"}>{selectedCustomer.last_transaction}</span>
      </div>
    
    </div>
  </div>
</div>



  );
};

export default Profile;
