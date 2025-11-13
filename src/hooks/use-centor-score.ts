// src/hooks/use-centor-score.ts
'use client'

import { useState } from 'react'
import type { AgeGroup, CentorState } from '@/lib/utils/centor-score'
import { calculateCentorScore, initialState } from '@/lib/utils/centor-score'

/**
 * Manages Centor score form state and exposes handlers for updating inputs, submitting, and resetting.
 *
 * @returns An object with the following properties:
 * - `answers`: current `CentorState` representing form answers including `age`.
 * - `result`: numeric Centor score computed from `answers`.
 * - `showResult`: boolean indicating whether the result should be displayed.
 * - `handleCheckboxChange`: `(id, checked) => void` — updates a boolean answer by key and hides the result.
 * - `handleAgeChange`: `(value) => void` — sets the `age` field and hides the result.
 * - `handleSubmit`: `(e) => void` — prevents default form submission and shows the result.
 * - `handleReset`: `() => void` — resets answers to the initial state and hides the result.
 */
export function useCentorScore() {
  const [answers, setAnswers] = useState<CentorState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleCheckboxChange = (id: keyof Omit<CentorState, 'age'>, checked: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: checked }))
    setShowResult(false)
  }

  const handleAgeChange = (value: AgeGroup) => {
    setAnswers((prev) => ({ ...prev, age: value }))
    setShowResult(false)
  }

  const result = calculateCentorScore(answers)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowResult(true)
  }

  const handleReset = () => {
    setAnswers(initialState)
    setShowResult(false)
  }

  return {
    answers,
    result,
    showResult,
    handleCheckboxChange,
    handleAgeChange,
    handleSubmit,
    handleReset,
  }
}
