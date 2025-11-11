// src/hooks/use-toast.ts
'use client'
import type React from 'react'
import { create } from 'zustand'
import type { ToastProps } from '@/components/ui/toast'

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000
const TOAST_ANIMATION_DURATION = 1000 // A bit longer to ensure animations complete

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

interface ToastState {
  toasts: ToasterToast[]
  timeouts: Map<string, ReturnType<typeof setTimeout>>
  addToast: (toast: ToasterToast) => void
  updateToast: (toast: Partial<ToasterToast>) => void
  dismissToast: (toastId?: string) => void
  removeToast: (toastId?: string) => void
}

const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  timeouts: new Map(),
  addToast: (toast) => {
    set((state) => {
      const newToasts = [toast, ...state.toasts].slice(0, TOAST_LIMIT)
      const newTimeouts = new Map(state.timeouts)

      // Clear any existing timeout for this toast ID to reset its lifecycle
      const existingTimeout = newTimeouts.get(toast.id)
      if (existingTimeout) {
        clearTimeout(existingTimeout)
      }

      // Set a new timeout for dismissal
      const timeoutId = setTimeout(() => {
        get().dismissToast(toast.id)
      }, toast.duration ?? TOAST_REMOVE_DELAY)

      newTimeouts.set(toast.id, timeoutId)

      return { toasts: newToasts, timeouts: newTimeouts }
    })
  },
  updateToast: (toast) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === toast.id ? { ...t, ...toast } : t)),
    }))
  },
  dismissToast: (toastId) => {
    set((state) => {
      const newTimeouts = new Map(state.timeouts)

      const dismiss = (id: string) => {
        // Clear any pending dismiss timeout
        const existingTimeout = newTimeouts.get(id)
        if (existingTimeout) {
          clearTimeout(existingTimeout)
          newTimeouts.delete(id)
        }

        // Set a new timeout to *remove* the toast after the animation
        const removalTimeout = setTimeout(() => {
          get().removeToast(id)
        }, TOAST_ANIMATION_DURATION)
        newTimeouts.set(id, removalTimeout)
      }

      if (toastId) {
        dismiss(toastId)
        return {
          toasts: state.toasts.map((t) => (t.id === toastId ? { ...t, open: false } : t)),
          timeouts: newTimeouts,
        }
      } else {
        state.toasts.forEach((t) => {
          dismiss(t.id)
        })
        return {
          toasts: state.toasts.map((t) => ({ ...t, open: false })),
          timeouts: newTimeouts,
        }
      }
    })
  },
  removeToast: (toastId) => {
    set((state) => {
      const newTimeouts = new Map(state.timeouts)

      if (toastId) {
        const timeoutId = newTimeouts.get(toastId)
        if (timeoutId) {
          clearTimeout(timeoutId)
          newTimeouts.delete(toastId)
        }
        return {
          toasts: state.toasts.filter((t) => t.id !== toastId),
          timeouts: newTimeouts,
        }
      } else {
        newTimeouts.forEach((timeoutId) => {
          clearTimeout(timeoutId)
        })
        return {
          toasts: [],
          timeouts: new Map(),
        }
      }
    })
  },
}))

// Optimized ID generator for high-frequency toasts.
// Uses the millisecond timestamp and a sequence counter that increments
// within the same millisecond. This is much faster than calling
// `Math.random()` on every invocation and still provides low collision
// probability in typical UI scenarios.
let __lastTs = 0
let __seq = 0
function genId() {
  const now = Date.now()
  if (now === __lastTs) {
    __seq += 1
  } else {
    __lastTs = now
    __seq = 0
  }
  // Compact the timestamp using base36 to keep IDs shorter in devtools
  return `${now.toString(36)}-${__seq}`
}

type Toast = Omit<ToasterToast, 'id'>

function toast(props: Toast) {
  const id = genId()
  const { addToast, updateToast, dismissToast } = useToastStore.getState()

  const update = (newProps: Partial<ToasterToast>) => updateToast({ ...newProps, id })
  const dismiss = () => dismissToast(id)

  addToast({
    ...props,
    id,
    open: true,
    onOpenChange: (open) => {
      if (!open) {
        dismiss()
      }
    },
  })

  return { id, dismiss, update }
}

function useToast() {
  const state = useToastStore()
  return {
    ...state,
    toast,
  }
}

/** @lintignore */
export { useToast, toast }
