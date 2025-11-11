// src/hooks/use-ideal-body-weight.ts
'use client'

import { useMemo, useState } from 'react'
import type { Gender } from '@/lib/utils/ideal-body-weight'
import { calculateAdjBW, calculateIBW } from '@/lib/utils/ideal-body-weight'

/**
 * Hook that computes ideal body weight and adjusted body weight while managing related input state.
 *
 * The hook validates height input and returns computed results when inputs are valid; when invalid, `results` is `null` and `error` contains a user-facing validation message.
 *
 * @returns An object with:
 *  - `gender` — current gender selection (`'male'` | `'female'`).
 *  - `heightCm` — current height input in centimeters as a string.
 *  - `actualBw` — current actual body weight input as a string.
 *  - `results` — `{ ibw: number; adjBw: number | null } | null`; `ibw` is the calculated ideal body weight and `adjBw` is the adjusted body weight when actual weight is a valid positive number, otherwise `adjBw` is `null`. `results` is `null` when inputs are invalid.
 *  - `error` — validation message string; empty when inputs are valid.
 *  - `setGender`, `setHeightCm`, `setActualBw` — setters for the corresponding state values.
 *  - `handleReset` — resets state to the hook's initial defaults.
 */
export function useIdealBodyWeight() {
  const [gender, setGender] = useState<Gender>('male')
  const [heightCm, setHeightCm] = useState<string>('170')
  const [actualBw, setActualBw] = useState<string>('')

  const { results, error } = useMemo(() => {
    const h = Number.parseFloat(heightCm)
    if (Number.isNaN(h) || h <= 0) {
      return { results: null, error: 'Please enter a valid positive height.' }
    }

    if (h < 152.4) {
      return { results: null, error: 'Height must be at least 5 feet (152.4 cm).' }
    }

    const ibw = calculateIBW(h, gender)
    const aBw = Number.parseFloat(actualBw)
    const adjBw = !Number.isNaN(aBw) && aBw > 0 ? calculateAdjBW(ibw, aBw) : null

    return { results: { ibw, adjBw }, error: '' }
  }, [heightCm, gender, actualBw])

  const handleReset = () => {
    setGender('male')
    setHeightCm('170')
    setActualBw('')
  }

  return {
    gender,
    heightCm,
    actualBw,
    error,
    results,
    setGender,
    setHeightCm,
    setActualBw,
    handleReset,
  }
}
