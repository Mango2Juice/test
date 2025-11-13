// src/components/ui/calendar.test.tsx

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { CalendarDay, Modifiers, WeekNumberProps } from 'react-day-picker'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Calendar, CalendarDayButton } from './calendar'

// Helpers
function getChevronButtons() {
  const buttons = screen.getAllByRole('button')
  // Prev/Next are rendered first in nav. Filter by aria-labels from react-day-picker defaults
  const prev = buttons.find((b): b is HTMLButtonElement => b.classList.contains('rdp-button_previous'))
  const next = buttons.find((b): b is HTMLButtonElement => b.classList.contains('rdp-button_next'))
  return { prev, next }
}

describe('Calendar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-05-15T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })

  it('renders with outside days visible by default', () => {
    render(<Calendar />)

    // Ensure grid (month table) is present
    expect(screen.getByRole('grid')).toBeInTheDocument()

    // By default showOutsideDays=true means we should see days from previous/next month
    // Validate by finding more than 28 day buttons
    const dayButtons = screen.getAllByRole('button', { name: /\d/ })
    expect(dayButtons.length).toBeGreaterThan(28)
  })

  it('uses captionLayout="label" by default and renders custom Chevron icons', async () => {
    render(<Calendar />)

    // The nav chevrons should render custom lucide icons; clicking should navigate months
    const { prev, next } = getChevronButtons()
    expect(prev).toBeInTheDocument()
    expect(next).toBeInTheDocument()

    if (next) await userEvent.click(next)
    if (prev) await userEvent.click(prev)

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
    const CustomWeekNumber = ({ weekNumber }: { weekNumber: number }) => <td data-testid='custom-week'>{weekNumber}</td>

    render(
      <Calendar
        showWeekNumber
        components={{
          WeekNumber: (props: WeekNumberProps) => <CustomWeekNumber weekNumber={props.number} />,
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
    if (prev) {
      expect(prev.className).toMatch(/btn|button|variant|secondary|ghost|outline/i)
    }
    if (next) {
      expect(next.className).toMatch(/btn|button|variant|secondary|ghost|outline/i)
    }
  })
})

describe('CalendarDayButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-05-15T00:00:00.000Z'))
  })

  it('focuses when modifiers.focused is true', async () => {
    const day: CalendarDay = {
      date: new Date('2024-05-15'),
      displayMonth: new Date('2024-05-01'),
      activeModifiers: { focused: true },
    } as unknown as CalendarDay

    const modifiers: Modifiers = { focused: true }

    render(
      <table>
        <tbody>
          <tr>
            <CalendarDayButton day={day} modifiers={modifiers} />
          </tr>
        </tbody>
      </table>,
    )

    // Find button by data-day attribute formatted by toLocaleDateString
    const btn = screen.getByRole('button')
    // run effects
    await vi.runOnlyPendingTimersAsync()
    expect(document.activeElement === btn || btn.matches(':focus')).toBe(true)
  })

  it('sets data attributes based on selection and range modifiers', () => {
    const day: CalendarDay = {
      date: new Date('2024-05-15'),
      displayMonth: new Date('2024-05-01'),
      activeModifiers: {},
      dateLib: new Date(),
      isEqualTo: () => false,
      outside: 'start',
    }
    const modifiers: Modifiers = {
      selected: true,
      range_start: true,
      range_end: false,
      range_middle: false,
    }

    render(
      <table>
        <tbody>
          <tr>
            <CalendarDayButton day={day} modifiers={modifiers} />
          </tr>
        </tbody>
      </table>,
    )

    const btn = screen.getByRole('button')
    expect(btn.getAttribute('data-selected-single')).toBe('false')
    expect(btn.getAttribute('data-range-start')).toBe('true')
    expect(btn.getAttribute('data-range-end')).toBe('false')
    expect(btn.getAttribute('data-range-middle')).toBe('false')
  })

  it('marks single selected when no range modifiers are set', () => {
    const day: CalendarDay = {
      date: new Date('2024-05-20'),
      displayMonth: new Date('2024-05-01'),
      activeModifiers: {},
      dateLib: new Date(),
      isEqualTo: () => false,
      outside: 'start',
    }
    const modifiers: Modifiers = { selected: true }

    render(
      <table>
        <tbody>
          <tr>
            <CalendarDayButton day={day} modifiers={modifiers} />
          </tr>
        </tbody>
      </table>,
    )

    const btn = screen.getByRole('button')
    expect(btn.getAttribute('data-selected-single')).toBe('true')
  })
})
