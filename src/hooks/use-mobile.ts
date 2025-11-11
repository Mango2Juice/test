// /src/hooks/use-mobile.ts

'use client'
import { useEffect, useState } from 'react'
import type { DeviceType, Orientation } from '@/lib/types/device'

const MOBILE_BREAKPOINT = 768 // Corresponds to Tailwind's 'md' breakpoint
const TABLET_BREAKPOINT = 1024 // Corresponds to Tailwind's 'lg' breakpoint

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mql.matches)

    onChange() // Set initial value
    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}

interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  deviceType: DeviceType
  orientation: Orientation
}

export function useDeviceInfo(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    deviceType: 'desktop',
    orientation: 'landscape',
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT

      // Enhanced orientation detection considering aspect ratio
      const orientation: Orientation = height > width ? 'portrait' : 'landscape'

      let deviceType: DeviceType = 'desktop'
      if (isMobile) {
        deviceType = 'mobile'
      } else if (isTablet) {
        deviceType = 'tablet'
      }

      setDeviceInfo({
        isMobile,
        isTablet,
        deviceType,
        orientation,
      })
    }

    // Set initial value
    updateDeviceInfo()

    // Listen for resize events with debouncing for better performance
    let resizeTimeout: NodeJS.Timeout
    const debouncedUpdate = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateDeviceInfo, 150)
    }

    window.addEventListener('resize', debouncedUpdate)

    // Listen for orientation change events with multiple delays to handle different browsers
    const handleOrientationChange = () => {
      // Multiple timeouts to handle different browser behaviors
      setTimeout(updateDeviceInfo, 100)
      setTimeout(updateDeviceInfo, 300)
      setTimeout(updateDeviceInfo, 500)
    }

    // Listen to both orientationchange and resize for better coverage
    window.addEventListener('orientationchange', handleOrientationChange)

    // Also listen for screen orientation API if available
    if (screen?.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange)
    }

    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', debouncedUpdate)
      window.removeEventListener('orientationchange', handleOrientationChange)

      if (screen?.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange)
      }
    }
  }, [])

  return deviceInfo
}
