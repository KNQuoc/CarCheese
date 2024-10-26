import React from "react";
import Logo from "../assets/Logo.jpg";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavbarDropdown = () => [
  { id: 1, name: "Profile", link: "/#" },
  { id: 2, name: "Settings", link: "/#" },
  { id: 3, name: "Logout", link: "/#" },
];
const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-blue-900 p-4 rounded-md shadow-md relative group cursor-pointer">
        <div className="text-white text-3x1 font-bold">app.</div>
        <div>
          <img
            src={Logo}
            alt="profile"
            className="w-10 h-10 rounded-full border-2 border-white"></img>
          <span>
            <FaCaretDown className="transition-all duration-200 group-hover"></FaCaretDown>
          </span>
          <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
            <ul>
              {NavbarDropdown().map((data) => (
                <li key={data.id}>
                  <a href={data.link}>{data.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Project Card Main */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 bg-white p-8 rounded-md shadow-md">
        {/*Project Card 1*/}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
          <div className="absolute top-2 right-2 bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
            <span>+</span>
          </div>
          <h2 className="text-x1 font-semibold mb-2">BRANE GAMES!</h2>
          <p className="text-gray-700 mb-2">
            <span className="text-blue-600">
              <Link to="/branegames">click on me!</Link>
            </span>
          </p>
          <img src={Logo} alt="emoji" className="w-12 h-12"></img>{" "}
          {/* Placeholder Logo */}
        </div>
        {/*Project Card 2*/}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
          <div className="absolute top-2 right-2 bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
            <span>+</span>
          </div>
          <h2 className="text-x1 font-semibold mb-2">LocationMe!</h2>
          <p className="text-gray-700 mb-2">
            <span className="text-blue-600">
              <Link to="/locationme">click on me!</Link>
            </span>
          </p>
          <img src={Logo} alt="emoji" className="w-12 h-12"></img>{" "}
          {/* Placeholder Logo */}
        </div>
        {/*Project Card 3*/}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
          <div className="absolute top-2 right-2 bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
            <span>+</span>
          </div>
          <h2 className="text-x1 font-semibold mb-2">3 Active Projects</h2>
          <p className="text-gray-700 mb-2">
            <span className="text-blue-600">Industry: Technology</span>
          </p>
          <img src={Logo} alt="emoji" className="w-12 h-12"></img>{" "}
          {/* Placeholder Logo */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
