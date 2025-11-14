/**
 * @fileoverview Mobile-optimized form components with proper touch targets and spacing
 */

import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentProps, forwardRef } from 'react'

import { cn } from '../../lib/utils'

/**
 * Mobile form field wrapper with proper spacing to prevent mis-taps
 */
const mobileFormFieldVariants = cva('space-y-2', {
  variants: {
    spacing: {
      default: 'mb-6',
      compact: 'mb-4',
      comfortable: 'mb-8',
    },
  },
  defaultVariants: {
    spacing: 'default',
  },
})

export interface MobileFormFieldProps extends ComponentProps<'div'>, VariantProps<typeof mobileFormFieldVariants> {}

/**
 * Form field wrapper that ensures proper spacing between interactive elements
 * to prevent accidental touches on mobile devices
 */
export const MobileFormField = forwardRef<HTMLDivElement, MobileFormFieldProps>(
  ({ className, spacing, ...props }, ref) => {
    return <div ref={ref} className={cn(mobileFormFieldVariants({ spacing, className }))} {...props} />
  },
)
MobileFormField.displayName = 'MobileFormField'

/**
 * Mobile form group with proper touch target spacing
 */
const mobileFormGroupVariants = cva('space-y-6', {
  variants: {
    density: {
      default: 'space-y-6',
      compact: 'space-y-4',
      comfortable: 'space-y-8',
    },
  },
  defaultVariants: {
    density: 'default',
  },
})

export interface MobileFormGroupProps extends ComponentProps<'div'>, VariantProps<typeof mobileFormGroupVariants> {}

/**
 * Form group that provides consistent spacing between form sections
 * optimized for mobile touch interactions
 */
export const MobileFormGroup = forwardRef<HTMLDivElement, MobileFormGroupProps>(
  ({ className, density, ...props }, ref) => {
    return <div ref={ref} className={cn(mobileFormGroupVariants({ density, className }))} {...props} />
  },
)
MobileFormGroup.displayName = 'MobileFormGroup'

/**
 * Mobile input group with proper touch target alignment
 */
export interface MobileInputGroupProps extends ComponentProps<'div'> {
  /**
   * Whether to stack elements vertically on mobile
   */
  stackOnMobile?: boolean
}

/**
 * Input group that handles proper alignment and spacing for mobile devices
 */
export const MobileInputGroup = forwardRef<HTMLDivElement, MobileInputGroupProps>(
  ({ className, stackOnMobile = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', stackOnMobile && 'flex-col sm:flex-row sm:items-center', className)}
        {...props}
      />
    )
  },
)
MobileInputGroup.displayName = 'MobileInputGroup'

/**
 * Touch-friendly label component with proper sizing
 */
export interface MobileLabelProps extends ComponentProps<'label'> {
  /**
   * Whether the label should be optimized for touch interaction
   */
  touchOptimized?: boolean
}

/**
 * Label component optimized for mobile touch interactions
 */
export const MobileLabel = forwardRef<HTMLLabelElement, MobileLabelProps>(
  ({ className, touchOptimized = false, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          touchOptimized && 'min-h-11 flex items-center py-2',
          className,
        )}
        {...props}
      />
    )
  },
)
MobileLabel.displayName = 'MobileLabel'
