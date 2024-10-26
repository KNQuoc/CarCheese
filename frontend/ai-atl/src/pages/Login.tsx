import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/landing");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-blue-700">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
          {" "}
          app.
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-blue-800 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="ihaveaname@gmail.com"
            className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Password */}
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="PLEASE SAVE ME"
            className="shadow appearance-none border rounder w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"></input>
        </div>
        {/* Button */}
        <div className="flex justify-between">
          <button
            onClick={handleLogin}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Log in
          </button>
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
