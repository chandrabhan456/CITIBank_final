import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useStateContext } from "../../contexts/ContextProvider";
const cardsData = [
  {
    fee: "$95",
    type: "Travel Elite",
    cardno: "XXXX XXXX XXXX 1234",
    valid: "04/42 VALID THRU",
    cvv: "123",
    name: "CUST001",
    benefits: [
      "3X points on travel & dining",
      "No foreign transaction fees",
      "Priority Pass lounge access",
      "60K bonus points",
    ],
    gradientFrom: "#7B2FF7", // Purple gradient start
    gradientTo: "#F107A3", // Purple gradient end
  },
  {
    fee: "$495",
    type: "Business Pro",
    cardno: "XXXX XXXX XXXX 5678",
    valid: "12/28 VALID THRU",
    cvv: "456",
    name: "CUST001",
    benefits: [
      "4th night free on hotels",
      "Priority Pass Select",
      "Comprehensive travel insurance",
      "Concierge service",
    ],
    gradientFrom: "#00C9FF", // Blue gradient start
    gradientTo: "#92FE9D", // Blue gradient end
  },
  {
    fee: "$0",
    type: "Cashback Master",
    cardno: "XXXX XXXX XXXX 6548",
    valid: "12/32 VALID THRU",
    cvv: "641",
    name: "CUST001",
    benefits: [
      "2% cashback on everything",
      "No annual fee",
      "Price rewind protection",
      "Extended warranty",
    ],
    gradientFrom: "#FFB6C1", // Pink gradient start
    gradientTo: "#FF69B4", // Pink gradient end
  },
];
const customer = {
  name: "Andrew Kennedy",
  persona: "Young Professional	",
  creditScore: 642,
  creditScoreStatus: "Excellent",
  annualIncome: 97097,
  age: 23,
spendingInsights: [
    { label: "Groceries", value: 92.39},
    { label: "Transportation", value: 114.96},
  ],
};

function Customer() {
  const { recommendation, setRecommendations, mode } = useStateContext();
  const [recommendedCardsData, setRecommendedCardsData] = useState([]);
  useEffect(() => {
    // Simulate fetching the API data
    const fetchApiData = async () => {
      // Replace with actual API call
      const apiResult = {
        age: 23,
        annual_income: 97097,
        annual_spend: 2313.54,
        credit_score: 642,
        id: "CUST0001",
        last_transaction: "2025-08-03",
        life_event: "New Job",
        name: "Andrew Kennedy",
        persona: "Young Professional",
        recommendations: {
          top_1_card: "Fashion Forward",
          top_1_card_annual_fee: 75.0,
          top_1_card_features:
            "3x points on clothing and accessories purchases.\nExclusive 15% discount at partner fashion retailers.\nAccess to fashion events twice a year.\nPersonalized style consultations once a year.",
          top_2_card: "Cashback Master",
          top_2_card_annual_fee: 0.0,
          top_2_card_features:
            "1.5% cashback on all purchases.\nNo annual fee, lifetime.\nQuarterly bonus cashback on groceries and dining.\nRedeem cashback as statement credit or gift cards.",
          top_3_card: "E-Shopper",
          top_3_card_annual_fee: 0.0,
          top_3_card_features:
            "3% cashback on online shopping platforms.\n10% discount on electronics at partner retailers.\nNo annual fee, lifetime.\nExclusive retail offers during holiday seasons.",
        },
        spending_last_month: {
          Groceries: 92.39,
          Transportation: 114.96,
        },
        top_spending_category: "Dining",
      };

      const mappedData = [
        {
          fee: `$${apiResult.recommendations.top_1_card_annual_fee}`,
          type: apiResult.recommendations.top_1_card,
          cardno: "XXXX XXXX XXXX 0001", // Example card number
          valid: "10/28 VALID THRU", // Example valid date
          cvv: "001", // Example CVV
          name: apiResult.name,
          benefits: apiResult.recommendations.top_1_card_features.split("\n"),
          gradientFrom: "#7B2FF7", // Purple gradient start
          gradientTo: "#F107A3", // Purple gradient end
        },
        {
          fee: `$${apiResult.recommendations.top_2_card_annual_fee}`,
          type: apiResult.recommendations.top_2_card,
          cardno: "XXXX XXXX XXXX 0002", // Example card number
          valid: "11/29 VALID THRU", // Example valid date
          cvv: "002", // Example CVV
          name: apiResult.name,
          benefits: apiResult.recommendations.top_2_card_features.split("\n"),
          gradientFrom: "#00C9FF", // Blue gradient start
          gradientTo: "#92FE9D", // Blue gradient end
        },
        {
          fee: `$${apiResult.recommendations.top_3_card_annual_fee}`,
          type: apiResult.recommendations.top_3_card,
          cardno: "XXXX XXXX XXXX 0003", // Example card number
          valid: "12/30 VALID THRU", // Example valid date
          cvv: "003", // Example CVV
          name: apiResult.name,
          benefits: apiResult.recommendations.top_3_card_features.split("\n"),
          gradientFrom: "#FFB6C1", // Pink gradient start
          gradientTo: "#FF69B4", // Pink gradient end
        },
      ];

      setRecommendedCardsData(mappedData);
    };

    fetchApiData();
  }, []);

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div
        className={`min-h-screen w-full flex flex-col items-center py-8 px-2 ${
          mode === "dark" ? "bg-page-bg-dark" : "bg-page-bg-light"
        }`}
      >
        {/* Banner */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl shadow-lg p-5 md:p-7 flex items-center mb-8">
          <div className="w-16 h-16 bg-white/20 rounded-full mr-4 md:mr-6 flex items-center justify-center">
            <span className="text-3xl text-white font-bold">👤</span>
          </div>
          <div>
            <div className="text-white text-lg md:text-2xl font-semibold">
              Welcome back, CUST001
            </div>
            <div className="text-blue-100 text-base md:text-lg">
              Your personalized credit card recommendations are ready
            </div>
          </div>
        </div>

        {/* MAIN CONTENT AREA: FLEX, EQUAL HEIGHTS */}
        <div className="w-full flex flex-col md:flex-row gap-6 items-stretch">
          {/* Profile Card */}
          <div
            className={`w-full md:w-1/4 rounded-xl border shadow-lg p-4 md:p-6 flex flex-col ${
              mode === "dark"
                ? "bg-[#1D2041] border-gray-700"
                : "bg-blue-50 border-gray-300"
            }`}
          >
            <div
              className={`flex items-center gap-2 mb-2 ${
                mode === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-3xl font-bold">
                {customer.name?.[0] || "?"}
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-semibold">{customer.name}</div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold mt-1">
                  {customer.persona}
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`${
                  mode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Credit Score:
              </span>
              <span className="font-bold text-green-400">
                {customer.creditScore}
              </span>
              <span className="text-xs bg-green-200 text-green-700 px-2 py-0.5 rounded-full ml-2">
                {customer.creditScoreStatus}
              </span>
            </div>
            <div className="mb-2">
              <span
                className={`${
                  mode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Annual Income:
              </span>
              <span
                className={`font-bold ml-2 ${
                  mode === "dark" ? "text-white" : "text-black"
                }`}
              >
                ${customer.annualIncome.toLocaleString()}
              </span>
            </div>
            <div className="mb-4">
              <span
                className={`${
                  mode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Age:
              </span>
              <span
                className={`font-bold ml-2 ${
                  mode === "dark" ? "text-white" : "text-black"
                }`}
              >
                {customer.age}
              </span>
            </div>
            <div>
              <h4
                className={`font-semibold mb-1 ${
                  mode === "dark" ? "text-white" : "text-black"
                }`}
              >
                Spending Insights
              </h4>
              <ul>
                {customer.spendingInsights.map((item) => (
                  <li
                    key={item.label}
                    className="flex justify-between mb-1 text-[15px]"
                  >
                    <span
                      className={`${
                        mode === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span
                      className={`font-medium ${
                        mode === "dark" ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      ${item.value.toLocaleString()}/month
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="w-full md:w-3/4 flex flex-col">
            <div
              className={`border shadow-lg rounded-xl p-4 md:p-6 flex flex-col flex-1 ${
                mode === "dark"
                  ? "bg-[#1D2041] border-gray-700"
                  : "bg-blue-50 border-gray-300"
              }`}
            >
              <div
                className={`text-lg md:text-xl font-semibold mb-1 ${
                  mode === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Top Recommendations for You
              </div>
              <div
                className={`text-xs md:text-sm mb-4 ${
                  mode === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Based on your spending habits and financial profile
              </div>
              {/* Responsive cards grid: wraps on desktop, scrolls on mobile */}
              <div className="flex flex-wrap md:flex-nowrap gap-4 overflow-x-auto">
                {recommendedCardsData.map((cardData, index) => (
                  <Card key={index} {...cardData} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
