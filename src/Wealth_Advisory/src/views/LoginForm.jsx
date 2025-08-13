import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = ({
  handleChange,
  formSubmitter,
  togglePasswordVisibility,
  passwordVisible,
  category,
  setCategory,
  isLoading,
}) => {
  return (
    <form onSubmit={formSubmitter} className="space-y-6">
      {/* Select Role Field */}
   

      {/* Username Field */}
 <div>
  <label
    htmlFor="username"
    style={{
      display: 'block',
      fontSize: '0.875rem', // equivalent to text-sm
      fontWeight: '600', // equivalent to font-semibold
      marginBottom: '0.5rem', // equivalent to mb-2
      color: '#475569', // equivalent to text-slate-700
    }}
  >
    Username
  </label>
  <input
    type="text"
    id="username"
    name="email"
    placeholder="Enter your username"
    onChange={handleChange}
    required
    style={{
      width: '100%', // equivalent to w-full
      padding: '12px', // equivalent to px-4 py-3
      border: '2px solid #cbd5e1', // equivalent to border-2 border-slate-300
      borderRadius: '0.75rem', // equivalent to rounded-xl
      backgroundColor: '#ffffff', // equivalent to bg-white
      color: '#1e293b', // equivalent to text-slate-900
      boxSizing: 'border-box', // Ensures padding and border are within the width
      margin: '0', // Removes any default margin
    }}
    autoComplete="username"
  />
</div>
<div>
  <label
    htmlFor="password"
    style={{
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.5rem',
      color: '#475569',
    }}
  >
    Password
  </label>
  <input
    type="password"
    id="password"
    name="password"
    placeholder="Enter your password"
    onChange={handleChange}
    required
    style={{
      width: '100%',
      padding: '12px',
      border: '2px solid #cbd5e1',
      borderRadius: '0.75rem',
      backgroundColor: '#ffffff',
      color: '#1e293b',
      boxSizing: 'border-box',
      margin: '0',
    }}
    autoComplete="current-password"
  />
</div>




      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/50 shadow-lg hover:shadow-xl ${
          isLoading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
            Signing in...
          </div>
        ) : (
          "Sign In to Dashboard"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
