import { Check } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ageMonths, ageYears, vaccineDescriptions, vaccines } from '@/lib/medical-data/immunisation-schedule'
import { cn } from '@/lib/utils'

export const metadata = {
  title: 'National Immunisation Schedule | Doses',
  description: "Malaysia's National Immunisation Programme (NIP) schedule, updated as of August 2023.",
}

/**
 * Render the National Immunisation Schedule page with a responsive table of vaccines by age and a grid of descriptive cards.
 *
 * @returns The page markup containing a responsive immunisation schedule table (month/year columns with scheduled dose indicators) and a grid of vaccine description cards.
 */
export default function NationalImmunisationSchedulePage() {
  return (
    <div className='w-full max-w-6xl mx-auto'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Jadual Imunisasi Kebangsaan</h1>
        <p className='text-muted-foreground mt-2'>Kementerian Kesihatan Malaysia (Kemaskini Ogos 2023)</p>
      </div>

      <Card>
        <CardContent className='p-2 md:p-4'>
          <div className='overflow-x-auto'>
            <Table className='min-w-max border-collapse'>
              <TableHeader>
                <TableRow className='bg-primary/10'>
                  <TableHead className='sticky left-0 z-10 bg-primary/10 w-[200px] border-r' rowSpan={2}>
                    Imunisasi
                  </TableHead>
                  <TableHead className='text-center border-r' colSpan={ageMonths.length}>
                    Umur (Bulan)
                  </TableHead>
                  <TableHead className='text-center' colSpan={ageYears.length}>
                    Umur (Tahun)
                  </TableHead>
                </TableRow>
                <TableRow className='bg-primary/10'>
                  {ageMonths.map((age) => (
                    <TableHead key={`month-${age}`} className='text-center p-2 border-r'>
                      {age}
                    </TableHead>
                  ))}
                  {ageYears.map((age) => (
                    <TableHead key={`year-${age}`} className='text-center p-2 border-r'>
                      {age}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {vaccines.map((vaccine) => (
                  <TableRow key={vaccine.name}>
                    <TableCell className='sticky left-0 z-10 bg-background font-medium border-r'>
                      {vaccine.name}
                    </TableCell>
                    {ageMonths.map((age) => {
                      const dose = vaccine.doses.find((d) => d.age === `${age}m`)
                      return (
                        <TableCell
                          key={`${vaccine.name}-month-${age}`}
                          className={cn(
                            'text-center p-2 border-r text-xs',
                            dose && 'bg-green-100/50 dark:bg-green-900/50',
                          )}
                        >
                          {dose ? (
                            <>
                              <Check className='inline-block w-3 h-3 mr-1' aria-hidden='true' />
                              <span className='font-semibold'>{dose.label}</span>
                              <span className='sr-only'>(Dose scheduled)</span>
                            </>
                          ) : null}
                        </TableCell>
                      )
                    })}
                    {ageYears.map((age) => {
                      const dose = vaccine.doses.find((d) => d.age === `${age}y`)
                      return (
                        <TableCell
                          key={`${vaccine.name}-year-${age}`}
                          className={cn(
                            'text-center p-2 border-r text-xs',
                            dose && 'bg-green-100/50 dark:bg-green-900/50',
                          )}
                        >
                          {dose ? (
                            <>
                              <Check className='inline-block w-3 h-3 mr-1' aria-hidden='true' />
                              <span className='font-semibold'>{dose.label}</span>
                              <span className='sr-only'>(Dose scheduled)</span>
                            </>
                          ) : null}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {vaccineDescriptions.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground'>{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}