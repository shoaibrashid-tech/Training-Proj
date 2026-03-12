import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Disclosure, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline';
import { AuthContext } from "../Utils/authContext";
import me from "../assets/Sneakers.webp";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ menu }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <Disclosure as="nav" className="bg-blue-500 sticky top-0 w-full z-30 shadow-md">
      {({ open }) => (
        <>
          <div className=" mx-auto px-8 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-white">
                  MyStore
                </Link>
              </div>

              {/* Desktop Menu */}
              <div className="hidden w-full mx-20 md:flex md:space-x-4">
                {menu.map((item, idx) => (
                  <NavLink
                    key={idx}
                    to={item.href}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive 
                          ? "bg-white text-black" // Styles for the active state
                          : "text-white hover:bg-white/20" // Styles for inactive state
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              {/* Right Icons */}
              <div className="flex w-1/4 flex justify-end items-center md:order-2 space-x-3">
                

                {/* User Menu */}
                <Menu as="div" className="relative">
                  <MenuButton className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    {user ? (
                      <img className="h-8 w-8 rounded-full" src={user.photo || me} alt="user" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-white text-blue-500 flex items-center justify-center font-bold">
                        U
                      </div>
                    )}
                  </MenuButton>

                  <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg py-1 focus:outline-none z-50">
                    {user ? (
                      <>
                        <MenuItem>
                          {({ active }) => (
                            <button
                              onClick={logout}
                              className={classNames(active ? "bg-gray-100" : "", "w-full text-left block px-4 py-2 text-sm text-gray-700")}
                            >
                              Logout
                            </button>
                          )}
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                            >
                              Login
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <Link
                              to="/register"
                              className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}
                            >
                              Create Account
                            </Link>
                          )}
                        </MenuItem>
                      </>
                    )}
                  </MenuItems>
                </Menu>

                {/* Mobile menu button */}
                <Disclosure.Button className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden bg-blue-500">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menu.map((item, idx) => (
                <Disclosure.Button
                  key={idx}
                  as={Link}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/20"
                >
                  {item.label}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}