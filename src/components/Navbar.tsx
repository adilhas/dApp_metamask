import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { setAppTheme } from "../utils/theme";

const Navbar = () => {
  const [theme, setTheme] = useState<string>(() => setAppTheme());

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div className="navbar bg-base-100 shadow-sm w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to="wallet">Wallet</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="mx-1">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-green-500  font-medium"
                  : "hover:border-b-2 hover:border-green-300 text-base-content"
              }
            >
              Home
            </NavLink>
          </li>

          <li className="mx-1">
            <NavLink
              to="/wallet"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-green-500  font-medium"
                  : "hover:border-b-2 hover:border-green-300 text-base-content"
              }
            >
              Wallet
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          className="btn btn-ghost"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <span>🌙</span> : <span>☀️</span>}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
