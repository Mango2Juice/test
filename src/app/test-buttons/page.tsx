'use client'

import { Download, Heart, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Page component demonstrating all Button component variants, sizes, and interactive states.
 *
 * Renders grouped examples of default, primary, secondary, outline, ghost, destructive, and link buttons,
 * showcases size variants (sm, default, lg, touch, icon), and provides interactive state examples.
 * Includes a "Test Loading" button that simulates a 2-second loading state when clicked.
 *
 * @returns The rendered Test Buttons page as a React element.
 */
export default function TestButtonsPage() {
  const [loading, setLoading] = useState(false)

  const handleLoadingTest = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className='container mx-auto p-6 space-y-8'>
      <div className='space-y-2'>
        <h1 className='text-heading-1'>Button Component Test</h1>
        <p className='text-muted-foreground'>Testing the enhanced button component with modern stylinions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Button Variants</CardTitle>
          <CardDescription>All button variants with hover and active states</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-heading-5'>Default Variant</h3>
            <div className='flex flex-wrap gap-4'>
              <Button>Default Button</Button>
              <Button disabled>Disabled</Button>
              <Button loading={loading} onClick={handleLoadingTest}>
                {loading ? 'Loading...' : 'Test Loading'}
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Primary Variant (Gradient)</h3>
            <div className='flex flex-wrap gap-4'>
              <Button variant='primary'>Primary Button</Button>
              <Button variant='primary' disabled>
                Disabled
              </Button>
              <Button variant='primary'>
                <Plus className='mr-2 h-4 w-4' />
                With Icon
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Secondary Variant</h3>
            <div className='flex flex-wrap gap-4'>
              <Button variant='secondary'>Secondary Button</Button>
              <Button variant='secondary' disabled>
                Disabled
              </Button>
              <Button variant='secondary'>
                <Download className='mr-2 h-4 w-4' />
                Download
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Outline Variant</h3>
            <div className='flex flex-wrap gap-4'>
              <Button variant='outline'>Outline Button</Button>
              <Button variant='outline' disabled>
                Disabled
              </Button>
              <Button variant='outline'>
                <Heart className='mr-2 h-4 w-4' />
                Favorite
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Ghost Variant</h3>
            <div className='flex flex-wrap gap-4'>
              <Button variant='ghost'>Ghost Button</Button>
              <Button variant='ghost' disabled>
                Disabled
              </Button>
              <Button variant='ghost'>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Destructive Variant</h3>
            <div className='flex flex-wrap gap-4'>
              <Button variant='destructive'>Destructive Button</Button>
              <Button variant='destructive' disabled>
                Disabled
              </Button>
              <Button variant='destructive'>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete Forever
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Link Variant</h3>
            <div className='flex flex-wrap gap-4'>
              <Button variant='link'>Link Button</Button>
              <Button variant='link' disabled>
                Disabled
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Button Sizes</CardTitle>
          <CardDescription>Different button sizes for various use cases</CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-2'>
            <h3 className='text-heading-5'>Size Variants</h3>
            <div className='flex flex-wrap items-center gap-4'>
              <Button size='sm'>Small</Button>
              <Button size='default'>Default</Button>
              <Button size='lg'>Large</Button>
              <Button size='touch'>Touch (48px)</Button>
              <Button size='icon'>
                <Plus className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <h3 className='text-heading-5'>Primary Sizes</h3>
            <div className='flex flex-wrap items-center gap-4'>
              <Button variant='primary' size='sm'>
                Small
              </Button>
              <Button variant='primary' size='default'>
                Default
              </Button>
              <Button variant='primary' size='lg'>
                Large
              </Button>
              <Button variant='primary' size='touch'>
                Touch
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive States</CardTitle>
          <CardDescription>Test hover, active, and focus states</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>
              Hover over buttons to see scale animation (1.02x) and shadow increase
            </p>
            <p className='text-sm text-muted-foreground'>Click buttons to see active state animation (0.95x scale)</p>
            <p className='text-sm text-muted-foreground'>Tab through buttons to see focus ring (2px primary color)</p>
          </div>
          <div className='flex flex-wrap gap-4'>
            <Button>Hover Me</Button>
            <Button variant='primary'>Click Me</Button>
            <Button variant='outline'>Focus Me</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}