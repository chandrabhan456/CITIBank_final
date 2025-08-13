// ActivityRow.jsx
import React from "react";

const ActivityRow = ({ activity, mode, handleRowClick }) => (
  <div
    onClick={() => handleRowClick(activity.id)}
    className={`p-4 rounded-lg mb-4 flex items-center justify-between shadow-md cursor-pointer ${
      mode === "dark" ? "bg-[#2a2d5c]" : "bg-white"
    }`}
  >
    {/* Left Section */}
    <div className="flex items-center w-1/3">
      <div
        className={`rounded-full h-12 w-12 flex items-center justify-center font-bold ${
          mode === "dark"
            ? "bg-gray-200 text-gray-700"
            : "bg-blue-400 text-gray-200"
        }`}
      >
        {activity.initials}
      </div>
      <div className="ml-4">
        <div
          className={`font-bold ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {activity.name}
        </div>
        <div
          className={`font-bold ${
            mode === "dark" ? "text-gray-100" : "text-black"
          }`}
        >
          {activity.id}
        </div>
        <div
          className={`text-sm mt-1 ${
            mode === "dark" ? "text-gray-100" : "text-gray-800"
          }`}
        >
          <span
            className={`px-2 py-1 rounded ${
              mode === "dark"
                ? "bg-gray-100 text-gray-800"
                : "bg-blue-300 text-gray-700"
            }`}
          >
            {activity.type}
          </span>
          <span className="ml-2">
            Credit Score: {activity.creditScore}
          </span>
        </div>
      </div>
    </div>

    {/* Center Section */}
    <div className="text-center w-1/3">
      <div
        className={`font-bold ${
          mode === "dark" ? "text-gray-100" : "text-blue-600"
        }`}
      >
        {activity.card}
      </div>
      <div
        className={`text-sm ${
          mode === "dark" ? "text-gray-100" : "text-gray-800"
        }`}
      >
        {activity.match}
      </div>
    </div>

    {/* Right Section */}
    <div className="flex items-center w-1/3 justify-end">
      <div className={`font-bold ${activity.statusColor} text-sm`}>
        {activity.status}
      </div>
      <div
        className={`text-sm ml-2 ${
          mode === "dark" ? "text-gray-500" : "text-gray-600"
        }`}
      >
        {activity.time}
      </div>
      <div className="ml-4 flex space-x-2">
        <button
          className={`hover:text-gray-800 ${
            mode === "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          <i className="fas fa-eye"></i>
        </button>
        <button
          className={`hover:text-gray-800 ${
            mode === "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          <i className="fas fa-comment"></i>
        </button>
      </div>
    </div>
  </div>
);

export default ActivityRow;
