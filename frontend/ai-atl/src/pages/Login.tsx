import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/landing");
  };

  // Define a type for the Cloud component's props
  interface CloudProps {
    left: number;
    top: number;
    delay: number;
  }

  // Cloud component with typed props
  const Cloud: React.FC<CloudProps> = ({ left, top, delay }) => (
    <div
      className="cloud"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
      }}
    />
  );

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-blue-700 overflow-hidden">
      {/* Cloud Background - Top Half */}
      <Cloud left={10} top={20} delay={0} />
      <Cloud left={30} top={10} delay={1} />
      <Cloud left={50} top={30} delay={2} />
      <Cloud left={70} top={20} delay={1.5} />
      <Cloud left={90} top={15} delay={2.5} />

      {/* Cloud Background - Bottom Half */}
      <Cloud left={15} top={60} delay={0.5} />
      <Cloud left={35} top={70} delay={1.2} />
      <Cloud left={55} top={80} delay={1.8} />
      <Cloud left={75} top={75} delay={2.2} />
      <Cloud left={85} top={65} delay={1.4} />

      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative z-10">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">
          {" "}
          Nationwide.
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
          />
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

      {/* Inline CSS for Cloud Animation */}
      <style>
        {`
          .cloud {
            position: absolute;
            width: 100px;
            height: 60px;
            background: white;
            border-radius: 50%;
            box-shadow: 50px 20px 0 -15px rgba(255, 255, 255, 0.6),
                        -50px 20px 0 -15px rgba(255, 255, 255, 0.6);
            opacity: 0.8;
            animation: bounce 5s infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
