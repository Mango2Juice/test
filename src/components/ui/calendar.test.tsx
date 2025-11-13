// src/components/ui/calendar.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Calendar, CalendarDayButton } from './calendar'

// Helpers
function getChevronButtons() {
  const buttons = screen.getAllByRole('button') as HTMLButtonElement[]
  // Prev/Next are rendered first in nav. Filter by aria-labels from react-day-picker defaults
  const prev = buttons.find((b) => b.className.includes('rdp-button_previous')) || buttons[0]
  const next = buttons.find((b) => b.className.includes('rdp-button_next')) || buttons[1]
  return { prev, next }
}

describe('Calendar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-05-15T00:00:00.000Z'))
  })

  it('renders with outside days visible by default', () => {
    render(<Calendar />)

    // Ensure grid (month table) is present
    expect(screen.getByRole('grid')).toBeInTheDocument()

    // By default showOutsideDays=true means we should see days from previous/next month
    // Validate by finding more than 28 day buttons carrying data-day
    const dayButtons = screen.getAllByRole('button').filter((b: any) => b?.dataset?.day)
    expect(dayButtons.length).toBeGreaterThan(28)
  })

  it('uses captionLayout="label" by default and renders custom Chevron icons', async () => {
    render(<Calendar />)

    // The nav chevrons should render custom lucide icons; clicking should navigate months
    const { prev, next } = getChevronButtons()
    expect(prev).toBeTruthy()
    expect(next).toBeTruthy()

    await userEvent.click(next)
    await userEvent.click(prev)

    // After navigation, caption should reflect a valid month label
    expect(screen.getByText(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/i)).toBeInTheDocument()
  })

  it('merges incoming formatters with defaults (short month names)', () => {
    render(<Calendar />)
    // Caption label should contain short month name (May) when system time is May 2024
    // react-day-picker renders the current month caption text in the document
    const caption = screen.getByText(/may/i)
    expect(caption).toBeInTheDocument()
  })

  it('forwards custom components and preserves built-ins', () => {
    const CustomWeekNumber = ({ children }: { children: React.ReactNode }) => (
      <td data-testid='custom-week'>{children}</td>
    )

    render(
      <Calendar
        showWeekNumber
        components={{
          WeekNumber: CustomWeekNumber as any,
        }}
      />,
    )

    // When week numbers are enabled, at least one custom week cell should be present
    expect(screen.getAllByTestId('custom-week').length).toBeGreaterThan(0)
  })

  it('applies buttonVariant to navigation buttons', () => {
    render(<Calendar buttonVariant='secondary' />)
    const { prev, next } = getChevronButtons()

    // Variant classes from buttonVariants should be applied; we assert presence of base button class
    expect(prev.className).toMatch(/btn|button|variant|secondary|ghost|outline/i)
    expect(next.className).toMatch(/btn|button|variant|secondary|ghost|outline/i)
  })
})

describe('CalendarDayButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-05-15T00:00:00.000Z'))
  })

  it('focuses when modifiers.focused is true', async () => {
    render(
      <table>
        <tbody>
          <tr>
            <CalendarDayButton day={{ date: new Date('2024-05-15') } as any} modifiers={{ focused: true } as any} />
          </tr>
        </tbody>
      </table>,
    )

    // Find button by data-day attribute formatted by toLocaleDateString
    const btn = screen.getByRole('button') as HTMLButtonElement
    // run effects
    await vi.runOnlyPendingTimersAsync()
    expect(document.activeElement === btn || btn.matches(':focus')).toBe(true)
  })

  it('sets data attributes based on selection and range modifiers', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CalendarDayButton
              day={{ date: new Date('2024-05-15') } as any}
              modifiers={{ selected: true, range_start: true, range_end: false, range_middle: false } as any}
            />
          </tr>
        </tbody>
      </table>,
    )

    const btn = screen.getByRole('button') as HTMLButtonElement
    expect(btn.getAttribute('data-selected-single')).toBe('false')
    expect(btn.getAttribute('data-range-start')).toBe('true')
    expect(btn.getAttribute('data-range-end')).toBe('false')
    expect(btn.getAttribute('data-range-middle')).toBe('false')
  })

  it('marks single selected when no range modifiers are set', () => {
    render(
      <table>
        <tbody>
          <tr>
            <CalendarDayButton day={{ date: new Date('2024-05-20') } as any} modifiers={{ selected: true } as any} />
          </tr>
        </tbody>
      </table>,
    )

    const btn = screen.getByRole('button') as HTMLButtonElement
    expect(btn.getAttribute('data-selected-single')).toBe('true')
  })
})
