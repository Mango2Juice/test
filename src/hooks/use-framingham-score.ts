'use client'

import { useCallback, useMemo, useState } from 'react'
import { calculateFraminghamScore, type FraminghamState, initialState } from '@/lib/utils/framingham-score'

export function useFraminghamScore() {
  const [state, setState] = useState<FraminghamState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleInputChange = (field: keyof FraminghamState, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }))
    setShowResult(false)
  }

  const handleSelectChange = (field: keyof FraminghamState, value: string) => {
    setState((prev) => ({ ...prev, [field]: value }))
    setShowResult(false)
  }

  const result = useMemo(() => calculateFraminghamScore(state), [state])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setShowResult(true)
  }, [])

  const handleReset = useCallback(() => {
    setState(initialState)
    setShowResult(false)
  }, [])

  const getRiskColor = (risk: string | undefined): string => {
    if (!risk) return 'text-muted-foreground'
    const numericRisk = parseInt(risk.replace(/[><]/g, ''), 10)
    if (numericRisk >= 20) return 'text-red-600'
    if (numericRisk >= 10) return 'text-orange-500'
    if (numericRisk >= 5) return 'text-yellow-500'
    return 'text-green-600'
  }

  return {
    state,
    result,
    showResult,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    handleReset,
    getRiskColor,
  }
}
