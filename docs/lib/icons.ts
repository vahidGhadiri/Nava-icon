export type Framework = 'react' | 'vue' | 'angular' | 'web-components'
export type IconMode = 'regular' | 'filled'

export interface Icon {
  name: string
  regularSvg: string
  filledSvg: string
  tags: string[]
  categories: string[]
}

export const categories: string[] = ['general']

export const icons: Icon[] = [
  {
    name: "check-circle",
    regularSvg: `<path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" />
<path d="M9.99902 13.587L7.70002 11.292L6.28802 12.708L10.001 16.413L16.707 9.70703L15.293 8.29303L9.99902 13.587Z" />`,
    filledSvg: `<path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM10.001 16.413L6.288 12.708L7.7 11.292L9.999 13.587L15.293 8.293L16.707 9.707L10.001 16.413Z" />`,
    tags: ["check circle"],
    categories: ["general"],
  },
]

export function getCodeSnippet(name: string, framework: Framework, mode: IconMode = 'regular'): string {
  const pascal = name
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  switch (framework) {
    case 'react':
      return `import { ${pascal}Icon } from '@nava-icons/react'

<${pascal}Icon size={24} color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''} />`
    case 'vue':
      return `<script setup>
import { ${pascal}Icon } from '@nava-icons/vue'
</script>

<${pascal}Icon :size="24" color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''} />`
    case 'angular':
      return `// In your module:
import { ${pascal}IconComponent } from '@nava-icons/angular'

// In your template:
<icon-${name} [size]="24" color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''}></icon-${name}>`
    case 'web-components':
      return `<script type="module" src="@nava-icons/web-components"></script>

<icon-${name} size="24" color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''}></icon-${name}>`
  }
}
