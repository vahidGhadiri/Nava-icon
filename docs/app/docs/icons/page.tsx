import type { Metadata } from 'next'
import { IconGallery } from '@/components/icon-gallery'

export const metadata: Metadata = { title: 'Icons' }

export default function IconsPage() {
  return (
    <article className="max-w-none">
      <h1 className="text-3xl font-bold tracking-[-0.01em] mb-2">Icon Gallery</h1>
      <p className="text-surface-500 dark:text-surface-400 text-[15px] leading-relaxed mb-8">
        Browse all available icons. Click any icon to see code for your framework.
      </p>
      <IconGallery />
    </article>
  )
}
