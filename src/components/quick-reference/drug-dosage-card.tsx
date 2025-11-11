// src/components/quick-reference/drug-dosage-card.tsx
'use client'

import { AlertTriangle, BookOpen, Heart, History, Share2, Trash2 } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import { useCallback, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { ContextMenuOverlay } from '@/components/ui/context-menu-overlay'
import { SwipeableCard } from '@/components/ui/swipeable-card'
import { useLongPress } from '@/hooks/use-long-press'
import { useDeviceInfo } from '@/hooks/use-mobile'
import type {
  QuickReferenceCalculation,
  QuickReferenceComplaintCategory,
  QuickReferenceMedication,
} from '@/lib/quick-reference-database'
import { cn } from '@/lib/utils'
import { AriaLabels } from '@/lib/utils/accessibility/labels'

interface DrugDosageCardProps {
  drug: QuickReferenceMedication
  calculationResult: QuickReferenceCalculation | null
  categories: readonly QuickReferenceComplaintCategory[]
  onClick?: () => void
  onFavorite?: () => void
  onDelete?: () => void
  onHistory?: () => void
  onShare?: () => void
  enableSwipe?: boolean
  enableLongPress?: boolean
  className?: string
}

// Color mapping for medication types based on complaint tags
const MEDICATION_TYPE_COLORS = {
  gray: {
    text: 'text-slate-600 dark:text-slate-400',
    badge: 'bg-slate-600 text-white',
  },
  red: {
    text: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-600 text-white',
  },
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-600 text-white',
  },
  orange: {
    text: 'text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-600 text-white',
  },
  green: {
    text: 'text-green-600 dark:text-green-400',
    badge: 'bg-green-600 text-white',
  },
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    badge: 'bg-purple-600 text-white',
  },
  pink: {
    text: 'text-pink-600 dark:text-pink-400',
    badge: 'bg-pink-600 text-white',
  },
  yellow: {
    text: 'text-yellow-600 dark:text-yellow-400',
    badge: 'bg-yellow-600 text-white',
  },
  default: {
    text: 'text-slate-600 dark:text-slate-400',
    badge: 'bg-slate-600 text-white',
  },
} as const

type ColorKey = keyof typeof MEDICATION_TYPE_COLORS

/**
 * Selects the primary complaint category for a medication from the provided categories.
 *
 * @param drug - Medication object whose `complaintCategories` (array of category ids) are used to determine the primary category.
 * @param categories - Available complaint categories to match against.
 * @returns The matching complaint category. If no direct match is found, returns the category with id `symptomatic` if present; otherwise returns a default `"General"` category object.
 */
function getPrimaryComplaintCategory(
  drug: QuickReferenceMedication,
  categories: readonly QuickReferenceComplaintCategory[],
): QuickReferenceComplaintCategory {
  const primaryTag = drug.complaintCategories?.find((tag) =>
    categories.some((cat) => cat.id === tag && cat.id !== 'all'),
  )

  const foundCategory =
    categories.find((cat) => cat.id === primaryTag) || categories.find((cat) => cat.id === 'symptomatic')

  if (!foundCategory) {
    // Fallback category if categories array is empty or no match is found
    return {
      id: 'default',
      name: 'general',
      displayName: 'General',
      color: 'gray',
      enabled: true,
      sortOrder: 99,
    }
  }

  return foundCategory
}

/**
 * Selects the UI color mapping for a complaint category.
 *
 * @param complaintCategory - The complaint category whose `color` key is used to look up styling.
 * @returns The color mapping object (containing `text` and `badge` class names) for the category's color, or the default mapping if the color key is not found.
 */
function getMedicationTypeColors(complaintCategory: QuickReferenceComplaintCategory) {
  const color = complaintCategory.color
  if (color in MEDICATION_TYPE_COLORS) {
    return MEDICATION_TYPE_COLORS[color as ColorKey]
  }
  return MEDICATION_TYPE_COLORS.default
}

/**
 * Format a calculation result's dose into a human-readable string with appropriate units.
 *
 * @param calculationResult - Calculation object whose `adminVolumeMl` and `doseMg` determine the output
 * @returns A string in the form `"<value> mL"` when `adminVolumeMl` is set, `"<value> g"` when `doseMg` is 1000 or greater, or `"<value> mg"` otherwise
 */
function formatDosage(calculationResult: QuickReferenceCalculation): string {
  const { adminVolumeMl, doseMg } = calculationResult

  if (adminVolumeMl !== null) {
    return `${adminVolumeMl.toFixed(1)} mL`
  }

  if (doseMg >= 1000) {
    return `${(doseMg / 1000).toFixed(1)} g`
  }
  return `${doseMg.toFixed(0)} mg`
}

/**
 * Convert a frequency description into its canonical uppercase short form.
 *
 * Maps common abbreviations and plain-language frequencies (e.g., "once daily", "twice daily")
 * to standard short forms like `OD`, `BD`, `TDS`, `QID`.
 *
 * @param frequencyText - Frequency string to normalize (case-insensitive)
 * @returns The canonical uppercase frequency if recognized (e.g., `OD`, `BD`, `TDS`, `QID`), otherwise `frequencyText` uppercased
 */
function formatFrequency(frequencyText: string): string {
  const frequencyMap: Record<string, string> = {
    od: 'OD',
    bd: 'BD',
    tds: 'TDS',
    qid: 'QID',
    on: 'ON',
    om: 'OM',
    prn: 'PRN',
    eod: 'EOD',
    'once daily': 'OD',
    'twice daily': 'BD',
    'three times daily': 'TDS',
    'four times daily': 'QID',
  }
  return frequencyMap[frequencyText.toLowerCase()] || frequencyText.toUpperCase()
}

/**
 * Display a medication card with its name and formatted dosage (or a loading skeleton when no calculation is available).
 *
 * Shows a dosage badge with frequency when `calculationResult` is present and valid, or an inline error indicator when the calculation is invalid. Supports click/keyboard activation and exposes optional actions (favorite, delete, history, share) via swipe or a long-press context menu on mobile.
 *
 * @param drug - Medication data used for display text and category-derived styling
 * @param calculationResult - Calculation details to display; pass `null` to render the loading skeleton
 * @param categories - All complaint categories used to derive the primary category and styling
 * @param onClick - Callback invoked when the card is clicked or activated via keyboard
 * @param onFavorite - Optional callback for the favorite action
 * @param onDelete - Optional callback for the delete action
 * @param onHistory - Optional callback for viewing history
 * @param onShare - Optional callback for sharing
 * @param enableSwipe - Whether to enable swipe gestures (default: true)
 * @param enableLongPress - Whether to enable the long-press context menu on mobile (default: true)
 * @param className - Additional CSS classes applied to the root element
 * @returns The JSX element for the drug dosage card
 */
export function DrugDosageCard({
  drug,
  calculationResult,
  categories,
  onClick,
  onFavorite,
  onDelete,
  onHistory,
  onShare,
  enableSwipe = true,
  enableLongPress = true,
  className,
}: DrugDosageCardProps) {
  const { isMobile } = useDeviceInfo()
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const primaryCategory = getPrimaryComplaintCategory(drug, categories)
  const colors = getMedicationTypeColors(primaryCategory)

  const handleClick = useCallback(() => {
    if (!isPressing) {
      onClick?.()
    }
  }, [onClick, isPressing])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onClick?.()
      }
    },
    [onClick],
  )

  const handleLongPress = useCallback(() => {
    setIsContextMenuOpen(true)
  }, [])

  const longPressHandlers = useLongPress({
    onLongPress: handleLongPress,
    onPress: handleClick,
    duration: 500,
    enabled: enableLongPress && isMobile && (!!onFavorite || !!onDelete || !!onHistory || !!onShare),
    onPressStart: () => setIsPressing(true),
    onPressEnd: () => setIsPressing(false),
  })

  const contextMenuItems = []
  if (onFavorite) {
    contextMenuItems.push({
      icon: <Heart size={20} />,
      label: 'Add to Favorites',
      onClick: onFavorite,
    })
  }
  if (onHistory) {
    contextMenuItems.push({
      icon: <History size={20} />,
      label: 'View History',
      onClick: onHistory,
    })
  }
  if (onShare) {
    contextMenuItems.push({
      icon: <Share2 size={20} />,
      label: 'Share',
      onClick: onShare,
    })
  }
  if (onDelete) {
    contextMenuItems.push({
      icon: <Trash2 size={20} />,
      label: 'Remove',
      onClick: onDelete,
      variant: 'destructive' as const,
    })
  }

  const isClickable = !!onClick

  if (!calculationResult) {
    return (
      <div className={cn('p-3 animate-pulse', isMobile ? 'min-h-[60px]' : 'min-h-[68px]', className)}>
        <div className='h-4 bg-muted rounded w-3/4 mb-2' />
        <div className='h-8 bg-muted rounded w-1/2' />
      </div>
    )
  }

  const isValidCalculation = calculationResult.isCalculationValid

  const dosageText = `${formatDosage(calculationResult)} ${formatFrequency(calculationResult.frequencyText)}`
  const cardAriaLabel = isClickable
    ? `${AriaLabels.drugDosageCard(drug.name, dosageText)}. Press Enter or Space to view details.`
    : AriaLabels.drugDosageCard(drug.name, dosageText)

  const cardContent = (
    <>
      <button
        type='button'
        className={cn(
          'padding-inline gap-inline transition-all duration-200 h-full w-full text-left flex flex-col justify-between',
          'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isPressing && 'scale-95',
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={cardAriaLabel}
        {...(enableLongPress && isMobile ? longPressHandlers : {})}
      >
        <div className='gap-inline' style={{ display: 'flex', flexDirection: 'column' }}>
          <p className={cn('text-sm font-medium truncate', colors.text)}>{drug.name}</p>
          {isValidCalculation ? (
            <Badge className={cn('font-bold', colors.badge, isMobile ? 'text-sm px-3 py-1' : 'text-base px-4 py-1.5')}>
              {dosageText}
            </Badge>
          ) : (
            <div className='flex items-center gap-inline text-destructive'>
              <AlertTriangle size={12} />
              <span className='text-xs font-medium'>Calculation Error</span>
            </div>
          )}
        </div>
        <div className='flex items-center text-muted-foreground gap-inline spacing-inline'>
          <BookOpen size={12} />
          <span className='text-xs'>Details</span>
        </div>
      </button>

      {/* Context Menu */}
      <ContextMenuOverlay
        isOpen={isContextMenuOpen}
        onClose={() => setIsContextMenuOpen(false)}
        items={contextMenuItems}
        title={drug.name}
      />
    </>
  )

  // Wrap with SwipeableCard if swipe is enabled and on mobile
  if (enableSwipe && isMobile) {
    return (
      <SwipeableCard
        onFavorite={onFavorite}
        onDelete={onDelete}
        onHistory={onHistory}
        onShare={onShare}
        enabled={enableSwipe}
        className={className}
      >
        {cardContent}
      </SwipeableCard>
    )
  }

  return <div className={className}>{cardContent}</div>
}