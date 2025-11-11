'use client'

import { useEffect, useState } from 'react'
import { calculatePregnancyInfo, type PregnancyInfo } from '@/lib/utils/pregnancy-calculator'

export function usePregnancyCalculator() {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(new Date())
  const [ultrasoundDate, setUltrasoundDate] = useState<Date | undefined>()
  const [gaWeeks, setGaWeeks] = useState<string>('')
  const [gaDays, setGaDays] = useState<string>('')
  const [pregnancyInfo, setPregnancyInfo] = useState<PregnancyInfo | null>(null)

  useEffect(() => {
    if (lmpDate) {
      const weeks = gaWeeks ? parseInt(gaWeeks, 10) : undefined
      const days = gaDays ? parseInt(gaDays, 10) : undefined
      const info = calculatePregnancyInfo(lmpDate, ultrasoundDate, weeks, days)
      setPregnancyInfo(info)
    } else {
      setPregnancyInfo(null)
    }
  }, [lmpDate, ultrasoundDate, gaWeeks, gaDays])

  const handleReset = () => {
    setLmpDate(new Date())
    setUltrasoundDate(undefined)
    setGaWeeks('')
    setGaDays('')
  }

  return {
    lmpDate,
    setLmpDate,
    ultrasoundDate,
    setUltrasoundDate,
    gaWeeks,
    setGaWeeks,
    gaDays,
    setGaDays,
    pregnancyInfo,
    handleReset,
  }
}
