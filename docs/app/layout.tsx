import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { BASE_PATH } from '@/lib/config'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Nava Icons — Professional Open-Source Icon Library',
    template: '%s — Nava Icons',
  },
  description: 'Professional open-source icon library. SVG source of truth, framework-agnostic.',
  icons: {
    icon: `${BASE_PATH}/favicon.svg`,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface-50 text-surface-900 dark:bg-surface-950 dark:text-surface-100 min-h-screen antialiased selection:bg-primary-500/20">
        <ThemeProvider>
          <div className="bg-mesh" aria-hidden="true" />
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
