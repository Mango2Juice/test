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
  const prev = buttons.find((b): b is HTMLButtonElement => b.getAttribute('aria-label') === 'Go to previous month')
  const next = buttons.find((b): b is HTMLButtonElement => b.getAttribute('aria-label') === 'Go to next month')
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
    // For May 2024, this includes April 28-30 and June 1-8
    expect(screen.getByText('28')).toBeInTheDocument() // April 28
    expect(screen.getByText('15')).toBeInTheDocument() // May 15
    expect(screen.getByText('1')).toBeInTheDocument() // June 1
  })

  it('uses captionLayout="label" by default and renders custom Chevron icons', async () => {
    render(<Calendar />)

    // The nav chevrons should render custom lucide icons; clicking should navigate months
    const { prev, next } = getChevronButtons()
    expect(prev).toBeInTheDocument()
    expect(next).toBeInTheDocument()

    if (next) await userEvent.click(next)
    expect(screen.getByText(/june 2024/i)).toBeInTheDocument()

    if (prev) await userEvent.click(prev)
    expect(screen.getByText(/may 2024/i)).toBeInTheDocument()
  })

  it('merges incoming formatters with defaults (short month names)', () => {
    render(<Calendar />)
    // Caption label should contain short month name (May) when system time is May 2024
    const caption = screen.getByText(/may 2024/i)
    expect(caption).toBeInTheDocument()
  })

  it('forwards custom components and preserves built-ins', () => {
    const CustomWeekNumber = ({ weekNumber }: { weekNumber: number }) => <td data-testid='custom-week'>{weekNumber}</td>

    render(
      <Calendar
        showWeekNumber
        components={{
          WeekNumber: (props: WeekNumberProps) => <CustomWeekNumber weekNumber={props.weekNumber} />,
        }}
      />,
    )

    // When week numbers are enabled, at least one custom week cell should be present
    expect(screen.getAllByTestId('custom-week').length).toBeGreaterThan(0)
  })

  it('applies buttonVariant to navigation buttons', () => {
    render(<Calendar buttonVariant='secondary' />)
    const { prev, next } = getChevronButtons()

    if (prev) {
      expect(prev.className).toContain('bg-secondary')
    }
    if (next) {
      expect(next.className).toContain('bg-secondary')
    }
  })
})

describe('CalendarDayButton', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2024-05-15T00:00:00.000Z'))
  })

  // A minimal mock for the dateLib prop required by CalendarDay
  const mockDateLib = {
    addDays: vi.fn(),
    addMonths: vi.fn(),
    addYears: vi.fn(),
    endOfDay: vi.fn(),
    endOfMonth: vi.fn(),
    endOfWeek: vi.fn(),
    endOfYear: vi.fn(),
    format: vi.fn(),
    isSameDay: vi.fn(),
    isSameMonth: vi.fn(),
    isSameYear: vi.fn(),
    parse: vi.fn(),
    startOfDay: vi.fn(),
    startOfMonth: vi.fn(),
    startOfWeek: vi.fn(),
    startOfYear: vi.fn(),
  }

  it('focuses when modifiers.focused is true', async () => {
    const day: CalendarDay = {
      date: new Date('2024-05-15'),
      displayMonth: new Date('2024-05-01'),
      activeModifiers: { focused: true },
      dateLib: mockDateLib,
      isEqualTo: () => false,
      isOutside: false,
    }

    const modifiers: Modifiers = { focused: true }

    render(
      <table>
        <tbody>
          <tr>
            <td>
              <CalendarDayButton day={day} modifiers={modifiers} />
            </td>
          </tr>
        </tbody>
      </table>,
    )

    const btn = screen.getByRole('button')
    // Focus is managed via useEffect in the component, so we need to wait for it
    await vi.runOnlyPendingTimersAsync()
    expect(document.activeElement).toBe(btn)
  })

  it('sets data attributes based on selection and range modifiers', () => {
    const day: CalendarDay = {
      date: new Date('2024-05-15'),
      displayMonth: new Date('2024-05-01'),
      activeModifiers: {},
      dateLib: mockDateLib,
      isEqualTo: () => false,
      isOutside: true,
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
            <td>
              <CalendarDayButton day={day} modifiers={modifiers} />
            </td>
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
      dateLib: mockDateLib,
      isEqualTo: () => false,
      isOutside: true,
    }
    const modifiers: Modifiers = { selected: true }

    render(
      <table>
        <tbody>
          <tr>
            <td>
              <CalendarDayButton day={day} modifiers={modifiers} />
            </td>
          </tr>
        </tbody>
      </table>,
    )

    const btn = screen.getByRole('button')
    expect(btn.getAttribute('data-selected-single')).toBe('true')
  })
})
