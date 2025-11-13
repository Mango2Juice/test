// src/hooks/use-phq-9-score.ts
'use client'

import { useMemo, useState } from 'react'
import type { AnswerValue, Phq9State } from '@/lib/utils/phq-9-score'
import { calculatePhq9Score, initialState, questions } from '@/lib/utils/phq-9-score'

/**
 * Manage PHQ-9 answers state, compute the score and completion status, and expose form handlers.
 *
 * Tracks the current answers and whether results are shown, computes the PHQ-9 score from answers,
 * determines if all questions have been answered, and provides handlers to update answers,
 * submit the form, and reset state.
 *
 * @returns An object with:
 * - `answers`: current answers mapped by question id
 * - `result`: the PHQ-9 scoring result computed from `answers`
 * - `showResult`: `true` if the result panel should be displayed, `false` otherwise
 * - `isComplete`: `true` if every question has an answer other than `-1`, `false` otherwise
 * - `handleAnswerChange`: function `(id, value)` to update a single answer and hide results
 * - `handleSubmit`: form submit handler that prevents default and shows results when `isComplete` is `true`
 * - `handleReset`: function to restore initial answers and hide results
 */
export function usePhq9Score() {
  const [answers, setAnswers] = useState<Phq9State>(initialState)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerChange = (id: keyof Phq9State, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
    setShowResult(false)
  }

  const result = calculatePhq9Score(answers)

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
    result,
    showResult,
    isComplete,
    handleAnswerChange,
    handleSubmit,
    handleReset,
  }
}
