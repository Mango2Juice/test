// src/app/calculator/dass-score/page.tsx
'use client'

import { AlertTriangle, Check, RefreshCw } from 'lucide-react'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useDassScore } from '@/hooks/use-dass-score'
import { cn } from '@/lib/utils'
import type { AnswerValue, Question } from '@/lib/utils/dass-score'
import { questions } from '@/lib/utils/dass-score'

/**
 * Renders a single DASS-21 question with a four-option radio group for selecting an answer.
 *
 * Displays the question text prefixed by its (zero-based) index and four radio options (0–3)
 * describing severity. The component does not manage state beyond invoking the provided callback.
 *
 * @param question - The question object to render (contains `id` and `text`)
 * @param value - The currently selected answer: `0`–`3` for chosen options, or `-1` to indicate unanswered
 * @param onChange - Callback invoked with the new answer value (`0`–`3`) when the user selects an option
 * @param index - Zero-based index used for display numbering
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
            Did not apply to me at all
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='1' id={`${question.id}-1`} />
          <Label htmlFor={`${question.id}-1`} className='font-normal'>
            Applied to me to some degree
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='2' id={`${question.id}-2`} />
          <Label htmlFor={`${question.id}-2`} className='font-normal'>
            Applied to me a considerable degree
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='3' id={`${question.id}-3`} />
          <Label htmlFor={`${question.id}-3`} className='font-normal'>
            Applied to me very much
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}

/**
 * Renders a result card showing a numeric score and its severity with visual emphasis.
 *
 * @param title - Heading for the result card (for example, "Depression")
 * @param score - Numeric score displayed prominently
 * @param severity - Severity label shown in the alert (for example, "Normal", "Moderate", "Severe")
 * @param color - Tailwind text color class applied to the severity label
 * @returns A Card element containing the title, large score, and an Alert that reflects the severity with an appropriate variant and icon
 */
function ResultCard({
  title,
  score,
  severity,
  color,
}: {
  readonly title: string
  readonly score: number
  readonly severity: string
  readonly color: 'text-green-600' | 'text-yellow-600' | 'text-orange-500' | 'text-red-600' | 'text-red-700'
}) {
  let variant: 'destructive' | 'accent' | 'default' = 'default'
  if (severity === 'Severe' || severity === 'Extremely Severe') {
    variant = 'destructive'
  } else if (severity === 'Moderate') {
    variant = 'accent'
  }

  const icon = variant === 'destructive' ? <AlertTriangle className='w-4 h-4' /> : <Check className='w-4 h-4' />

  return (
    <Card className='flex-1'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className='text-center space-y-2'>
        <p className='text-4xl font-bold'>{score}</p>
        <Alert variant={variant} className='text-left'>
          {icon}
          <AlertTitle className={cn(color)}>{severity}</AlertTitle>
        </Alert>
      </CardContent>
    </Card>
  )
}

/**
 * Render the DASS-21 questionnaire page that collects responses, allows calculation/reset of scores,
 * and displays categorized results when available.
 *
 * The page presents 21 items with selectable responses, a submit action to calculate scores,
 * a reset action to clear answers, and a results section showing Depression, Anxiety, and Stress
 * scores when the calculation is complete.
 *
 * @returns The page's React element containing the questionnaire form and optional results display.
 */
export default function DassScorePage() {
  const { answers, results, showResult, handleAnswerChange, handleSubmit, handleReset, isComplete } = useDassScore()

  return (
    <div className='w-full max-w-4xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>Depression Anxiety Stress Scale (DASS-21)</h1>
        <p className='text-muted-foreground mt-2'>
          A set of 21 questions to measure the severity of symptoms of Depression, Anxiety and Stress.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>
              Please read each statement and select the number which indicates how much the statement applied to you
              over the past week.
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

      {showResult && results && (
        <Card className='mt-8'>
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>The scores below indicate the severity of symptoms for each category.</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col md:flex-row gap-4'>
            <ResultCard title='Depression' {...results.depression} />
            <ResultCard title='Anxiety' {...results.anxiety} />
            <ResultCard title='Stress' {...results.stress} />
          </CardContent>
        </Card>
      )}

      <p className='text-xs text-muted-foreground mt-4 text-center'>
        The DASS-21 is a screening tool. It is not a substitute for a professional clinical diagnosis.
      </p>
    </div>
  )
}