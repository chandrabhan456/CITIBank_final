import React, { useState, useEffect } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
const personaEmojis = [
  { id: 0, name: "CollegeStudent", emoji: "🎓" },
  { id: 1, name: "EcoShopper", emoji: "🌿" },
  { id: 2, name: "HealthConscious", emoji: "💪" },
  { id: 3, name: "EntertainmentLover", emoji: "🎬" },
  { id: 4, name: "FamilyFocused", emoji: "👨‍👩‍👧‍👦" },
  { id: 5, name: "LuxurySpender", emoji: "💸" },
  { id: 6, name: "Retiree", emoji: "🧓" },
  { id: 7, name: "TechEnthusiast", emoji: "💻" },
  { id: 8, name: "FrequentTraveler", emoji: "✈️" },
  { id: 9, name: "YoungProfessional", emoji: "💼" },
];

const PersonaCards = ({ data }) => {
  const { setSelectedCategory, clickedCardIndex, setClickedCardIndex, mode } =
    useStateContext();

  useEffect(() => {
    if (clickedCardIndex !== null) {
      scrollToTable();
    }
  }, [clickedCardIndex]);

  // State to keep track of the currently clicked card

  // Function to handle click and update selected category
  const handleCardClick = (idx, persona) => {
    setSelectedCategory(persona.persona);
    setClickedCardIndex(idx);
    scrollToTable();
  };

  const scrollToTable = () => {
    const tableSection = document.getElementById("tableSection");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Static array of colors
  const staticColorPaletteHex = [
    "#FF5733", // Example color 1
    "#33FF57", // Example color 2
    "#3357FF", // Example color 3
    "#0041C7", // Example color 4
    "#FF33F5", // Example color 5
    "#57FF33", // Example color 6
    "#5733FF", // Example color 7
    "#33FFF5", // Example color 8
    "#FF3357", // Example color 9
    "#F533FF", // Example color 10
    "#33F5FF", // Example color 11
  ];

  // Static array of values ranging from -5 to 5
  const staticValues = [-5, -3, -1, 2, 1, 3, 5, -2, 2, -4, 4];

  console.log("Static Colors:", staticColorPaletteHex);
  console.log("Static Values:", staticValues);

  const formatValueDisplay = (value) => {
    const isPositive = parseFloat(value) > 0; // Check if value is positive
    const color = isPositive ? "green" : "red";
    const trendIcon = isPositive ? "▲" : "▼"; // Up arrow for positive, down arrow for negative

    return (
      <div
        style={{
          color,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <span>{value}%</span>
        <span style={{ marginLeft: "5px" }}>{trendIcon}</span>
      </div>
    );
  };

  // Example usage
  staticValues.forEach((value) => {
    console.log(formatValueDisplay(value));
  });
  const getPersonaEmoji = (personaName) => {
    const normalizedName = personaName.toLowerCase().replace(/\s+/g, "");
    return (
      personaEmojis.find(
        (p) => p.name.toLowerCase().replace(/\s+/g, "") === normalizedName
      )?.emoji || "👤"
    );
  };

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="mx-auto bg-page-bg-light dark:bg-page-bg-dark rounded-xl px-6 py-6 shadow flex flex-col">
        <div className="flex flex-wrap gap-5 justify-center">
          {data.map((persona, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow border p-5 flex items-center justify-start cursor-pointer transition min-w-[250px] flex-1 max-w-[calc(20%-16px)] ${
                mode === "dark"
                  ? clickedCardIndex === idx
                    ? "bg-[#626897] border-[#303456]"
                    : "bg-[#26285a] border-[#26285a] hover:border-[#5356a8] hover:bg-[#212358]"
                  : clickedCardIndex === idx
                  ? "bg-blue-300 border-blue-500 text-black"
                  : "bg-blue-50 border-blue-300 text-black hover:border-blue-500 hover:bg-blue-200"
              }`}
              style={{
                flex: "1 1 calc(20% - 16px)", // Try to fit 5 per row, but allow wrapping
              }}
              onClick={() => handleCardClick(idx, persona)}
            >
              <div
                style={{
                  fontSize: "2em",
                  marginRight: "10px",
                  flexShrink: 0, // Prevent emoji from shrinking
                }}
              >
                {getPersonaEmoji(persona.persona)}
              </div>
              <div
                className="flex-1 flex flex-col items-center justify-center"
                style={{
                  borderColor: persona.color,
                  borderStyle: "solid",
                  padding: "10px",
                  borderRadius: "8px",
                  margin: "10px",
                  width: "150px",
                }}
              >
                <div className="">
                  <div
                    className="text-lg font-bold whitespace-nowrap text-blue-500"
                    style={{ color: persona.color }}
                  >
                    {persona.persona}
                  </div>
                  <div
                    className="text-sm flex whitespace-nowrap"
                    style={{ color: persona.color }}
                  >
                    <span className="text-sm">Active Member</span>
                    <p className="ml-2 font-bold text-sm">{persona.count}</p>
                  </div>
                  <div className="flex" style={{ color: persona.color }}>
                    <span className="text-sm">Quarterly Shift</span>
                    <p className="ml-2 font-bold text-sm">
                      {formatValueDisplay(staticValues[idx])}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonaCards;
