// /src/lib/utils/accessibility/labels.ts

import type { AudienceMode } from '@/lib/types'

export const AriaLabels = {
  // Main Navigation
  navQuickReference: 'Quick Reference page',
  navCalculators: 'Medical Calculators page',
  navResources: 'Clinical Resources page',
  navThemeToggle: 'Toggle color theme',

  // Quick Reference Components
  weightInput: (audience: AudienceMode) =>
    audience === 'paediatric'
      ? 'Patient weight in kilograms. If left blank, weight will be estimated from age.'
      : 'Patient weight in kilograms',
  weightInputDescription: (audience: AudienceMode) =>
    audience === 'paediatric'
      ? 'Enter the patient\'s weight in kilograms. If left blank, an estimated weight will be used based on age.'
      : 'Enter the patient\'s weight in kilograms.',
  ageInput: 'Patient age in years or months',
  complaintFilter: 'Filter medications by complaint category',
  drugDosageCard: (name: string, dosage: string) => `${name}: ${dosage}`,

  // Search
  searchMedications: 'Search for medications by name',

  // Medical Calculators
  centorScoreForm: 'Centor Score clinical criteria form',
  phq9Form: 'PHQ-9 questionnaire form',

  // Common UI Elements
  backButton: 'Go back to the previous page',
  resetButton: 'Reset form fields to their default values',
  calculateButton: 'Calculate score or result based on inputs',
  closeModal: 'Close dialog or modal window',
  favoriteButton: (name: string) => `Add ${name} to favorites`,
  removeFavoriteButton: (name: string) => `Remove ${name} from favorites`,
}
