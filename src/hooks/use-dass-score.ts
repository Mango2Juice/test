// src/hooks/use-dass-score.ts
'use client'

import { useMemo, useState } from 'react'
import type { AnswerValue, DassState } from '@/lib/utils/dass-score'
import { calculateDassScore, initialState, questions } from '@/lib/utils/dass-score'

/**
 * Manages Dass questionnaire state and actions for a React component.
 *
 * Provides current answers, computed DASS results, completion and visibility flags, and handlers to update answers, submit, and reset the questionnaire.
 *
 * @returns An object with:
 * - `answers`: current answers keyed by question id
 * - `results`: computed DASS score breakdown
 * - `showResult`: `true` when results should be shown, `false` otherwise
 * - `isComplete`: `true` if every question has been answered (`answer !== -1`), `false` otherwise
 * - `handleAnswerChange`: function `(id, value)` to update a single answer and hide results
 * - `handleSubmit`: form submit handler that prevents default and shows results when `isComplete` is `true`
 * - `handleReset`: function to reset answers to initial state and hide results
 */
export function useDassScore() {
  const [answers, setAnswers] = useState<DassState>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = (id: keyof DassState, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setShowResult(false)
  }

  const results = calculateDassScore(answers)

  const isComplete = useMemo(() => {
    return questions.every((q) => answers[q.id] !== -1)
  }, [answers])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isComplete) {
      setShowResult(true)
    }
  }

  const handleReset = () => {
    setAnswers(initialState)
    setShowResult(false)
  }

  return {
    answers,
    results,
    showResult,
    isComplete,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  }
}
