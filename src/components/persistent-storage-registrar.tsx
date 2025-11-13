// /src/components/persistent-storage-registrar.tsx

'use client'

import { useEffect } from 'react'

async function requestPersistentStorage() {
  if (typeof navigator.storage?.persist !== 'function') {
    return
  }

  try {
    const isPersisted = await navigator.storage.persisted()
    if (isPersisted) {
      console.log('Storage is already persistent.')
    } else {
      const isPersistenceAllowed = await navigator.storage.persist()
      if (isPersistenceAllowed) {
        console.log('Storage persistence successfully granted.')
      } else {
        console.warn('Storage persistence request was denied.')
      }
    }
  } catch (error) {
    console.error('Failed to request persistent storage:', error)
  }
}

export const PersistentStorageRegistrar = (): null => {
  useEffect(() => {
    void requestPersistentStorage()
  }, [])

  return null
}
