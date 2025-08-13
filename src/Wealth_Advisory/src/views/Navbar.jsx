import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useTheme } from "../contexts/ThemeContext";
import avatar from "../assets/avatar.png";
import nttDataLogo from "../assets/NTT_DATA_LOGO.png"; // Add this import
import UserProfile from "./UserProfile";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const Navbar = () => {
  const { setlogin1, userProfile, setUserProfile, login1 } = useStateContext();

  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userProfile && !event.target.closest(".user-profile-container")) {
        setUserProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userProfile, setUserProfile]);

  const getNavbarTheme = () => {
    if (isDarkMode) {
      return "bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/30 shadow-xl";
    } else {
      return "bg-gradient-to-r from-slate-50 via-white to-slate-100 border-b border-slate-200 shadow-lg";
    }
  };

  const getTextTheme = () => {
    if (isDarkMode) {
      return {
        title: "text-white",
        subtitle: "text-slate-300",
        buttonText: "text-white",
        userText: "text-slate-200",
        userName: "text-white",
      };
    } else {
      return {
        title: "text-slate-900",
        subtitle: "text-slate-600",
        buttonText: "text-white",
        userText: "text-slate-600",
        userName: "text-slate-900",
      };
    }
  };

  const UserProfileButton = () => {
    const buttonStyle = isDarkMode
      ? "bg-slate-700/40 hover:bg-slate-600/50 border-slate-600/40 hover:border-slate-500/50"
      : "bg-slate-100/80 hover:bg-slate-200/80 border-slate-300/50 hover:border-slate-400/50";

    return (
      <div className="relative user-profile-container">
        <div
          className={`flex items-center cursor-pointer ${buttonStyle} backdrop-blur-sm rounded-xl px-5 py-3 transition-all duration-300 border shadow-lg hover:shadow-xl transform hover:scale-105`}
          onClick={() => setUserProfile(!userProfile)}
        >
          <img
            className="rounded-full w-10 h-10 border-2 border-blue-500/30 shadow-lg ring-2 ring-blue-500/10 object-cover"
            src={avatar}
            alt="user-profile"
          />
          <div className="flex items-center ml-3">
            <span className={`text-sm ${getTextTheme().userText}`}>Hi, </span>
            <span
              className={`${
                getTextTheme().userName
              } font-semibold ml-1 text-sm flex items-center`}
            >
              Michael
              {!userProfile ? (
                <MdKeyboardArrowDown
                  className={`${
                    isDarkMode ? "text-slate-300" : "text-slate-500"
                  } ml-2 text-lg transition-transform duration-200`}
                />
              ) : (
                <MdKeyboardArrowUp
                  className={`${
                    isDarkMode ? "text-slate-300" : "text-slate-500"
                  } ml-2 text-lg transition-transform duration-200`}
                />
              )}
            </span>
          </div>
        </div>

        {userProfile && <UserProfile />}
      </div>
    );
  };

  const textTheme = getTextTheme();

  return (
    <div className={`w-full ${getNavbarTheme()}`}>
      <div className="flex justify-between items-center px-8 py-6">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center space-x-6">
          {/* NTT DATA Logo */}
          <div className="flex-shrink-0">
            <img
              src={nttDataLogo}
              alt="NTT DATA"
              className={`h-12 w-auto object-contain transition-all duration-300 hover:scale-105 cursor-pointer ${
                isDarkMode ? "filter brightness-110" : "filter brightness-100"
              }`}
            />
          </div>

          {/* Vertical Divider */}
          <div
            className={`h-12 w-px ${
              isDarkMode
                ? "bg-gradient-to-b from-transparent via-slate-600 to-transparent"
                : "bg-gradient-to-b from-transparent via-slate-300 to-transparent"
            }`}
          ></div>

          {/* Title Section */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h1
                className={`text-2xl font-bold ${textTheme.title} tracking-tight`}
              >
                Wealth Advisory AI Dashboard
              </h1>
            </div>
            <p
              className={`${textTheme.subtitle} text-sm font-medium flex items-center`}
            >
              <span className="mr-2">✨</span>
              AI-powered insights for wealth management
            </p>
          </div>
        </div>

        {/* Right Section - Controls */}
        <div className="flex items-center space-x-4">
          {/* User Profile */}
          <UserProfileButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
