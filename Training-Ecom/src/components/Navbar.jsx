import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import me from "../assets/Sneakers.webp";
import { AuthContext } from "../Utils/authContext";
import { FaUserAlt } from "react-icons/fa";

export default function Navbar({ menu }) {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-500 sticky w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          
          <span className="self-center text-2xl text-heading font-semibold whitespace-nowrap">
            MyStore
          </span>
        </Link>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

          {/* USER MENU WRAPPER */}
          <div className="relative">

            {/* USER BUTTON */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="flex text-sm bg-neutral-primary rounded-full p-4 md:me-0 focus:ring-2 focus:ring-neutral-tertiary"
            >
              <span className="sr-only">Open user menu</span>

              {user ? (
                <img
                  className="w-8 h-8 rounded-full"
                  src={user.photo || me}
                  alt="user"
                />
              ) : (
                <FaUserAlt />
              )}
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute top-full right-0 mt-6 z-50 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44">

                {/* USER INFO */}
                {user && (
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {user.name}
                    </span>
                    <span className="block text-body truncate">
                      {user.email}
                    </span>
                  </div>
                )}

                <ul className="p-2 text-sm text-body font-medium">

                  {/* USER LOGGED IN */}
                  {user ? (
                    <>
                      <li>
                        <Link
                          to="/profile"
                          className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/settings"
                          className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        >
                          Settings
                        </Link>
                      </li>

                      <li>
                        <button
                          onClick={logout}
                          className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/login"
                          className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        >
                          Login
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/register"
                          className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        >
                          Create Account
                        </Link>
                      </li>
                    </>
                  )}

                </ul>
              </div>
            )}

          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          >
            <span className="sr-only">Open main menu</span>

            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>

        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">

            {menu.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
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