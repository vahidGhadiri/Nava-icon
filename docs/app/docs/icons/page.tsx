import type { Metadata } from 'next'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { IconGallery } from '@/components/icon-gallery'
import type { Icon } from '@/lib/icons'

export const metadata: Metadata = { title: 'Icons' }

function stripHardcodedFill(inner: string): string {
  return inner
    .replace(/fill="black"/g, '')
    .replace(/fill="none"/g, '')
    .replace(/fill="white"/g, '')
    .replace(/fill="#000000"/g, '')
    .replace(/fill="#000"/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function discoverIcons(): Icon[] {
  const assetsDir = join(process.cwd(), '..', 'assets', 'icons')
  const regularDir = join(assetsDir, 'regular')
  const filledDir = join(assetsDir, 'filled')

  let regularFiles: string[] = []
  let filledFiles: string[] = []

  try { regularFiles = readdirSync(regularDir).filter(f => f.endsWith('.svg')) } catch {}
  try { filledFiles = readdirSync(filledDir).filter(f => f.endsWith('.svg')) } catch {}

  const iconMap = new Map<string, { regular: string | null; filled: string | null }>()

  for (const file of regularFiles) {
    const baseName = file.replace(/^bx-/, '').replace(/\.svg$/, '')
    const existing = iconMap.get(baseName)
    if (existing) existing.regular = join(regularDir, file)
    else iconMap.set(baseName, { regular: join(regularDir, file), filled: null })
  }

  for (const file of filledFiles) {
    const baseName = file.replace(/^bxs-/, '').replace(/\.svg$/, '')
    const existing = iconMap.get(baseName)
    if (existing) existing.filled = join(filledDir, file)
    else iconMap.set(baseName, { regular: null, filled: join(filledDir, file) })
  }

  const icons: Icon[] = []

  for (const [name, paths] of iconMap) {
    let regularSvg = ''
    let filledSvg = ''

    if (paths.regular) {
      const content = readFileSync(paths.regular, 'utf-8')
      const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
      regularSvg = match ? stripHardcodedFill(match[1].trim()) : ''
    }

    if (paths.filled) {
      const content = readFileSync(paths.filled, 'utf-8')
      const match = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)
      filledSvg = match ? stripHardcodedFill(match[1].trim()) : ''
    }

    const displayName = name.replace(/-/g, ' ')

    icons.push({
      name,
      regularSvg,
      filledSvg,
      tags: [displayName],
      categories: ['general'],
    })
  }

  return icons
}

export default function IconsPage() {
  const icons = discoverIcons()

  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold tracking-[-0.01em] mb-2">Icon Gallery</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed mb-8">
        Browse all available icons. Click any icon to see code for your framework.
      </p>
      <IconGallery icons={icons} />
    </article>
  )
}
