import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.png";

const UserProfile = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { setlogin1, setUserProfile } = useStateContext(); // Remove chatbot, setChatbot
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatTimestamp = (date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const timeOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const time = date.toLocaleTimeString("en-US", timeOptions);

    if (isToday) {
      return `Today at ${time}`;
    } else {
      const dateStr = date.toLocaleDateString("en-US", dateOptions);
      return `${dateStr} at ${time}`;
    }
  };

  const handleLogout = () => {
    setlogin1(false);
    setUserProfile(false);
    navigate("/");
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setUserProfile(false);
  };

  const dropdownTheme = isDarkMode
    ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-600/30 shadow-2xl"
    : "bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-xl";

  const textTheme = isDarkMode
    ? {
        primary: "text-slate-100",
        secondary: "text-slate-300",
        muted: "text-slate-400",
      }
    : {
        primary: "text-slate-900",
        secondary: "text-slate-600",
        muted: "text-slate-500",
      };

  // Updated menu items without AI Assistant toggle
  const menuItems = [
    {
      icon: "🤖",
      label: "AI Assistant",
      action: () => {
        // Dispatch custom event to open chat
        window.dispatchEvent(new CustomEvent("openFloatingChat"));
        setUserProfile(false);
      },
      description: "Open AI Assistant chat",
    },
    {
      icon: isDarkMode ? "☀️" : "🌙",
      label: `${isDarkMode ? "Light" : "Dark"} Mode`,
      action: handleToggleTheme,
      description: `Switch to ${isDarkMode ? "light" : "dark"} theme`,
    },
    {
      icon: "🚪",
      label: "Logout",
      action: handleLogout,
      description: "Sign out of your account",
      isLogout: true,
    },
  ];

  return (
    <div className="relative">
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setUserProfile(false)}
      />

      {/* Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-80 rounded-2xl border backdrop-blur-lg z-50 user-profile-dropdown ${dropdownTheme}`}
        style={{
          boxShadow: isDarkMode
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Header Section */}
        <div
          className={`p-6 border-b ${
            isDarkMode ? "border-slate-600/30" : "border-slate-200"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="relative avatar-ring">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border-3 border-blue-500/30 shadow-lg ring-4 ring-blue-500/10 object-cover"
              />
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${textTheme.primary}`}>
                Michael Johnson
              </h3>
              <p className={`text-sm ${textTheme.secondary}`}>
                Senior Wealth Advisor
              </p>
              <p className={`text-xs ${textTheme.muted} mt-1`}>
                michael.johnson@wealth.com
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className={`w-full flex items-center p-4 rounded-xl transition-all duration-200 group menu-item ${
                item.isLogout
                  ? isDarkMode
                    ? "hover:bg-red-500/10 hover:border-red-500/20 border border-transparent"
                    : "hover:bg-red-50 hover:border-red-200 border border-transparent"
                  : isDarkMode
                  ? "hover:bg-slate-700/50 hover:border-slate-600/30 border border-transparent"
                  : "hover:bg-slate-100 hover:border-slate-300/50 border border-transparent"
              } transform hover:scale-[1.02]`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl mr-4 ${
                  item.isLogout
                    ? isDarkMode
                      ? "bg-red-500/10 group-hover:bg-red-500/20"
                      : "bg-red-50 group-hover:bg-red-100"
                    : isDarkMode
                    ? "bg-slate-700/50 group-hover:bg-slate-600/50"
                    : "bg-slate-100 group-hover:bg-slate-200"
                } transition-colors duration-200`}
              >
                <span className="text-xl">{item.icon}</span>
              </div>

              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${
                      item.isLogout
                        ? isDarkMode
                          ? "text-red-400"
                          : "text-red-600"
                        : textTheme.primary
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <p className={`text-xs ${textTheme.muted} mt-1`}>
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Footer with Real-time Timestamp */}
        <div
          className={`p-4 border-t ${
            isDarkMode ? "border-slate-600/30" : "border-slate-200"
          } text-center`}
        >
          <p className={`text-xs ${textTheme.muted}`}>
            Version 2.0 • Last Active: {formatTimestamp(currentTime)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
