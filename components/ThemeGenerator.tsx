"use client";

import { useState } from "react";
import CopyButton from "./ui/copy-button";
import { ColorIcon, TrashIcon } from "./icons";
import ThemePreview from "./ThemePreview";

export default function ThemeGenerator() {
  const defaultKeys = ["background", "foreground"];
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  const [light, setLight] = useState<Record<string, string>>({
    background: "#fafafa",
    foreground: "#0f172a",
    card: "#ffffff",
    primary: "#4f46e5",
    muted: "#f1f5f9",
    border: "#e2e8f0",
    destructive: "#ff6467",
  });

  const [dark, setDark] = useState<Record<string, string>>({
    background: "#020617",
    foreground: "#f8fafc",
    card: "#0f172a",
    primary: "#6366f1",
    muted: "#1e293b",
    border: "#1e293b",
    destructive: "#ff6467",
  });

  // Dynamically rendering variables
  const renderVariables = (themeState: Record<string, string>) => {
    return Object.entries(themeState)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join("\n");
  };

  // Dynamically rendering @theme inline
  const renderThemeColors = () => {
    return Object.keys(light)
      .map((key) => `  --color-${key}: var(--${key});`)
      .join("\n");
  };

  const generatedCSS = `@import "tailwindcss";

:root {
${renderVariables(light)}
}

.dark {
${renderVariables(dark)}
}

@theme inline {
${renderThemeColors()}
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}`;

  const updateColor = (theme: "light" | "dark", key: string, value: string) => {
    if (theme === "light") {
      setLight((prev) => ({ ...prev, [key]: value }));
    } else {
      setDark((prev) => ({ ...prev, [key]: value }));
    }
  };

  const addColor = () => {
    const formattedName = newName.toLowerCase().trim().replace(/\s+/g, "-");

    if (formattedName && !light[formattedName]) {
      setLight((prev) => ({ ...prev, [formattedName]: "#3b82f6" }));
      setDark((prev) => ({ ...prev, [formattedName]: "#3b82f6" }));
      setNewName("");
      setIsAdding(false);
    }
  };

  const removeColor = (key: string) => {
    if (defaultKeys.includes(key)) {
      alert("Cannot delete base theme colors!");
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _unused, ...newLight } = light;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _unused2, ...newDark } = dark;
    setLight(newLight);
    setDark(newDark);
  };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-4 mt-4">
        <h2 className="text-3xl font-bold  uppercase tracking-tighter">
          Color Picker
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 font-mono">
          {[
            {
              title: "Light Theme (:root)",
              state: light,
              type: "light" as const,
            },
            { title: "Dark Theme (.dark)", state: dark, type: "dark" as const },
          ].map((column) => (
            <div
              key={column.type}
              className="space-y-4 p-6 rounded-2xl border border-border bg-card shadow-sm"
            >
              <h3 className="text-xl font-bold border-b border-border pb-3 mb-4 ">
                {column.title}
              </h3>
              {Object.entries(column.state).map(([key, value]) => (
                <div
                  key={key}
                  className="group flex items-center justify-between gap-4 p-2 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-bold opacity-70">
                      {key}
                    </label>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground">
                        {value.toUpperCase()}
                      </span>
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-border shadow-inner">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) =>
                            updateColor(column.type, key, e.target.value)
                          }
                          className="absolute -inset-2 w-16 h-16 cursor-pointer border-none bg-transparent"
                        />
                      </div>
                      {!defaultKeys.includes(key) && (
                        <button
                          onClick={() => removeColor(key)}
                          className="hover:scale-125 transition-all cursor-pointer text-muted hover:text-red-600"
                          title="Delete color"
                        >
                          <TrashIcon className="w-10 h-10" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* ADD COLOR SECTION */}
        <div className="flex justify-start items-center gap-2 h-10">
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="h-full px-6 rounded-full bg-primary cursor-pointer hover:opacity-90 transition-all font-mono text-white font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <ColorIcon className="text-white w-4 h-4" />
              Add custom color
            </button>
          ) : (
            <div className="flex items-center gap-2 h-full animate-in fade-in slide-in-from-left-2 duration-200">
              <input
                autoFocus
                type="text"
                placeholder="e.g. accent"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addColor()}
                className="h-full px-4 rounded-xl border-2 border-border bg-background font-mono text-sm outline-none w-48 focus:border-primary"
              />
              <button
                onClick={addColor}
                className="h-full px-4 bg-primary text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all cursor-pointer"
              >
                Add
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewName("");
                }}
                className="h-full px-4 bg-destructive text-muted-foreground rounded-xl font-bold text-sm hover:opacity-80 transition-all cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PREVIEW SECTION */}
      <div className="mt-12 space-y-6">
        <h2 className="text-3xl font-bold  uppercase tracking-tighter">
          Live Preview
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ThemePreview colors={light} title="Light Mode" />
          <ThemePreview colors={dark} title="Dark Mode" />
        </div>
      </div>

      {/* CSS OUTPUT BOX */}
      <div className="w-full flex justify-between items-center mt-16 mb-4 border-t border-border pt-12">
        <h4 className="text-sm font-mono uppercase tracking-widest">
          Output: <span className="text-primary font-bold">globals.css</span>
        </h4>
        <CopyButton textToCopy={generatedCSS} />
      </div>
      <pre className="text-xs md:text-sm overflow-x-auto font-mono leading-relaxed p-4 rounded border border-border text-primary shadow-sm">
        {generatedCSS}
      </pre>
    </section>
  );
}
