// /src/components/common/device-info-debug.tsx
'use client'

import { useDevice, useDeviceType, useHasTouch, useOrientation } from '@/hooks/use-device'

/**
 * Debug component to display device information
 * This component can be used during development to test device detection
 */
export function DeviceInfoDebug() {
  const deviceContext = useDevice()
  const deviceType = useDeviceType()
  const orientation = useOrientation()
  const hasTouch = useHasTouch()

  return (
    <div className='fixed bottom-4 right-4 bg-background border rounded-lg p-4 text-xs space-y-2 shadow-lg z-50'>
      <h3 className='font-semibold'>Device Info</h3>
      <div className='space-y-1'>
        <div>Type: {deviceType}</div>
        <div>Mobile: {deviceContext.isMobile ? 'Yes' : 'No'}</div>
        <div>Tablet: {deviceContext.isTablet ? 'Yes' : 'No'}</div>
        <div>Orientation: {orientation}</div>
        <div>
          Screen: {deviceContext.screenSize.width}x{deviceContext.screenSize.height}
        </div>
        <div>Touch: {hasTouch ? 'Yes' : 'No'}</div>
        <div>Touch Points: {deviceContext.touchCapabilities.maxTouchPoints}</div>
        <div>Haptics: {deviceContext.touchCapabilities.supportsHaptics ? 'Yes' : 'No'}</div>
      </div>
    </div>
  )
}
