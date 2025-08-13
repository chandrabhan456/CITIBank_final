import React from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";

const Graph3 = () => {
  const aiPerformanceData = [
    { 
      name: "Prediction Accuracy", 
      percentage: 87, 
      value: "87%",
      description: "Exceptional model precision - consistently outperforming industry benchmarks",
      icon: "🎯",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },

    { 
      name: "Revenue Attribution", 
      percentage: 75, 
      value: "$2.10M",
      description: "Strong revenue impact showcasing AI's strategic value",
      icon: "💰",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Customer Satisfaction", 
      percentage: 92, 
      value: "4.6/5.0",
      description: "Outstanding user experience with high engagement rates",
      icon: "⭐",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Model Uptime", 
      percentage: 99, 
      value: "99.8%",
      description: "Reliable system performance ensuring consistent availability",
      icon: "⚡",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    }
  ];

  const { selectedCustomerId, mode } = useStateContext();

  return (
    <div className={`p-6 rounded-lg shadow-md h-[500px] overflow-auto ${
      mode === "dark" ? "bg-[#1D2041]" : "bg-white"
    }`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h2 className={`text-xl font-bold ${
              mode === "dark" ? "text-gray-50" : "text-gray-800"
            }`}>
              AI Performance Metrics
            </h2>
            <p className={`text-sm ${
              mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Real-time AI model performance indicators
            </p>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-6">
        {aiPerformanceData.map((item, index) => (
          <div key={index} className="space-y-3">
            {/* Metric Name and Value */}
            <div className="flex justify-between items-center">
              <h3 className={`text-base font-medium ${
                mode === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                {item.name}
              </h3>
              <span className={`text-lg font-bold ${
                mode === "dark" ? "text-gray-200" : "text-gray-800"
              }`}>
                {item.value}
              </span>
            </div>

            {/* Progress Bar */}
            <div className={`w-full rounded-full h-2 ${
              mode === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}>
              <div
                className="h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${item.percentage}%`,
                  background: item.color,
                }}
              />
            </div>

            {/* Description with Icon */}
            <div className={`flex items-start space-x-2 p-3 rounded-lg border-l-4 ${
              mode === "dark" 
                ? "bg-[#2a2d5c] border-blue-500" 
                : "bg-gray-50 border-blue-400"
            }`}>
              <span className="text-lg">{item.icon}</span>
              <p className={`text-sm ${
                mode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
    
    </div>
  );
};

export default Graph3;
