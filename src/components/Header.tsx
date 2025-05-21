import { Avatar } from "antd";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import userImage from "../assets/tue2255.jpg";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const NavLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "Transfer", path: "/transfer" },
    { name: "Referral", path: "/referral" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-sm">
      <div className="w-[95%] max-w-7xl mx-auto py-4 flex justify-between items-center">
        {/* Brand */}
        <div className="flex items-center gap-2 text-white font-semibold text-xl">
          <span className="bg-white text-blue-600 rounded-full px-2 py-1 font-bold">
            W
          </span>
          WealthWave
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white mb-1 transition-all ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white mb-1 transition-all ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-white transition-all ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          {NavLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `relative transition font-medium ${
                  isActive
                    ? "text-white after:absolute after:left-0 after:-bottom-1 after:w-full after:h-0.5 after:bg-white"
                    : "text-blue-100 hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-400 transition">
            <FiSearch size={18} />
          </button>
          <button className="rounded-full bg-blue-500 p-2 hover:bg-blue-400 transition">
            <FaBell size={18} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition">
            <Avatar size="small" src={userImage} />
            <span className="text-sm font-medium hidden sm:inline">
              Stephen Appiah
            </span>
            <IoIosArrowDown size={18} className="hidden sm:inline" />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600/95 px-6 pb-4 pt-2">
          <nav className="flex flex-col gap-4">
            {NavLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `transition font-medium ${
                    isActive
                      ? "text-white underline"
                      : "text-blue-100 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}