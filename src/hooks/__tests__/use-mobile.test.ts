// /src/hooks/__tests__/use-mobile.test.ts

import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDeviceInfo, useIsMobile } from '../use-mobile'

// Mock window.matchMedia
const mockMatchMedia = vi.fn()
const mockAddEventListener = vi.fn()
const mockRemoveEventListener = vi.fn()

beforeEach(() => {
  mockMatchMedia.mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: mockAddEventListener,
    removeEventListener: mockRemoveEventListener,
    dispatchEvent: vi.fn(),
  }))

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockMatchMedia,
  })

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    value: 1024,
  })

  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    value: 768,
  })
})

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers() // Restore real timers after each test
})

describe('useIsMobile', () => {
  it('should return false for desktop screen sizes', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('should return true for mobile screen sizes', () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('should add and remove event listeners', () => {
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    const { unmount } = renderHook(() => useIsMobile())

    expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})

describe('useDeviceInfo', () => {
  beforeEach(() => {
    vi.useFakeTimers() // Use fake timers for this describe block
  })

  it('should detect mobile device correctly', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500 })
    Object.defineProperty(window, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDeviceInfo())

    expect(result.current.isMobile).toBe(true)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.deviceType).toBe('mobile')
    expect(result.current.orientation).toBe('portrait')
  })

  it('should detect tablet device correctly', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800 })
    Object.defineProperty(window, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useDeviceInfo())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(true)
    expect(result.current.deviceType).toBe('tablet')
    expect(result.current.orientation).toBe('landscape')
  })

  it('should detect desktop device correctly', () => {
    Object.defineProperty(window, 'innerWidth', { value: 1200 })
    Object.defineProperty(window, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDeviceInfo())

    expect(result.current.isMobile).toBe(false)
    expect(result.current.isTablet).toBe(false)
    expect(result.current.deviceType).toBe('desktop')
    expect(result.current.orientation).toBe('landscape')
  })

  it('should detect portrait orientation correctly', () => {
    Object.defineProperty(window, 'innerWidth', { value: 600 })
    Object.defineProperty(window, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDeviceInfo())

    expect(result.current.orientation).toBe('portrait')
  })

  it('should detect landscape orientation correctly', () => {
    Object.defineProperty(window, 'innerWidth', { value: 800 })
    Object.defineProperty(window, 'innerHeight', { value: 600 })

    const { result } = renderHook(() => useDeviceInfo())

    expect(result.current.orientation).toBe('landscape')
  })

  it('should update on window resize', () => {
    Object.defineProperty(window, 'innerWidth', { value: 500 })
    Object.defineProperty(window, 'innerHeight', { value: 800 })

    const { result } = renderHook(() => useDeviceInfo())

    expect(result.current.isMobile).toBe(true)

    act(() => {
      Object.defineProperty(window, 'innerWidth', { value: 1200 })
      Object.defineProperty(window, 'innerHeight', { value: 800 })
      window.dispatchEvent(new Event('resize'))
      // Advance timers to trigger the debounced update in the hook
      vi.advanceTimersByTime(200)
    })

    expect(result.current.isMobile).toBe(false)
    expect(result.current.deviceType).toBe('desktop')
  })
})
