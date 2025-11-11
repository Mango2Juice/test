// /src/components/theme-provider.tsx

'use client'

import type { ThemeProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Provides theme context to its children by rendering a theme provider with the given props.
 *
 * @param children - React nodes to be rendered inside the theme provider
 * @param props - Props for the theme provider (matching `ThemeProviderProps` from `next-themes`)
 * @returns A React element that renders `children` within the configured theme provider
 */
export function ThemeProvider({ children, ...props }: Readonly<ThemeProviderProps>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}