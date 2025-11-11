// src/app/layout.tsx
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import type React from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { PersistentStorageRegistrar } from '@/components/persistent-storage-registrar'
import { ServiceWorkerRegistrar } from '@/components/service-worker-registrar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { StoreInitializer } from '@/lib/stores/store-initializer'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  applicationName: 'Doses',
  title: 'Doses - Medication Dose Calculator',
  description: 'Calculate medication doses accurately and safely for adults and children.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Doses',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#26A69A' },
    { media: '(prefers-color-scheme: dark)', color: '#39B8AA' },
  ],
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
}

/**
 * Provides the root HTML layout for the application, wrapping app content with global theming, layout, storage/service worker registrars, and analytics.
 *
 * @param children - The application content to render inside the main AppLayout
 * @returns The top-level `<html>` React element tree used as the app's document root
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): React.ReactElement {
  return (
    <html lang='en' className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning={true}>
      <head>{/* PWA-related meta tags are handled by the Metadata object */}</head>
      <body className='flex flex-col min-h-screen antialiased bg-background'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem={true} themes={['light', 'dark', 'system']}>
          <StoreInitializer />
          <AppLayout>{children}</AppLayout>
          <Toaster />
          <ServiceWorkerRegistrar />
          <PersistentStorageRegistrar />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}