// src/lib/medical-data/immunisation-schedule.ts

export const ageMonths = ['0', '1', '2', '3', '4', '5', '6', '8', '9', '12', '15', '18', '21'] as const
export const ageYears = ['7', '13', '15'] as const

interface VaccineDose {
  age: string
  label: string
}

interface Vaccine {
  name: string
  doses: readonly VaccineDose[]
}

interface VaccineDescription {
  name: string
  description: string
}

export const vaccines: readonly Vaccine[] = [
  { name: 'BCG', doses: [{ age: '0m', label: 'Dos Tunggal' }] },
  {
    name: 'Hepatitis B',
    doses: [
      { age: '0m', label: 'Dos Kelahiran' },
      { age: '1m', label: 'Dos 1' },
      { age: '6m', label: 'Dos 2' },
    ],
  },
  {
    name: 'DTaP-IPV-Hep B-Hib',
    doses: [
      { age: '2m', label: 'Dos 1' },
      { age: '3m', label: 'Dos 2' },
      { age: '5m', label: 'Dos 3' },
      { age: '18m', label: 'Dos Penggalak' },
    ],
  },
  { name: 'Measles', doses: [{ age: '6m', label: 'Sabah Sahaja' }] },
  {
    name: 'MMR',
    doses: [
      { age: '9m', label: 'Dos 1' },
      { age: '12m', label: 'Dos 2' },
    ],
  },
  {
    name: 'Pneumokokal (PCV)',
    doses: [
      { age: '4m', label: 'Dos 1' },
      { age: '6m', label: 'Dos 2' },
      { age: '15m', label: 'Dos Penggalak' },
    ],
  },
  {
    name: 'JE (Sarawak Sahaja)',
    doses: [
      { age: '9m', label: 'Dos 1' },
      { age: '21m', label: 'Dos Penggalak' },
    ],
  },
  { name: 'DT', doses: [{ age: '7y', label: 'Dos Penggalak' }] },
  { name: 'HPV', doses: [{ age: '13y', label: '1 Dos' }] },
  { name: 'TT', doses: [{ age: '15y', label: 'Dos Penggalak' }] },
] as const
