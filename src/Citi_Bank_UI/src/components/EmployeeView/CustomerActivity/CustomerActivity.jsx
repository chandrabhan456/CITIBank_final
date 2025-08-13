import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import ActivityRow from "./ActivityRow";
const CustomerActivity = () => {
  const { recommendation, selectedCustomerId, setSelectedCustomerId, mode } =
    useStateContext();

  const [filterType, setFilterType] = useState("id");
  const [filterValue, setFilterValue] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Event handler to capture the customerID when a row is clicked
  const handleRowClick = (customerID) => {
   console.log("Customer ID:", customerID);
  setSelectedCustomerId(customerID);
  window.scrollTo(0, 0); // This ensures the page starts from the top
  navigate('/citiBankUI/customerView');
    // You can add more logic here, such as navigating to a customer detail page or updating state
  };
  // Helper function to generate random status and time
  const getRandomStatus = () => {
    const statuses = [
      { status: "Sent", color: "text-blue-500", time: "2 min ago" },
      { status: "Interested", color: "text-green-500", time: "15 min ago" },
      { status: "Rejected", color: "text-red-500", time: "1 hour ago" },
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };
  const transformToActivities = async (dataArray) => {
    // Optionally simulate delay for testing:
    // await new Promise(res => setTimeout(res, 1000));
    return dataArray.map((data) => {
      const initialStatus = getRandomStatus();
      return {
        initials: data.name.slice(0, 2),
        id: `${data.id} `,
        name: `${data.name} `,
        type: data.persona,
        creditScore: data.credit_score,
        card: data.recommendations.top_1_card,
        match: "95% match", // This can be adjusted based on logic if needed
        status: initialStatus.status,
        statusColor: initialStatus.color,
        time: initialStatus.time,
      };
    });
  };
useEffect(() => {
  let isMounted = true;
  setLoading(true);

  transformToActivities(recommendation)
    .then((result) => {
      if (isMounted) {
        setActivities(result);
        // Give the UI time to update before rendering heavy content
        setTimeout(() => setLoading(false), 100); // 100ms delay
      }
    });
  return () => { isMounted = false; };
}, [recommendation]);

const filteredActivities = activities
  ? activities.filter((activity) => {
      if (!filterValue.trim()) return true;
      if (filterType === "id") {
        return (activity.id || "").toLowerCase().includes(filterValue.toLowerCase());
      } else if (filterType === "name") {
        return (activity.name || "").toLowerCase().includes(filterValue.toLowerCase());
      } else if (filterType === "persona") {
        return (activity.type || "").toLowerCase().includes(filterValue.toLowerCase());
      } else if (filterType === "status") {
        return (activity.status || "").toLowerCase().includes(filterValue.toLowerCase());
      }
      return true;
    })
  : null;

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        mode === "dark" ? "bg-[#1D2041]" : "bg-gray-100"
      }`}
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="text-blue-500 font-bold text-lg">Loading...</span>
        </div>
      ) : (
        <>
          <div>
       <div className="flex justify-end mb-4 h-10 w-full">
  <select
    value={filterType}
    onChange={(e) => setFilterType(e.target.value)}
    className={`flex-grow px-2 py-1 border text-base


      ${
        mode === "dark"
          ? "bg-[#262948] text-white"
          : "bg-gray-50 text-black"
      } rounded-lg`}
    style={{
      border: "1px solid",
      borderColor: mode === "dark" ? "#4B5563" : "#D1D5DB",
      outline: "none",
    }}
  >
    <option value="id">ID</option>
    <option value="name">Name</option>
    <option value="persona">Persona</option>
    <option value="status">Status</option>
  </select>
  <input
    type="text"
    placeholder={`Filter by ${filterType}`}
    value={filterValue}
    onChange={(e) => setFilterValue(e.target.value)}
    className={`flex-grow px-2 py-1 border text-base
      ${
        mode === "dark"
          ? "bg-[#262948] text-white"
          : "bg-gray-50 text-black"
      } rounded-lg`}
    style={{
      border: "1px solid",
      borderColor: mode === "dark" ? "#4B5563" : "#D1D5DB",
      outline: "none",
      marginTop:'-1px'
    }}
  />
</div>


            <div
              className={`text-sm mb-4 ${
                mode === "dark" ? "text-white" : "text-black"
              }`}
            >
              <span className={`font-bold ml-4 text-blue-400`}>Note:</span>{" "}
              Click to see customer Details
            </div>
          </div>

          <div className="max-h-[500px] overflow-auto">
    {filteredActivities.map((activity, index) => (
      <ActivityRow
        key={index}
        activity={activity}
        mode={mode}
        handleRowClick={handleRowClick}
      />
    ))}
  </div>
        </>
      )}
    </div>
  );
};

export default CustomerActivity;
