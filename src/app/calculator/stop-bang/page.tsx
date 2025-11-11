// src/app/calculator/stop-bang/page.tsx
'use client'

import { AlertTriangle, Check, RefreshCw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useStopBangScore } from '@/hooks/use-stop-bang-score'
import { cn } from '@/lib/utils'
import type { Question, YesNo } from '@/lib/utils/stop-bang-score'
import { questions } from '@/lib/utils/stop-bang-score'

/**
 * Render a single STOP‑BANG question row with labeled text and a Yes/No radio group.
 *
 * @param question - The question object (includes `id`, `text`, and optional `description`)
 * @param value - Current selected answer, either `'yes'` or `'no'`
 * @param onChange - Callback invoked with the new answer when the selection changes
 * @returns The rendered question row element containing the label, optional description, and Yes/No radios
 */
function QuestionRow({
  question,
  value,
  onChange,
}: {
  question: Question
  value: YesNo
  onChange: (value: YesNo) => void
}) {
  return (
    <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border p-4'>
      <div className='mb-4 sm:mb-0'>
        <Label htmlFor={question.id} className='text-base font-medium'>
          {question.text}
        </Label>
        {question.description && <p className='text-sm text-muted-foreground mt-1'>{question.description}</p>}
      </div>
      <RadioGroup
        id={question.id}
        value={value}
        onValueChange={onChange}
        className='flex items-center space-x-4'
        aria-label={question.text}
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='yes' id={`${question.id}-yes`} />
          <Label htmlFor={`${question.id}-yes`}>Yes</Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='no' id={`${question.id}-no`} />
          <Label htmlFor={`${question.id}-no`}>No</Label>
        </div>
      </RadioGroup>
    </div>
  )
}

/**
 * Render a result card summarizing the STOP-BANG score, risk category, and explanatory alert.
 *
 * @param score - Total positive responses on the STOP-BANG questionnaire (0–8)
 * @param risk - Risk category: "Low", "Intermediate", or "High"
 * @param color - Tailwind text color class applied to the prominent risk heading; must be one of `text-green-600`, `text-yellow-600`, or `text-red-600`
 * @param description - Explanatory message displayed in the alert describing the risk
 * @returns A Card element showing the risk label, numeric score, and an alert with an icon and description
 */
function ResultCard({
  score,
  risk,
  color,
  description,
}: {
  score: number
  risk: 'Low' | 'Intermediate' | 'High'
  color: 'text-green-600' | 'text-yellow-600' | 'text-red-600'
  description: string
}) {
  let variant: 'destructive' | 'accent' | 'default'
  if (risk === 'High') {
    variant = 'destructive'
  } else if (risk === 'Intermediate') {
    variant = 'accent'
  } else {
    variant = 'default'
  }

  const icon = risk === 'High' ? <AlertTriangle className='w-4 h-4' /> : <Check className='w-4 h-4' />

  return (
    <Card>
      <CardHeader>
        <CardTitle>Result</CardTitle>
        <CardDescription>Your estimated risk for Obstructive Sleep Apnea.</CardDescription>
      </CardHeader>
      <CardContent className='text-center space-y-4'>
        <p className={cn('text-6xl font-bold', color)}>{risk}</p>
        <p className='text-xl text-muted-foreground'>Score: {score} / 8</p>
        <Alert variant={variant} className='text-left'>
          {icon}
          <AlertTitle>{risk} Risk</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

/**
 * Render the STOP‑BANG questionnaire UI that collects answers, computes an OSA risk score, and displays the result.
 *
 * The component presents a list of screening questions with Yes/No controls, provides actions to calculate the score
 * or reset responses, and conditionally renders a summarized risk card and descriptive note after submission.
 *
 * @returns A React element containing the questionnaire form, action buttons, and a conditional result card
 */
export default function StopBangPage() {
  const { answers, result, showResult, handleAnswerChange, handleSubmit, handleReset } = useStopBangScore()

  return (
    <div className='w-full max-w-2xl mx-auto pb-24'>
      <div className='mb-8 hidden md:block'>
        <h1 className='text-3xl font-bold tracking-tight'>STOP-BANG Score for OSA</h1>
        <p className='text-muted-foreground mt-2'>Screening questionnaire for Obstructive Sleep Apnea.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>Answer the following questions to assess your risk.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            {questions.map((q) => (
              <QuestionRow
                key={q.id}
                question={q}
                value={answers[q.id]}
                onChange={(value) => handleAnswerChange(q.id, value)}
              />
            ))}

            <div className='flex flex-col sm:flex-row gap-2 pt-4'>
              <Button type='submit' className='w-full'>
                Calculate Score
              </Button>
              <Button type='button' variant='outline' className='w-full' onClick={handleReset}>
                <RefreshCw className='w-4 h-4 mr-2' />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {showResult === true && (
        <div className='mt-8'>
          <ResultCard {...result} />
        </div>
      )}
      <p className='text-xs text-muted-foreground mt-4 text-center'>
        This calculator is a screening tool and is not a substitute for a formal sleep study or medical diagnosis.
      </p>
    </div>
  )
}