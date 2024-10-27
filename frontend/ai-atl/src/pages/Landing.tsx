import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

const Landing: React.FC = () => {
  const navbarDropdownOptions: { id: number; name: string; link: string }[] = [
    { id: 1, name: "Profile", link: "/#" },
    { id: 2, name: "Settings", link: "/#" },
    { id: 3, name: "Logout", link: "/#" },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-4 overflow-hidden">
      {/* Clouds Background */}
      <Cloud left={10} top={20} />
      <Cloud left={50} top={40} />
      <Cloud left={80} top={60} />
      <Cloud left={20} top={80} />

      {/* Navbar */}
      <div className="relative flex justify-between items-center bg-blue-900 p-4 rounded-md shadow-md z-10">
        <div className="text-white text-3xl font-bold">Nationwide</div>

        {/* Profile Dropdown */}
        <div className="relative group">
          <div className="flex items-center cursor-pointer">
            <img
              src={Logo}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <FaCaretDown className="ml-1 transition-transform duration-200 group-hover:rotate-180" />
          </div>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-[150px] hidden group-hover:block rounded-md bg-white p-2 text-black shadow-md z-10">
            <ul>
              {navbarDropdownOptions.map((data) => (
                <li key={data.id} className="py-1 hover:bg-gray-200 rounded-md">
                  <a href={data.link} className="block px-2">
                    {data.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Project Card Main */}
      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 bg-white p-8 rounded-md shadow-md z-10">
        <ProjectCard
          title="Customer Profiles!"
          description="click on me!"
          link="/customerprofile"
        />
        <ProjectCard
          title="LocationMe!"
          description="click on me!"
          link="/locationme"
        />
        <ProjectCard
          title="3 Active Projects"
          description="Industry: Technology"
          link="#"
        />
      </div>

      {/* Inline Cloud Animation Styles */}
      <style>
        {`
          .cloud {
            position: absolute;
            width: 150px;
            height: 80px;
            background: white;
            border-radius: 50%;
            box-shadow: 50px 20px 0 -15px rgba(255, 255, 255, 0.6),
                        -50px 20px 0 -15px rgba(255, 255, 255, 0.6);
            opacity: 0.7;
            animation: float 20s linear infinite;
          }

          @keyframes float {
            0% { transform: translateX(-200px); }
            100% { transform: translateX(100vw); }
          }
        `}
      </style>
    </div>
  );
};

// Cloud Component with Position Props
interface CloudProps {
  left: number;
  top: number;
}

const Cloud: React.FC<CloudProps> = ({ left, top }) => (
  <div
    className="cloud"
    style={{
      left: `${left}%`,
      top: `${top}%`,
      animationDuration: `${20 + Math.random() * 10}s`,
      animationDelay: `${Math.random() * 5}s`,
    }}
  />
);

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  link,
}) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
    <div className="absolute top-2 right-2 bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
      <span>+</span>
    </div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-700 mb-2">
      <span className="text-blue-600">
        <Link to={link}>{description}</Link>
      </span>
    </p>
    <img src={Logo} alt="emoji" className="w-12 h-12" />
  </div>
);

export default Landing;
