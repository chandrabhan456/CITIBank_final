import React, { useEffect, useState } from "react";
import "./RecommandationCard.css";
import { useStateContext } from "../../../contexts/ContextProvider";

const Card = ({
  fee,
  type,
  cardno,
  valid,
  cvv,
  name,
  benefits,
  gradientFrom,
  gradientTo,
}) => {
  const { selectedCustomerId, selectedRole } = useStateContext();
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `http://localhost:5000/recommend?customer_id=${selectedCustomerId.trim()}&view_type=${selectedRole.trim()}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch customer data: ${response.statusText}`
          );
        }
        const data = await response.json();
        setCustomerData(data);
      } catch (err) {
        setError(err.message);
        setCustomerData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [selectedCustomerId]);
  console.log("customer ffffffffff", customerData);
  return (
    <div className="card-container ">
      {/* Card Section */}
      <div className="flex justify-center items-center mb-4 w-full max-w-sm">
        <div className="card mx-auto " style={{width:'600px'}}>
          <div
            className="card-front "
            style={{
              background: `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`,
            }}
          >
            <div className="flex justify-between p-2 text-white">
              <div className="text-lg font-bold px-2 py-1">Visa</div>
              <div className="text-lg font-bold px-2 py-1">CITI</div>
            </div>
            <div className="px-4 text-white text-2xl font-bold">{type}</div>
            <div className="flex items-center px-4 text-white mt-2">
              <div className="chip w-10 h-8 bg-gray-300 rounded-sm mr-4 relative">
                <div className="absolute inset-0 m-1 flex flex-col justify-center">
                  <div className="h-0.5 bg-gray-500 mx-1"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-0.5 bg-gray-500"></div>
                    <div className="h-4 w-4 bg-gray-400 border border-gray-500 rounded-sm"></div>
                    <div className="h-5 w-0.5 bg-gray-500"></div>
                  </div>
                  <div className="h-0.5 bg-gray-500 mx-1"></div>
                </div>
              </div>
              <div className="text-md">{cardno}</div>
            </div>
            <div className="px-4 text-white mt-2">
              <div className="flex justify-between text-lg">
                <span className="font-semibold">{name}</span>
                <span>{valid}</span>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="card-back">
            <div className="black-bar"></div>
            <div className="signature">
              <span className="signature-text">
                AUTHORIZED SIGNATURE - NOT VALID UNLESS SIGNED
              </span>
              <div className="signature-box">
                <span className="signature-text py-4">{cvv}</span>
              </div>
            </div>
            <div className="card-details">
              <div className="card-number">{cardno}</div>
              <div className="card-valid">{valid}</div>
              <div className="card-holder">{name}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Content */}
    <div className="bg-blue-900/30 w-full max-w-sm rounded-lg shadow-lg p-4 mt-4" style={{ height: '350px', overflowY: 'auto' }}>
  <h3 className="font-bold mb-2 text-center text-blue-700">
    ✨ Key Benefits
  </h3>
  <ul className="space-y-2">
    {benefits.map((benefit, index) => (
      <li
        key={index}
        className="flex items-center bg-white rounded-md p-2 shadow-sm"
      >
        <span className="text-green-500 mr-2">✓</span>
        <span className="text-gray-700">{benefit}</span>
      </li>
    ))}
  </ul>
  <div className="font-bold mt-4 text-white">Annual Fee: {fee}</div>
</div>

      {/* Reason Box */}
      <div className="mt-4 w-full max-w-sm">
        {loading ? (
          <div className="text-gray-500 text-center">Loading reason...</div>
        ) : error ? (
          <div className="text-red-500 text-center">Error: {error}</div>
        ) : (
          customerData &&
          customerData.recommendation_reasoning && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 shadow">
              <div className="font-semibold text-yellow-800 mb-2">
                Why {type} is recommended for {selectedCustomerId}:
              </div>
              <div className="text-gray-800">
                {customerData.recommendation_reasoning[type]
                  ? customerData.recommendation_reasoning[type]
                  : "No specific reason found for this card."}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Card;
