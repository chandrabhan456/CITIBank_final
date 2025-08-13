import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

import avatar from "../assets/avatar.png";
import UserProfile from "./UserProfile";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import nttlogo from "../assets/nttdatalogo.svg";
const Navbar = () => {
  const {
    setlogin1,
    userProfile,
    setUserProfile,
    login1,
    mode
  } = useStateContext();

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userProfile && !event.target.closest('.user-profile-container')) {
        setUserProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userProfile, setUserProfile]);
  
  const getNavbarTheme = () => {
    if (mode==="dark") {
      return "bg-[#2d325c] shadow-xl";
    } else {
      return "bg-gradient-to-r from-slate-50 via-white to-slate-100 border-b border-slate-200 shadow-lg";
    }
  };

  const getTextTheme = () => {
    if (mode==="dark") {
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
  const buttonStyle = mode === "dark"
    ? "bg-slate-700/40 hover:bg-slate-600/50 border-slate-600/40 hover:border-slate-500/50"
    : "bg-slate-100/80 hover:bg-slate-200/80 border-slate-300/50 hover:border-slate-400/50";

  return (
    // Add ml-4 (or ml-8, etc.) here to shift the whole button to the right
    <div className="relative user-profile-container ml-4">
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
          <span className={`${getTextTheme().userName} font-semibold ml-1 text-sm flex items-center`}>
            Michael
            {!userProfile ? (
              <MdKeyboardArrowDown className={`${mode === "dark" ? 'text-slate-300' : 'text-slate-500'} ml-2 text-lg transition-transform duration-200`} />
            ) : (
              <MdKeyboardArrowUp className={`${mode === "dark" ? 'text-slate-300' : 'text-slate-500'} ml-2 text-lg transition-transform duration-200`} />
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
<div className={`w-full ${getNavbarTheme()} h-20 relative`}>
  {/* Left Section */}
  <div className="flex items-center h-full">
    <img
      style={{ width: "240px", marginLeft: "0px", marginTop: "-15px" }}
      src={nttlogo}
      alt="nttlogo"
    />
    <div className="ml-4 min-w-0"> {/* min-w-0 allows truncation in flex */}
      <div className="flex items-center space-x-3 mb-2">
        <h1 className={`text-2xl font-bold ${textTheme.title} tracking-tight truncate`}>
          Next Gen Credit Card Recommendation Agent
        </h1>
      </div>
      <p className={`${textTheme.subtitle} text-sm font-medium flex items-center truncate`}>
        <span className="mr-2">✨</span>
        AI-powered insights for Credit card recommendation
      </p>
    </div>
  </div>
  {/* Absolutely positioned UserProfileButton */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2">
    <UserProfileButton />
  </div>
</div>





  );
};

export default Navbar;
