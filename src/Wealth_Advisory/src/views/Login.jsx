import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import LoginForm from "./LoginForm";

const Login = () => {
  const { setMainPage, setlogin1, setSelectedRole } = useStateContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({ email: "", password: "" });
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const formSubmitter = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (input.email !== "admin" || input.password !== "admin") {
      setIsLoading(false);
      return alert("Invalid email or password");
    }

    localStorage.setItem("login", "true");
    setMainPage(true);
    setlogin1(true);
    setSelectedRole(category);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      {/* Left Side - Branding */}
      <div className="flex-1 flex flex-col justify-center items-center p-12 relative overflow-hidden">
        {/* Logo Section */}
        <div className="text-center z-10 max-w-md">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center mb-6 bg-blue-500/10 backdrop-blur-sm">
              <span className="text-5xl">🏛️</span>
            </div>
          </div>

          <h1 className="text-5xl font-bold mb-4 text-slate-800">
            Wealth Advisory
          </h1>

          <p className="text-xl mb-6 text-blue-600">
            Advanced Wealth Advisory AI Dashboard
          </p>

          <p className="text-lg leading-relaxed text-slate-600">
            AI-powered insights for wealth management and strategic financial
            planning
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center p-12 bg-white/80 backdrop-blur-sm">
        <div className="max-w-md mx-auto w-full">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-slate-900">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-600">
              Sign in to access your wealth management dashboard
            </p>
          </div>

          {/* Login Form */}
          <LoginForm
            handleChange={handleChange}
            formSubmitter={formSubmitter}
            togglePasswordVisibility={togglePasswordVisibility}
            passwordVisible={passwordVisible}
            category={category}
            setCategory={setCategory}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
