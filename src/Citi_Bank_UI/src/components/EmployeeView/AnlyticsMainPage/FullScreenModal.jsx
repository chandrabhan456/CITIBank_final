import React from 'react';

const FullScreenModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
      <div className="relative w-full h-full p-4">
        {/* Close/Zoom Out button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          title="Exit Full Screen"
        >
          {/* Zoom Out / Minimize Icon - Using Tailwind text-black */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black">
            <path 
              d="M4 14H10V20" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M20 10H14V4" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M14 10L21 3M10 14L3 21" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        {/* Full screen content */}
        <div className="w-full h-full bg-white dark:bg-[#23244d] rounded-lg p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FullScreenModal;
