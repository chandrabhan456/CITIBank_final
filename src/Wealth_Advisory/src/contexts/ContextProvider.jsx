import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialState = {
  setting: false,
  notification: false,
  userProfile: false,
};
let loginstate;
const initialLoginState = localStorage.getItem("login")
  ? localStorage.getItem("login") === "true"
  : false;
export const ContextProvider = ({ children }) => {
  let initialLoginState = localStorage.getItem("login");
  if (initialLoginState === null || initialLoginState === "false") {
    // If null or true, set to false
    localStorage.setItem("login", "false");
    initialLoginState = false;
  } else {
    // Otherwise, parse as a boolean
    initialLoginState = localStorage.getItem("login");
  }
  const [collapsed, setCollapsed] = useState(false);
  const [mainPage, setMainPage] = useState(false);
  const [chatbot, setChatbot] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [login1, setlogin1] = useState(initialLoginState);
  const [selectedRole,setSelectedRole]=useState('')
  const [selectedCustomerId,setSelectedCustomerId]=useState(null)
    const [showSection, setShowSection] = useState("button1");
  useEffect(() => {
    localStorage.setItem("login", login1);
  }, [login1]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        login1,
        setlogin1,
        mainPage,
        chatbot,
        setChatbot,
        setMainPage,
        collapsed,
        setCollapsed,
        userProfile,
        setUserProfile,
        selectedRole,
        setSelectedRole,
        selectedCustomerId,
        setSelectedCustomerId,
        showSection, 
        setShowSection
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
