'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface PregnancyInputFormProps {
  lmpDate: Date | undefined
  setLmpDate: (date: Date | undefined) => void
  ultrasoundDate: Date | undefined
  setUltrasoundDate: (date: Date | undefined) => void
  gaWeeks: string
  setGaWeeks: (weeks: string) => void
  gaDays: string
  setGaDays: (days: string) => void
}

/**
 * Renders inputs for pregnancy-related data: LMP, first-trimester ultrasound date, and gestational age at ultrasound.
 *
 * Renders date pickers for the first day of the last menstrual period (LMP) and the ultrasound date, and numeric inputs for gestational age in weeks and days.
 *
 * @param lmpDate - Currently selected LMP date or `undefined` when not set.
 * @param setLmpDate - Callback invoked with a new LMP date when the user selects one.
 * @param ultrasoundDate - Currently selected ultrasound date or `undefined` when not set.
 * @param setUltrasoundDate - Callback invoked with a new ultrasound date when the user selects one.
 * @param gaWeeks - Gestational age weeks value (string) shown in the weeks input.
 * @param setGaWeeks - Callback invoked with the new weeks value when the weeks input changes.
 * @param gaDays - Gestational age days value (string) shown in the days input.
 * @param setGaDays - Callback invoked with the new days value when the days input changes.
 * @returns The form UI for selecting LMP and ultrasound dates and entering gestational age values.
 */
export function PregnancyInputForm({
  lmpDate,
  setLmpDate,
  ultrasoundDate,
  setUltrasoundDate,
  gaWeeks,
  setGaWeeks,
  gaDays,
  setGaDays,
}: PregnancyInputFormProps) {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='lmp-date'>First Day of Last Menstrual Period (LMP)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='lmp-date'
              variant={'outline'}
              className={cn('w-full justify-start text-left font-normal', !lmpDate && 'text-muted-foreground')}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {lmpDate ? format(lmpDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={lmpDate}
              onSelect={setLmpDate}
              initialFocus
              disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='ultrasound-date'>First-Trimester Ultrasound Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id='ultrasound-date'
              variant={'outline'}
              className={cn('w-full justify-start text-left font-normal', !ultrasoundDate && 'text-muted-foreground')}
            >
              <CalendarIcon className='mr-2 h-4 w-4' />
              {ultrasoundDate ? format(ultrasoundDate, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={ultrasoundDate}
              onSelect={setUltrasoundDate}
              disabled={(date) => date > new Date() || !lmpDate || date < lmpDate}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className='space-y-2'>
        <Label>Gestational Age at Ultrasound (CRL)</Label>
        <div className='flex items-center gap-2'>
          <Input
            type='number'
            placeholder='Weeks'
            value={gaWeeks}
            onChange={(e) => setGaWeeks(e.target.value)}
            min='4'
            max='14'
            aria-label='Gestational age in weeks'
            disabled={!ultrasoundDate}
          />
          <span className='text-muted-foreground'>weeks</span>
          <Input
            type='number'
            placeholder='Days'
            value={gaDays}
            onChange={(e) => setGaDays(e.target.value)}
            min='0'
            max='6'
            aria-label='Gestational age in days'
            disabled={!ultrasoundDate}
          />
          <span className='text-muted-foreground'>days</span>
        </div>
      </div>
    </div>
  )
}