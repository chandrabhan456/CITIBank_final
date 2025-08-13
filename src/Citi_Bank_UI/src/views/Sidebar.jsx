import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "./Sidebar.css";
import Bank from "../assets/bank.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const { collapsed, setCollapsed,selectedRole } = useStateContext();

  const buttonStyles = (path) => ({
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    color: window.location.pathname === path ? "#0D85D8" : "#ffffff",
    cursor: "pointer",
    border: "none",
    textAlign: "left",
    textDecoration: "none",
    fontSize: "1.25rem",
    background: "none",
  });

  return(
  <div className="flex">
  {collapsed ? (
    // COLLAPSED SIDEBAR
    
    <div className="p-4 mt-1 h-[90%] overflow-y-auto custom-scrollbar overflow-x-hidden w-24 transition-all duration-200">
      <div className="flex justify-end">
        <button
          onClick={() => setCollapsed(false)}
          className="text-white text-xl p-2 focus:outline-none"
          aria-label="Expand sidebar"
        >
          »
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <img
          src={Bank}
          alt="Bank Logo"
          style={{
            width: "40px",
            height: "40px",
            display: "block",
            margin: "0 auto",
            transition: "all 0.2s",
          }}
        />
     {/*   {selectedRole==='employee' ? (<> 
         <nav
          className="bg-[#2d325c]"
          style={{
            marginTop: "20px",
            padding: "6px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              color: "#333",
              textAlign: "left",
            }}
          >
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/")}
                style={buttonStyles("/")}
                className="bg-gray-900"
              >
              🏠
              </button>
            </li>
           <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/recommandation")}
                style={buttonStyles("/recommandation")}
              >
           💡 

              </button>
            </li>
              <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/configuration")}
                style={buttonStyles("/configuration")}
              >
           ⚙️


              </button>
            </li>
          </ul>
        </nav>
        </>)
        : (<>  <nav
          className="bg-[#2d325c]"
          style={{
            marginTop: "20px",
            padding: "6px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              color: "#333",
              textAlign: "left",
            }}
          >
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/")}
                style={buttonStyles("/")}
                className="bg-gray-900"
              >
              🏠
              </button>
            </li>
           <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/recommandation")}
                style={buttonStyles("/recommandation")}
              >
           💡 

              </button>
            </li>
           
          </ul>
        </nav></>) } */}
      </div>
    </div>
  ) : (
    // EXPANDED SIDEBAR
    <div className="p-4 mt-1 h-[90%] overflow-y-auto custom-scrollbar overflow-x-hidden w-72 transition-all duration-200">
      <div className="flex justify-end">
        <button
          onClick={() => setCollapsed(true)}
          className="text-white text-xl p-2 focus:outline-none"
          aria-label="Collapse sidebar"
        >
          «
        </button>
      </div>
      <div style={{ textAlign: "center", marginTop: "5px" }}>
        <img
          src={Bank}
          alt="Bank Logo"
          style={{
            width: "45%",
            height: "105px",
            display: "block",
            margin: "0 auto",
            transition: "all 0.2s",
          }}
        />
      {/*  {selectedRole==='employee' ? (<> 
         <nav
          className="bg-[#2d325c]"
          style={{
            marginTop: "20px",
            padding: "6px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              color: "#333",
              textAlign: "left",
            }}
          >
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/")}
                style={buttonStyles("/")}
                className="bg-gray-900"
              >
              🏠 Overview
              </button>
            </li>
           <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/recommandation")}
                style={buttonStyles("/recommandation")}
              >
           💡 Recommandation

              </button>
            </li>
              <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/configuration")}
                style={buttonStyles("/configuration")}
              >
           ⚙️ configuration


              </button>
            </li>
          </ul>
        </nav>
        </>)
        : (<>  <nav
          className="bg-[#2d325c]"
          style={{
            marginTop: "20px",
            padding: "6px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "0",
              margin: "0",
              color: "#333",
              textAlign: "left",
            }}
          >
            <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/")}
                style={buttonStyles("/")}
                className="bg-gray-900"
              >
              🏠 Overview
              </button>
            </li>
           <li style={{ fontSize: "1.25rem", margin: "8px 0" }}>
              <button
                onClick={() => navigate("/recommandation")}
                style={buttonStyles("/recommandation")}
              >
           💡 Recommandation

              </button>
            </li>
           
          </ul>
        </nav></>) }*/}
      </div>
    </div>
  )}
  </div>
  )
};

export default Sidebar;
