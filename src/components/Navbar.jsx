import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../api";
import Spinner from "../components/Spinner";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navoptions = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/product" },
    { label: "Policy", url: "/Policy" },
    { label: "Contact", url: "/contact" },
  ];

  const [spinnerstatus, setSpinnerstatus] = useState(false);
  const [userloggedin, setUserloggedin] = useState(false);
  const checkaccountlogin = async () => {
    setSpinnerstatus(true);

    try {
      const responce = await api.get("/api/user/checklogin");
      console.log(responce.data, "responce in checkaccountlogin function");
      if (responce.data.success == true) {
        setUserloggedin(true);
        console.log("user is logged in");
      }
    } catch (error) {
      console.log(error, "error in checkaccountlogin function");
    } finally {
      // Always set spinner to false when done, regardless of success or failure
      setSpinnerstatus(false);
    }
  };

  useEffect(() => {
    checkaccountlogin();
  }, []);

  const navigate = useNavigate();

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--maintextcolor)" }}
            >
              ReReader
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="ml-10 flex items-baseline space-x-4">
              {navoptions.map((option, index) => (
                <NavLink
                  key={index}
                  to={option.url}
                  className={({ isActive }) =>
                    isActive
                      ? "text-[var(--maintextcolor)] border-b-2 border-[var(--maintextcolor)] block px-3 py-2  text-base font-medium"
                      : "text-[var(--btn-color)] hover:text-[var(--maintextcolor)] block px-3 py-2 rounded-md text-base font-medium"
                  }
                >
                  {option.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side - Search and Login */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 ring-[var(--btn-color)] text-sm"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-[var(--btn-color)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            {spinnerstatus ? (
              <Spinner />
            ) : userloggedin ? (
              <button
                onClick={() => navigate("/userdashboard")}
                className="bg-[var(--btn-color)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[var(--maintextcolor)]"
              >
                Account
              </button>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="bg-[var(--btn-color)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[var(--maintextcolor)]"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--btn-color)] hover:text-[var(--maintextcolor)] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navoptions.map((option, index) => (
              <NavLink
                key={index}
                to={option.url}
                className={({ isActive }) =>
                  isActive
                    ? "text-[var(--maintextcolor)] border-b-2 border-[var(--maintextcolor)] block px-3 py-2 text-base font-medium"
                    : "text-[var(--btn-color)] hover:text-[var(--maintextcolor)] block px-3 py-2 rounded-md text-base font-medium"
                }
              >
                {option.label}
              </NavLink>
            ))}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 ring-[var(--btn-color)] text-sm"
              />
            </div>
            {/* Mobile menu login/account button */}
            {spinnerstatus ? (
              <Spinner />
            ) : userloggedin ? (
              <button
                onClick={() => navigate("/userdashboard")}
                className="mt-4 w-full bg-[var(--btn-color)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[var(--maintextcolor)]"
              >
                Account
              </button>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="mt-4 w-full bg-[var(--btn-color)] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[var(--maintextcolor)]"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
