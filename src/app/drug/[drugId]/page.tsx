// src/app/drug/[drugId]/page.tsx

import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { AlertCircle, TriangleAlert } from 'lucide-react'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { findMedicationById } from '@/lib/quick-reference-database/filtering'
import { medications as allDrugData } from '@/lib/quick-reference-database/medications'
import { Callout } from '@/mdx-components'

interface DrugPageProps {
  params: {
    drugId: string
  }
}

/**
 * Fetches the MDX content for a given drug ID from the filesystem.
 * @param baseDrugId The base identifier for the drug, used to find the .mdx file.
 * @returns The parsed MDX content and frontmatter, or null if not found.
 */
async function getMdxContent(baseDrugId: string) {
  try {
    const mdxDirectory = path.join(process.cwd(), 'src/lib/quick-reference-database/medications-full/')
    const filePath = path.join(mdxDirectory, `${baseDrugId}.mdx`)
    const source = await fs.readFile(filePath, 'utf-8')
    const { content, data } = matter(source)
    return { content, frontmatter: data }
  } catch (error) {
    // File not found is an expected outcome if no detailed page exists.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null
    }
    // For other errors, we can choose to log them but still return null.
    console.error(`Failed to read MDX file for ${baseDrugId}:`, error)
    return null
  }
}

/**
 * Retrieves all relevant data for a drug, including quick reference info and detailed MDX content.
 * @param drugId The ID of the drug from the URL parameters.
 * @returns An object containing the quick reference drug data and MDX data, or null if not found.
 */
async function getDrugPageData(drugId: string) {
  if (typeof drugId !== 'string') {
    console.error('[getDrugPageData] FAILED: drugId parameter is missing or not a string.')
    return null
  }

  // The lookup ID for the quick reference data array
  const lookupId = `${drugId.replace(/-quick$/, '')}-quick`
  const quickRefDrug = findMedicationById(allDrugData, lookupId)

  // Use mainDatabaseId for MDX lookup if it exists, otherwise derive from the URL drugId
  const baseDrugId = quickRefDrug?.mainDatabaseId || drugId.replace(/-quick$/, '')

  // If baseDrugId is not available, we can't fetch MDX content.
  if (!baseDrugId) {
    return null
  }

  const mdxData = await getMdxContent(baseDrugId)

  // The drug page is only valid if both the quick reference entry AND the MDX file exist.
  if (!quickRefDrug || !mdxData) {
    return null
  }

  return { quickRefDrug, mdxData }
}

/**
 * Produce page metadata for a drug using MDX frontmatter when available, otherwise fall back to quick-reference data.
 *
 * @param props - Route props containing `params` with the `drugId`
 * @returns An object with `title` and `description` strings. If the drug or MDX data is missing, `title` will be `"Drug Not Found"` and `description` will be a default not-found message.
 */
export async function generateMetadata({ params }: DrugPageProps) {
  const { drugId } = params
  const data = await getDrugPageData(drugId)

  if (!data) {
    return {
      title: 'Drug Not Found',
      description: 'The requested medication could not be found.',
    }
  }

  const { quickRefDrug, mdxData } = data
  const title = mdxData.frontmatter?.title || quickRefDrug.name
  const description = mdxData.frontmatter?.description || `Detailed clinical and safety notes for ${quickRefDrug.name}.`

  return {
    title: `${title} | Drug Information`,
    description,
  }
}

/**
 * Render the drug detail page with MDX-rendered content and basic metadata.
 *
 * @param props - Route props object containing `params` with the `drugId` of the drug to load
 * @returns The page's React element. If the drug or its MDX content cannot be found, triggers `notFound()` to render a 404 page.
 */
export default async function DrugPage({ params }: DrugPageProps) {
  const { drugId } = params
  const data = await getDrugPageData(drugId)

  // If no data is returned (either drug not found or MDX file missing), show a 404 page.
  if (!data) {
    notFound()
  }

  const { content, frontmatter } = data.mdxData
  const components = {
    Callout,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Alert,
    AlertTitle,
    AlertDescription,
    AlertCircle,
    TriangleAlert,
  }

  const aliases = Array.isArray(frontmatter.aliases) ? frontmatter.aliases.join(', ') : frontmatter.aliases

  return (
    <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24'>
      <article className='prose dark:prose-invert lg:prose-lg'>
        <h1>{frontmatter.title}</h1>
        {aliases && <p className='text-muted-foreground italic'>Also known as: {aliases}</p>}
        <MDXRemote source={content} components={components} />
      </article>
    </div>
  )
}
