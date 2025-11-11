// /src/hooks/use-device.ts

'use client'
import { useEffect, useState } from 'react'
import type { DeviceContext, DeviceType, Orientation } from '@/lib/types/device'

const MOBILE_BREAKPOINT = 768 // Corresponds to Tailwind's 'md' breakpoint
const TABLET_BREAKPOINT = 1024 // Corresponds to Tailwind's 'lg' breakpoint

export function useDevice(): DeviceContext {
  const [deviceContext, setDeviceContext] = useState<DeviceContext>({
    isMobile: false,
    isTablet: false,
    orientation: 'landscape',
    screenSize: {
      width: 0,
      height: 0,
    },
    touchCapabilities: {
      supportsHaptics: false,
      maxTouchPoints: 0,
    },
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const updateDeviceContext = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < MOBILE_BREAKPOINT
      const isTablet = width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT
      const orientation: Orientation = height > width ? 'portrait' : 'landscape'

      // Detect touch capabilities
      const maxTouchPoints = navigator.maxTouchPoints || 0
      const supportsHaptics = 'vibrate' in navigator

      setDeviceContext({
        isMobile,
        isTablet,
        orientation,
        screenSize: {
          width,
          height,
        },
        touchCapabilities: {
          supportsHaptics,
          maxTouchPoints,
        },
      })
    }

    // Set initial value
    updateDeviceContext()

    // Listen for resize events
    window.addEventListener('resize', updateDeviceContext)

    // Listen for orientation change events
    window.addEventListener('orientationchange', () => {
      // Small delay to ensure screen dimensions are updated after orientation change
      setTimeout(updateDeviceContext, 100)
    })

    return () => {
      window.removeEventListener('resize', updateDeviceContext)
      window.removeEventListener('orientationchange', updateDeviceContext)
    }
  }, [])

  return deviceContext
}

// Utility hook for getting device type
export function useDeviceType(): DeviceType {
  const { isMobile, isTablet } = useDevice()

  if (isMobile) return 'mobile'
  if (isTablet) return 'tablet'
  return 'desktop'
}

// Utility hook for getting orientation
export function useOrientation(): Orientation {
  const { orientation } = useDevice()
  return orientation
}

// Utility hook for checking if device supports touch
export function useHasTouch(): boolean {
  const { touchCapabilities } = useDevice()
  return touchCapabilities.maxTouchPoints > 0
}
