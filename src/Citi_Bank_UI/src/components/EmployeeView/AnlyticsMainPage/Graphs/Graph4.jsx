import React from "react";
import { useStateContext } from "../../../../contexts/ContextProvider";

const Graph4 = () => {
  const recommendationData = [
    { 
      name: "Fuel Saver", 
      percentage: 72, 
      value: "72%",
      description: "Optimized fuel efficiency recommendations driving cost savings",
      icon: "⛽",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Travel Elite", 
      percentage: 89, 
      value: "89%",
      description: "Premium travel experiences with personalized luxury recommendations",
      icon: "✈️",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Entertainment Buff", 
      percentage: 57, 
      value: "57%",
      description: "Curated entertainment content matching user preferences",
      icon: "🎬",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Cashback Master", 
      percentage: 85, 
      value: "85%",
      description: "Maximized cashback opportunities through smart spending insights",
      icon: "💳",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Family Planner", 
      percentage: 56, 
      value: "56%",
      description: "Family-focused financial planning and budget optimization",
      icon: "👨‍👩‍👧‍👦",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Wellness Boost", 
      percentage: 68, 
      value: "68%",
      description: "Health and wellness recommendations for improved lifestyle",
      icon: "🏃‍♂️",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Student Achieve", 
      percentage: 79, 
      value: "79%",
      description: "Educational support and student-focused financial solutions",
      icon: "🎓",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "Fashion Forward", 
      percentage: 60, 
      value: "60%",
      description: "Trendy fashion recommendations aligned with personal style",
      icon: "👗",
      color: "linear-gradient(90deg, #2196F3 0%, #4CAF50 100%)"
    },
    { 
      name: "E-Shopper", 
      percentage: 75, 
      value: "75%",
      description: "Online shopping optimization with best deals and offers",
      icon: "🛒",
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
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mr-3">
          <span className="text-white text-lg">📊</span>
        </div>
        <div>
          <h2 className={`text-xl font-bold ${
            mode === "dark" ? "text-gray-50" : "text-gray-800"
          }`}>
            Customer Hit Rate Metrics
          </h2>
          <p className={`text-sm ${
            mode === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Real-time recommendation success rates by category
          </p>
        </div>
      </div>
    </div>

    {/* Metrics */}
    <div className="space-y-6">
      {recommendationData.map((item, index) => (
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
    )
}
export default Graph4;