import Guide from "@/components/Guide";
import { InfoIcon } from "@/components/icons";
import ThemeGenerator from "@/components/ThemeGenerator";
import ThemeToggle from "@/components/ui/theme-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-full font-sans">
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between my-4 gap-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold">
            Theme Generator for Next.js
          </h1>
          <ThemeToggle />
        </div>
        <div className="mt-6 p-4 rounded-xl border border-primary/10 bg-primary/5 shadow-sm relative">
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            <span className="font-bold text-foreground">Quick Start:</span>{" "}
            Select your base colors for both themes and watch the code update.
            Copy the
            <code className="mx-1 px-1.5 py-0.5 rounded font-mono text-primary border border-border font-bold">
              globals.css
            </code>
            output, wrap your app in a
            <Link
              href="https://github.com/pacocoursey/next-themes"
              target="_blank"
              className="mx-1 font-mono font-bold text-foreground underline decoration-primary/30 hover:decoration-primary transition-colors"
            >
              next-themes
            </Link>
            provider, and you are good to go!
          </p>
          <div className="bg-card/80 p-2 rounded-full absolute -top-6 -left-2 shadow-sm">
            <InfoIcon className="text-foreground" />
          </div>
        </div>
        <ThemeGenerator />
        <Guide />
      </main>
    </div>
  );
}
