import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import {
  FiLogOut,
  FiPlus,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 dark:text-white tracking-wide"
      >
        Todo App
      </Link>

      {/* Center: Theme Toggle */}
      <div className="hidden md:flex items-center space-x-4">
        {user && (
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Hello, {user?.name}
          </span>
        )}
        <ThemeToggle />
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-800 dark:text-white text-2xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Right: Actions */}
      <div className="hidden md:flex items-center gap-3">
        {user ? (
          <>
            <button
              onClick={() => navigate("/add")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm"
            >
              <FiPlus className="w-4 h-4" />
              Add Task
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition text-sm"
            >
              <FiLogOut className="w-4 h-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm"
            >
              <FiLogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition text-sm"
            >
              <FiUserPlus className="w-4 h-4" />
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col items-start space-y-3 md:hidden z-40">
          {user && (
            <span className="text-base font-semibold text-gray-800 dark:text-gray-200">
              Hello, {user?.name}
            </span>
          )}
          <ThemeToggle />
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/add");
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm w-full"
              >
                <FiPlus className="w-4 h-4" />
                Add Task
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition text-sm w-full"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition text-sm w-full"
              >
                <FiLogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition text-sm w-full"
              >
                <FiUserPlus className="w-4 h-4" />
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
