// src/app/calculator/phq-9-score/page.tsx
'use client'

import { AlertTriangle, Check, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { usePhq9Score } from '@/hooks/use-phq-9-score'
import { cn } from '@/lib/utils'
import type { AnswerValue, Question } from '@/lib/utils/phq-9-score'
import { questions } from '@/lib/utils/phq-9-score'

/**
 * Renders a single PHQ-9 question row with selectable response options.
 *
 * Displays the question text prefixed by its numbered position and a 4-option
 * radio group for responses: `0` ("Not at all") through `3` ("Nearly every day").
 *
 * @param question - The question object containing `id` and `text` to display.
 * @param value - The currently selected answer value (0–3).
 * @param onChange - Callback invoked with the new answer value when the selection changes.
 * @param index - Zero-based index of the question, used to display the question number.
 * @returns The rendered question row element.
 */
function QuestionRow({
  question,
  value,
  onChange,
  index,
}: {
  readonly question: Question
  readonly value: AnswerValue
  readonly onChange: (value: AnswerValue) => void
  readonly index: number
}) {
  return (
    <div className='flex flex-col rounded-lg border p-4 transition-colors hover:bg-accent/50'>
      <div className='mb-4'>
        <Label className='font-medium'>
          {index + 1}. {question.text}
        </Label>
      </div>
      <RadioGroup
        value={String(value)}
        onValueChange={(val) => {
          onChange(Number.parseInt(val, 10) as AnswerValue)
        }}
        className='grid grid-cols-2 sm:grid-cols-4 gap-4'
        aria-label={question.text}
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='0' id={`${question.id}-0`} />
          <Label htmlFor={`${question.id}-0`} className='font-normal'>
            Not at all
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='1' id={`${question.id}-1`} />
          <Label htmlFor={`${question.id}-1`} className='font-normal'>
            Several days
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='2' id={`${question.id}-2`} />
          <Label htmlFor={`${question.id}-2`} className='font-normal'>
            More than half the days
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='3' id={`${question.id}-3`} />
          <Label htmlFor={`${question.id}-3`} className='font-normal'>
            Nearly every day
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

/**
 * Render a card displaying a PHQ-9 total score with its severity label and recommendation.
 *
 * @param score - The numeric PHQ-9 total score to display
 * @param severity - A human-readable severity label (e.g., "Moderate", "Severe")
 * @param color - Tailwind text color class applied to the severity label
 * @param recommendation - Guidance or recommendation text associated with the severity
 * @returns A Card element containing the score and an Alert that highlights the severity and recommendation
 */
function ResultCard({
  score,
  severity,
  color,
  recommendation,
}: {
  readonly score: number
  readonly severity: string
  readonly color: 'text-green-600' | 'text-yellow-600' | 'text-orange-500' | 'text-red-600' | 'text-red-700'
  readonly recommendation: string
}) {
  let variant: 'destructive' | 'accent' | 'default' = 'default'
  if (severity === 'Severe' || severity === 'Moderately Severe') {
    variant = 'destructive'
  } else if (severity === 'Moderate') {
    variant = 'accent'
  }

  const icon = variant === 'destructive' ? <AlertTriangle className='w-4 h-4' /> : <Check className='w-4 h-4' />

  return (
    <Card>
      <CardHeader>
        <CardTitle>PHQ-9 Score</CardTitle>
        <CardDescription>Depression Severity Assessment</CardDescription>
      </CardHeader>
      <CardContent className='text-center space-y-4'>
        <p className='text-6xl font-bold'>{score}</p>
        <Alert variant={variant} className='text-left'>
          {icon}
          <AlertTitle className={cn(color)}>{severity}</AlertTitle>
          <AlertDescription>{recommendation}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

/**
 * Render the PHQ-9 questionnaire page with per-question inputs, submission and reset controls, and conditional result display.
 *
 * @returns The React element for the PHQ-9 questionnaire UI, including question rows, action buttons, and the result card when available.
 */
export default function Phq9ScorePage() {
  const { answers, result, showResult, handleAnswerChange, handleSubmit, handleReset, isComplete } = usePhq9Score()

  return (
    <div className='w-full max-w-2xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Patient Health Questionnaire-9 (PHQ-9)</h1>
        <p className='text-muted-foreground mt-2'>A tool for monitoring the severity of depression.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>
              Over the last 2 weeks, how often have you been bothered by any of the following problems?
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {questions.map((q, index) => (
              <QuestionRow
                key={q.id}
                question={q}
                value={answers[q.id] ?? -1}
                onChange={(value) => {
                  handleAnswerChange(q.id, value)
                }}
                index={index}
              />
            ))}

            <div className='flex flex-col sm:flex-row gap-2 pt-4'>
              <Button type='submit' className='w-full' disabled={!isComplete}>
                Calculate Score
              </Button>
              <Button type='button' variant='outline' className='w-full' onClick={handleReset}>
                <RefreshCw className='w-4 h-4 mr-2' />
                Reset
              </Button>
            </div>
            {!isComplete && (
              <p className='text-sm text-center text-muted-foreground pt-2'>
                Please answer all questions to calculate the score.
              </p>
            )}
          </CardContent>
        </Card>
      </form>

      {showResult && result && (
        <div className='mt-8'>
          <ResultCard {...result} />
        </div>
      )}

      <p className='text-xs text-muted-foreground mt-4 text-center'>
        The PHQ-9 is a screening tool. It is not a substitute for a professional clinical diagnosis.
      </p>
    </div>
  )
}