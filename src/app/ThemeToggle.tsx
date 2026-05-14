"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch (_) {}
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        const t = nextTheme;
        setTheme(t);
        applyTheme(t);
      }}
    >
      {theme === "dark" ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </button>
  );
}
