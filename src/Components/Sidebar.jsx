import { Link } from "react-router-dom";
import { BiUser, BiMoviePlay, BiLogOut } from "react-icons/bi";
import { GiGamepad } from "react-icons/gi";
import { useContext } from "react";
import { UserContext } from "../User/UserContext";
import { logout } from "../User/UserReducer";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

const Sidebar = () => {
  const { darkMode, setDarkMode, userDispatch } = useContext(UserContext);
  return (
    <div className="drawer-side">
      <label htmlFor="drawer" className="drawer-overlay bg-base-100"></label>
      <aside
        className="w-52 h-full z-50 items-center content-center bg-base-content md:bg-transparent border-r border-base-200"
        aria-label="Sidebar"
      >
        <div className="overflow-y-auto py-4 px-1 relative h-full">
          <Link
            to="/"
            className="normal-case text-2xl active:bg-orange-50 my-2 px-4 font-extrabold"
          >
            Film<span className="text-red-500">&</span>
            <span className="font-bold">Game</span>
          </Link>
          <div className="h-12" />
          <ul className="p-0 px-2 overflow-y-auto gap-4 menu menu-compact flex flex-col">
            <li>
              <Link to={`/dashboard`} className="btn btn-ghost justify-start flex normal-case">
                <BiUser />
                <span className="ml-1">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/movies/create`}
                className="btn btn-ghost justify-start flex normal-case"
              >
                <BiMoviePlay />
                <span className="ml-1">Input Movies</span>
              </Link>
            </li>
            <li>
              <Link to={`/games/create`} className="btn btn-ghost justify-start flex normal-case">
                <GiGamepad />
                <span className="ml-1">Input Games</span>
              </Link>
            </li>
            <li>
              <label onClick={() => setDarkMode(!darkMode)} className="btn btn-ghost justify-start flex normal-case">
                {darkMode ? (<BsSunFill />) : (<BsMoonFill />)}
                <span className="ml-1">Change Theme</span>
              </label>
            </li>
            <li>
              <label
                className="btn btn-ghost justify-start flex normal-case"
                onClick={() => userDispatch(logout())}
              >
                <BiLogOut />
                <span className="ml-1">Logout</span>
              </label>
            </li>
          </ul>
          <h2 className="text-center text-xs bottom-0 w-full absolute">&copy; 2022 - Azmi</h2>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
