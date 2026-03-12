import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import me from "../assets/Sneakers.webp";
import { AuthContext } from "../Utils/authContext";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ menu }) {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
          MyStore
        </Link>

        {/* RIGHT SIDE: USER & MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setOpen(!open)} 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {user ? <img className="w-8 h-8 rounded-full object-cover" src={user.photo || me} alt="user" /> : <FaUserAlt className="text-gray-600" />}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                {user ? (
                  <>
                    {/* Logged in state */}
                    <div className="px-4 py-2 text-xs text-gray-400 border-b truncate">{user.email}</div>
                    <button 
                      onClick={logout} 
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {/* Guest state */}
                    <Link 
                      to="/login" 
                      onClick={() => setOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-gray-700 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* MOBILE MENU (ABSOLUTE POSITIONING) */}
        <div 
          className={`${mobileMenuOpen ? "flex" : "hidden"} 
          absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl 
          md:static md:flex md:w-auto md:bg-transparent md:border-0 md:shadow-none`}
        >
          <ul className="flex flex-col w-full md:flex-row md:items-center p-4 md:p-0 gap-2">
            {menu.map((item, index) => (
              <li key={index}>
                <Link 
                  to={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}