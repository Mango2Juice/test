'use client'

import { format } from 'date-fns'
import { CheckCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PregnancyInfo } from '@/lib/utils/pregnancy-calculator'

interface ResultCardProps {
  title: string
  value: string
  description?: string
}

/**
 * Renders a compact card showing a title, a prominent value, and an optional description.
 *
 * @param title - Short label displayed in the card header
 * @param value - Prominent value displayed in the card content
 * @param description - Optional supplementary text shown beneath the value
 * @returns A React element representing the styled result card
 */
function ResultCard({ title, value, description }: ResultCardProps) {
  return (
    <Card className='text-center bg-secondary/30'>
      <CardHeader className='p-3 pb-2'>
        <CardDescription className='text-xs'>{title}</CardDescription>
      </CardHeader>
      <CardContent className='p-3 pt-0'>
        <p className='text-xl font-bold text-primary'>{value}</p>
        {description && <p className='text-xs text-muted-foreground'>{description}</p>}
      </CardContent>
    </Card>
  )
}

/**
 * Displays an informational alert explaining which estimate determined the estimated due date.
 *
 * @param source - The source of the best estimate; expected values: `'LMP'`, `'LMP_ADJUSTED'`, or `'Ultrasound'`.
 * @param discrepancyDays - The difference in days between LMP and ultrasound estimates; incorporated into the alert text when relevant.
 * @returns An Alert element describing the chosen EDD source and rationale, or `null` when `source` is unrecognized.
 */
function BestEstimateAlert({ source, discrepancyDays }: { source: string; discrepancyDays: number }) {
  let title = ''
  let description = ''

  switch (source) {
    case 'LMP':
      title = 'EDD based on LMP'
      description = 'The due date from LMP is used as no ultrasound data was provided.'
      break
    case 'LMP_ADJUSTED':
      title = 'EDD based on LMP'
      description = `The due date from LMP is used as the discrepancy with ultrasound is small (${discrepancyDays} days).`
      break
    case 'Ultrasound':
      title = 'EDD based on Ultrasound'
      description = `The EDD is redated to the ultrasound estimate due to a significant discrepancy of ${discrepancyDays} days. This is the most accurate estimate.`
      break
    default:
      return null
  }

  return (
    <Alert variant='accent' className='mt-4'>
      <CheckCircle className='w-4 h-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

interface PregnancyResultsProps {
  pregnancyInfo: PregnancyInfo
}

/**
 * Renders a compact pregnancy results dashboard showing the estimated due date, best-estimate alert, gestational age, probable conception date, key trimester milestones, and screening windows.
 *
 * @param pregnancyInfo - Data object containing dates, gestational metrics, milestone ranges, and the source/discrepancy used to determine the best estimate.
 * @returns The React element that displays the pregnancy results UI.
 */
export function PregnancyResults({ pregnancyInfo }: PregnancyResultsProps) {
  return (
    <div className='space-y-4'>
      <Card>
        <CardContent className='pt-6'>
          <div className='text-center'>
            <p className='text-sm text-muted-foreground'>Estimated Due Date</p>
            <p className='text-3xl font-bold text-primary tracking-tight'>
              {format(pregnancyInfo.bestEstimateEdd, 'EEEE, MMMM d, yyyy')}
            </p>
          </div>

          <BestEstimateAlert source={pregnancyInfo.source} discrepancyDays={pregnancyInfo.discrepancyDays} />

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4'>
            <ResultCard
              title='Current Gestational Age'
              value={`${pregnancyInfo.gestationalAgeWeeks}w ${pregnancyInfo.gestationalAgeDays}d`}
              description={`Trimester ${pregnancyInfo.trimester}`}
            />
            <ResultCard
              title='Probable Conception'
              value={format(pregnancyInfo.conceptionDate, 'MMM d, yyyy')}
              description='Approx. 2 weeks after LMP'
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Key Milestones</CardTitle>
        </CardHeader>
        <CardContent className='text-sm text-muted-foreground space-y-2'>
          <div className='flex justify-between'>
            <span>End of 1st Trimester:</span>
            <span className='font-medium text-foreground'>
              {format(pregnancyInfo.firstTrimesterEnd, 'MMM d, yyyy')}
            </span>
          </div>
          <div className='flex justify-between'>
            <span>End of 2nd Trimester:</span>
            <span className='font-medium text-foreground'>
              {format(pregnancyInfo.secondTrimesterEnd, 'MMM d, yyyy')}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg'>Screening Windows</CardTitle>
        </CardHeader>
        <CardContent className='text-sm text-muted-foreground space-y-2'>
          {pregnancyInfo.milestoneDates.map((milestone) => (
            <div key={milestone.name} className='flex justify-between items-start'>
              <span className='w-2/3'>{milestone.name}:</span>
              <span className='font-medium text-foreground text-right w-1/3'>{milestone.dateRange}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}