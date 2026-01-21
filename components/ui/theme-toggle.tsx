"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LaptopIcon } from "../icons/LaptopIcon";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-3 w-10 h-10 bg-primary animate-pulse" />;
  }

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const iconClass = "w-5 h-5 sm:w-10 sm:h-10";

  const getIcon = () => {
    if (theme === "light")
      return <SunIcon className={`${iconClass} text-amber-500`} />;
    if (theme === "dark")
      return <MoonIcon className={`${iconClass} text-blue-400`} />;
    return <LaptopIcon className={`${iconClass} text-muted`} />;
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 sm:p-4 rounded-full border border-border bg-card hover:bg-primary/20 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      {getIcon()}
    </button>
  );
}
