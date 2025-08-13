import React from "react";

const Graph2 = () => {
  const recommendationData = [
    { name: "Chase Sapphire Preferred", percentage: 75, color: "#2196F3" },
    { name: "Capital One Venture X", percentage: 60, color: "#64B5F6" },
    { name: "American Express Gold", percentage: 50, color: "#4CAF50" },
  ];

  const modelPerformanceData = [
    { name: "Recommendation Accuracy", value: "89.2%", color: "#4CAF50" },
    { name: "LLM Response Quality", value: "92.7%", color: "#4CAF50" },
    { name: "Customer Satisfaction", value: "4.6/5.0", color: "#4CAF50" },
    { name: "Model Uptime", value: "99.8%", color: "#4CAF50" },
  ];

  return (
    <div className="bg-[#1D2041] p-6 rounded-lg shadow-md flex space-x-4">
      <div className="bg-[#2a2d5c] p-4 rounded-lg flex-1">
        <h3 className="font-bold text-lg mb-4">📊 Recommendation Performance</h3>
        {recommendationData.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="flex-1 text-gray-50">{item.name}</div>
            <div className="w-1/2 bg-gray-200 rounded-full h-2.5 mr-2">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
            <div className="text-gray-100">{item.percentage}%</div>
          </div>
        ))}
      </div>

      <div className="bg-[#2a2d5c] p-4 rounded-lg flex-1">
        <h3 className="font-bold text-lg mb-4">AI Model Performance</h3>
        {modelPerformanceData.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <div className="text-gray-50">{item.name}</div>
            <div className="font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graph2;
