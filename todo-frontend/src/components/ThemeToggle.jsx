import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setAnimate(true);
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAnimationEnd = () => {
    setAnimate(false);
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xl relative focus:outline-none cursor-pointer mt-1"
      aria-label="Toggle theme"
    >
      <span
        className={`inline-block transition-transform duration-500 ease-in-out ${
          animate ? "animate-rotate" : ""
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        {theme === "light" ? (
          <FaMoon className="text-gray-700 dark:text-gray-200 transition-colors duration-500" />
        ) : (
          <FaSun className="text-yellow-400 transition-colors duration-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
