// src/lib/stores/app-store.ts
'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AppState {
  // This store is currently empty but preserved for future global state.
}

export const useAppStore = create<AppState>()(
  persist(
    (_set) => ({
      // No state properties are defined as audience has been removed.
    }),
    {
      name: 'doses-app-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
