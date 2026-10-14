"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

/** Przełącznik jasny/ciemny. Wybór zapamiętany w localStorage; domyślnie jasny. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
  };

  const label = theme === "dark" ? "Włącz jasny motyw" : "Włącz ciemny motyw";
  return (
    <button type="button" className="theme-toggle" onClick={toggle} aria-label={label} title={label}>
      {theme === "dark" ? <FiSun size={15} aria-hidden="true" /> : <FiMoon size={15} aria-hidden="true" />}
    </button>
  );
}
