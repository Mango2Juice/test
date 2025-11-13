// /src/components/service-worker-registrar.tsx

'use client'

import { useCallback, useEffect } from 'react'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

interface WorkboxEvent {
  isUpdate: boolean
}

interface Workbox {
  addEventListener: (event: string, callback: (event: WorkboxEvent) => void) => void
  removeEventListener: (event: string, callback: (event: WorkboxEvent) => void) => void
}

declare global {
  interface Window {
    workbox?: Workbox
  }
}

export const ServiceWorkerRegistrar = (): null => {
  const { toast } = useToast()

  const showUpdateToast = useCallback(() => {
    toast({
      title: 'Update Available',
      description: 'A new version of the app is ready. Reload to apply changes.',
      duration: Infinity, // Keep the toast visible until action is taken
      action: (
        <ToastAction altText='Reload' onClick={() => window.location.reload()}>
          Reload
        </ToastAction>
      ),
    })
  }, [toast])

  const showOfflineReadyToast = useCallback(() => {
    toast({
      title: 'App Ready Offline',
      description: 'The application is now cached and ready to use offline.',
    })
  }, [toast])

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !window.workbox) {
      return
    }

    const wb = window.workbox

    const handleInstalled = (event: WorkboxEvent) => {
      console.log(`Service worker ${event.isUpdate ? 'updated' : 'installed'}.`)
      if (event.isUpdate) {
        showUpdateToast()
      } else {
        showOfflineReadyToast()
      }
    }

    wb.addEventListener('installed', handleInstalled)

    return () => {
      wb.removeEventListener('installed', handleInstalled)
    }
  }, [showUpdateToast, showOfflineReadyToast])

  return null
}
