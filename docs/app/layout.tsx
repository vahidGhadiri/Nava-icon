import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nava Icons",
    template: "%s — Nava Icons",
  },
  description: "Professional open-source icon library. SVG source of truth, framework-agnostic.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100 min-h-screen antialiased">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
