// /src/components/persistent-storage-registrar.tsx

'use client'

import { useEffect } from 'react'

/**
 * Attempts to obtain persistent storage permission via the Navigator Storage API.
 *
 * If the Storage API's persistence methods are unavailable this function returns immediately.
 * Otherwise it checks the current persisted state and requests persistence when not already granted.
 * Any runtime errors encountered while querying or requesting persistence are caught and logged.
 */
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