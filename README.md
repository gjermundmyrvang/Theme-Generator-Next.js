# Theme Generator for Next.js

A lightweight web-based utility for generating dynamic Tailwind CSS v4 themes for Next.js applications using the next-themes library.

## Features

- Real-time CSS generation for light and dark modes.
- Support for standard theme variables (background, foreground, primary, etc.).
- Ability to add and remove custom color variables.
- One-click copy for the generated globals.css file.
- Built-in support for the Tailwind v4 @theme inline syntax.

## Technical Stack

- Framework: Next.js 15+ (App Router)
- Styling: Tailwind CSS v4
- Theme Management: next-themes

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gjermundmyrvang/Theme-Generator-Next.js.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

## Implementation Guide
To use the generated output in your own projects:

1. Copy the code from the generator output.
2. Replace the contents of your app/globals.css with the copied code.
3. Ensure your application is wrapped in a ThemeProvider from next-themes in your root layout:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Usage
- Modify Colors: Use the color pickers or enter hex codes manually to adjust the light and dark themes.
- Add Custom Colors: Click the "Add custom color" button to define new variables like accent or success.
- Export: Click "Copy Code" to get the full globals.css structure including variables and theme mapping.
