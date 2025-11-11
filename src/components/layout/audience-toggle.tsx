// src/components/layout/audience-toggle.tsx
'use client'
import { Baby, User } from 'lucide-react'
import type React from 'react'
import { useAppStore } from '@/lib/stores/app-store'
import type { AudienceMode } from '@/lib/types'
import { cn } from '@/lib/utils'

export const AudienceToggle: React.FC = () => {
  const audience = useAppStore((s) => s.audience)
  const setAudience = useAppStore((s) => s.setAudience)

  if (!setAudience) {
    // Return null or a placeholder if the store is not ready
    return null
  }

  const handleToggle = (newAudience: AudienceMode) => {
    setAudience(newAudience)
  }

  return (
    <fieldset
      aria-label='Audience selection'
      className='flex justify-center items-center p-1 mx-auto max-w-xs rounded-full bg-secondary border-0'
    >
      <button
        type='button'
        onClick={() => handleToggle('paediatric')}
        aria-pressed={audience === 'paediatric'}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors',
          audience === 'paediatric' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground',
        )}
      >
        <Baby size={16} />
        Paediatric
      </button>
      <button
        type='button'
        onClick={() => handleToggle('adult')}
        aria-pressed={audience === 'adult'}
        className={cn(
          'flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors',
          audience === 'adult' ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground',
        )}
      >
        <User size={16} />
        Adult
      </button>
    </fieldset>
  )
}
