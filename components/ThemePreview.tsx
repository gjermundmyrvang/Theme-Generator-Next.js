"use client";

import { HouseIcon } from "./icons";

interface ThemePreviewProps {
  colors: Record<string, string>;
  title: string;
}

export default function ThemePreview({ colors, title }: ThemePreviewProps) {
  const baseKeys = [
    "background",
    "foreground",
    "card",
    "primary",
    "muted",
    "border",
    "destructive",
  ];

  // Get all custom colors added by the user
  const customColorKeys = Object.keys(colors).filter(
    (key) => !baseKeys.includes(key),
  );
  // We map the state object to actual CSS variables
  const variableStyles = Object.entries(colors).reduce(
    (acc, [key, value]) => {
      acc[`--${key}`] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return (
    <div
      style={variableStyles as React.CSSProperties}
      className="p-8 rounded-3xl border border-border bg-background text-foreground transition-all duration-300"
    >
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
        Preview: {title}
      </p>

      <div className="space-y-6">
        {/* --- CARD COMPONENT --- */}
        {/* Uses: bg-card, border-border */}
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            {/* Uses: bg-primary */}
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <HouseIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">Dashboard Card</h4>
              <p className="text-xs text-muted-foreground">
                Standard card component
              </p>
            </div>
          </div>

          {/* Uses: bg-muted */}
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div className="bg-primary h-full w-2/3" />
          </div>
        </div>

        {/* --- BUTTONS & TAGS --- */}
        <div className="flex flex-wrap gap-2">
          {/* Uses: bg-primary, text-white */}
          <button className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-md hover:opacity-80 cursor-pointer transition-opacity duration-300">
            Primary
          </button>

          {/* Uses: bg-muted, text-foreground */}
          <button className="px-4 py-2 bg-muted text-foreground text-xs font-bold rounded-lg border border-border cursor-not-allowed">
            Muted
          </button>

          {/* Uses: bg-destructive, text-foreground */}
          <button className="px-4 py-2 bg-destructive text-black rounded-lg font-bold text-xs hover:opacity-80 transition-all cursor-pointer">
            Delete
          </button>

          {/* Uses: bg-primary/10 (alpha), text-primary */}
          <span className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 text-center">
            Active Tag
          </span>
        </div>

        {/* --- DUMMY TABLE/LIST --- */}
        <div className="space-y-2 pt-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <span className="text-sm font-medium">System Update {i}</span>
              <span className="text-xs text-muted-foreground">Just now</span>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC CUSTOM COLORS SECTION --- */}
        {customColorKeys.length > 0 && (
          <div className="pt-6 border-t border-border">
            <p className="text-[9px] font-bold uppercase text-muted-foreground mb-3 tracking-widest">
              Custom Variables
            </p>
            <div className="flex flex-wrap gap-4">
              {customColorKeys.map((key) => (
                <div
                  key={key}
                  className="flex flex-col items-center gap-2 group"
                >
                  {/* The Circle using the custom variable */}
                  <div
                    style={{ backgroundColor: `var(--${key})` }}
                    className="w-10 h-10 rounded-full shadow-sm group-hover:scale-110 transition-transform"
                    title={`var(--${key})`}
                  />
                  <span className="text-[9px] font-mono font-bold opacity-60">
                    {key}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
