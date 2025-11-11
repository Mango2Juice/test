// src/lib/stores/app-store.ts
'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { AudienceMode } from '@/lib/types'

interface AppState {
  audience: AudienceMode
  setAudience: (audience: AudienceMode) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      audience: 'paediatric', // Default audience
      setAudience: (audience) => set({ audience }),
    }),
    {
      name: 'doses-app-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // use localStorage
    },
  ),
)
