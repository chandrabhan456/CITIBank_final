import React from 'react';

const LLMInsights = ({ insight }) => (
  <div className="p-5">
    <h2 className="text-blue-400 relative p-4  rounded-lg  bg-[#f1f7f9] text-xl font-bold mb-3">🤖 LLM Comments on Chart</h2>
    <p>{insight}</p>
  </div>
);

export default LLMInsights;
