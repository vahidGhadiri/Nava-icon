export type Framework = 'react' | 'vue' | 'angular' | 'web-components'
export type IconMode = 'regular' | 'filled'

export interface Icon {
  name: string
  regularSvg: string
  filledSvg: string
  tags: string[]
  categories: string[]
}

export function getCodeSnippet(name: string, framework: Framework, mode: IconMode = 'regular'): string {
  const pascal = name
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  switch (framework) {
    case 'react':
      return `import { ${pascal}Icon } from '@nava-icons/react'\n\n<${pascal}Icon size={24} color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''} />`
    case 'vue':
      return `<script setup>\nimport { ${pascal}Icon } from '@nava-icons/vue'\n</script>\n\n<${pascal}Icon :size="24" color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''} />`
    case 'angular':
      return `// In your module:\nimport { ${pascal}IconComponent } from '@nava-icons/angular'\n\n// In your template:\n<icon-${name} [size]="24" color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''}></icon-${name}>`
    case 'web-components':
      return `<script type="module" src="@nava-icons/web-components"></script>\n\n<icon-${name} size="24" color="currentColor"${mode === 'filled' ? ' mode="filled"' : ''}></icon-${name}>`
  }
}
