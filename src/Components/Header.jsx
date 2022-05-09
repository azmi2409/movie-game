import { UserContext } from "../User/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-daisyui";
import { logout } from "../User/UserReducer";
import { SVG } from "../Assets/SVG";

const Header = () => {
  const { darkMode, setDarkMode, userData } =
    useContext(UserContext);
  const { isLoggedIn } = userData;

 /* const handleLogout = () => {
    userDispatch(logout());
  };*/

  return (
    <div
      className="
      sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 items-center p-5"
    >
      <Navbar className="navbar w-full">
        <div className="navbar-start">
          {!isLoggedIn ? (
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl active:bg-orange-50"
            >
              Film<span className="text-red-500">&</span>
              <span className="text-white font-bold">Game</span>
            </Link>
          ) : (
              <span
                className="tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]"
                data-tip="Menu"
              >
                <label
                  htmlFor="drawer"
                  className="btn btn-square btn-ghost drawer-button lg:hidden"
                >
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </span>
          )}
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal p-1 gap-2">
            <li tabIndex={0} className="menu-item">
              <Link
                to="/movies"
                className="btn btn-ghost normal-case text-lg content-center md:text-xl"
              >
                Movies
              </Link>
            </li>
            <li tabIndex={0} className="menu-item">
              <Link
                to="/games"
                className="btn btn-ghost normal-case text-lg content-center md:text-xl relative"
              >
                Games
                <div className="badge badge-sm gap-2 absolute top-0 right-0 bg-red-500 border-0">
                New
              </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end hidden md:flex">
          <ul className="menu menu-horizontal p-1 gap-2">
            {!isLoggedIn && (
              <>
                <li tabIndex={0} className="menu-item">
                  <Link
                    to="/signin"
                    className="btn btn-ghost normal-case text-xl content-center"
                  >
                    Sign In
                  </Link>
                </li>
                <li tabIndex={0} className="menu-item">
                  <Link
                    to="/signup"
                    className="btn btn-ghost bg-current normal-case text-xl content-center"
                  >
                    <span className="text-accent">Sign Up</span>
                  </Link>
                </li>
              </>
            )}
            <li
              onClick={() => setDarkMode(!darkMode)}
              tabIndex={0}
              className="menu-item"
            >
              <label className="content-center">{SVG(darkMode)}</label>
            </li>
          </ul>
        </div>
      </Navbar>
    </div>
  );
};

export default Header;
