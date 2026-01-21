import { CodeBlock } from "./ui/code-block";

const layoutCode = `export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

const themeProvider = `"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
children,
...props
}: React.ComponentProps<typeof NextThemesProvider>) {
return <NextThemesProvider {...props}>{children}</NextThemesProvider>};`;

export default function Guide() {
  return (
    <section className="mt-16 mb-16 border-t border-border pt-12">
      <h2 className="text-3xl font-bold  uppercase tracking-tighter my-4">
        Implementation Guide
      </h2>
      <div className="grid gap-8 text-sm md:text-base">
        <div className="space-y-3">
          <h3 className="font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[16px] text-white">
              1
            </span>
            Install Dependency
          </h3>
          <p className="text-muted-foreground ml-8">
            Install <code className="text-primary font-mono">next-themes</code>{" "}
            to handle the dark mode switching logic in your Next.js application.
          </p>
          <div className="ml-8">
            <CodeBlock code="npm install next-themes" />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[16px] text-white">
              2
            </span>
            Create ThemeProvider
          </h3>
          <div className="ml-8 space-y-4">
            <CodeBlock code={themeProvider} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[16px] text-white">
              3
            </span>
            Configure Layout
          </h3>
          <div className="ml-8 space-y-4">
            <p className="text-muted-foreground">
              Wrap your root layout with the{" "}
              <code className="text-primary font-mono bg-primary/5 px-1 rounded">
                ThemeProvider
              </code>
              . Ensure{" "}
              <code className="text-primary font-mono bg-primary/5 px-1 rounded">
                suppressHydrationWarning
              </code>{" "}
              is added to the html tag to prevent hydration mismatches.
            </p>

            <CodeBlock code={layoutCode} />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[16px] text-white">
              4
            </span>
            Update Global CSS
          </h3>
          <p className="text-muted-foreground ml-8">
            Paste the generated code from this tool into your{" "}
            <code className="text-primary font-mono">globals.css</code>. This
            setup uses Tailwind v4&apos;s native variable mapping.
          </p>
        </div>
      </div>
    </section>
  );
}
