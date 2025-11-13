// src/lib/utils/pregnancy-calculator.ts

import { add, addDays, addWeeks, differenceInDays } from 'date-fns'

export interface PregnancyInfo {
  bestEstimateEdd: Date
  gestationalAgeWeeks: number
  gestationalAgeDays: number
  trimester: 1 | 2 | 3
  conceptionDate: Date
  source: 'LMP' | 'LMP_ADJUSTED' | 'Ultrasound'
  discrepancyDays: number
  firstTrimesterEnd: Date
  secondTrimesterEnd: Date
  milestoneDates: { name: string; dateRange: string }[]
}

/**
 * Calculates pregnancy information based on LMP and optional ultrasound data.
 * Follows ACOG guidelines for redating.
 *
 * @param lmpDate - The first day of the Last Menstrual Period.
 * @param ultrasoundDate - The date of the first-trimester ultrasound.
 * @param gaWeeksAtUltrasound - Gestational age in weeks at the time of ultrasound.
 * @param gaDaysAtUltrasound - Gestational age in days at the time of ultrasound.
 * @returns A PregnancyInfo object or null if LMP is not provided.
 */
export function calculatePregnancyInfo(
  lmpDate: Date,
  ultrasoundDate?: Date,
  gaWeeksAtUltrasound?: number,
  gaDaysAtUltrasound?: number,
): PregnancyInfo | null {
  if (!lmpDate) return null

  // 1. Calculate EDD based on LMP (Naegele's rule)
  const eddByLmp = add(lmpDate, { days: 280 })

  let bestEstimateEdd = eddByLmp
  let source: 'LMP' | 'LMP_ADJUSTED' | 'Ultrasound' = 'LMP'
  let discrepancyDays = 0

  // 2. Adjust EDD based on ultrasound if provided
  if (ultrasoundDate && gaWeeksAtUltrasound !== undefined && gaDaysAtUltrasound !== undefined) {
    const totalGaDaysAtUltrasound = gaWeeksAtUltrasound * 7 + gaDaysAtUltrasound
    const eddByUltrasound = addDays(ultrasoundDate, 280 - totalGaDaysAtUltrasound)

    discrepancyDays = Math.abs(differenceInDays(eddByLmp, eddByUltrasound))

    // ACOG guidelines for redating based on first-trimester ultrasound
    const shouldUseUltrasound =
      (gaWeeksAtUltrasound < 9 && discrepancyDays > 5) ||
      (gaWeeksAtUltrasound >= 9 && gaWeeksAtUltrasound < 14 && discrepancyDays > 7)

    if (shouldUseUltrasound) {
      bestEstimateEdd = eddByUltrasound
      source = 'Ultrasound'
    } else {
      source = 'LMP_ADJUSTED'
    }
  }

  // 3. Calculate current gestational age
  const today = new Date()
  const daysPregnant = differenceInDays(today, addDays(bestEstimateEdd, -280))
  const gestationalAgeWeeks = Math.floor(daysPregnant / 7)
  const gestationalAgeDays = daysPregnant % 7

  // 4. Calculate other key dates
  const conceptionDate = addWeeks(lmpDate, 2)
  const firstTrimesterEnd = add(lmpDate, { weeks: 13, days: 6 })
  const secondTrimesterEnd = add(lmpDate, { weeks: 27, days: 6 })

  let trimester: 1 | 2 | 3 = 1
  if (gestationalAgeWeeks >= 28) {
    trimester = 3
  } else if (gestationalAgeWeeks >= 14) {
    trimester = 2
  }

  const formatRange = (start: Date, end: Date) => `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`

  // 5. Calculate screening windows
  const milestoneDates = [
    {
      name: 'Nuchal Translucency (NT) Scan',
      dateRange: formatRange(add(bestEstimateEdd, { weeks: -29, days: 1 }), add(bestEstimateEdd, { weeks: -26, days: 1 })),
    },
    {
      name: 'Quad Screen',
      dateRange: formatRange(add(bestEstimateEdd, { weeks: -25 }), add(bestEstimateEdd, { weeks: -18, days: 1 })),
    },
    {
      name: 'Anatomy Scan',
      dateRange: formatRange(add(bestEstimateEdd, { weeks: -22 }), add(bestEstimateEdd, { weeks: -18 })),
    },
    {
      name: 'Glucose Challenge Screening',
      dateRange: formatRange(add(bestEstimateEdd, { weeks: -16 }), add(bestEstimateEdd, { weeks: -12 })),
    },
    {
      name: 'Group B Strep Screening',
      dateRange: formatRange(add(bestEstimateEdd, { weeks: -4 }), add(bestEstimateEdd, { weeks: -2 })),
    },
  ]

  return {
    bestEstimateEdd,
    gestationalAgeWeeks,
    gestationalAgeDays,
    trimester,
    conceptionDate,
    source,
    discrepancyDays,
    firstTrimesterEnd,
    secondTrimesterEnd,
    milestoneDates,
  }
}
