export type Framework = 'react' | 'vue' | 'angular' | 'web-components'
export type IconMode = 'regular' | 'filled'

export interface Icon {
  name: string
  regularSvg: string
  filledSvg: string
  tags: string[]
  categories: string[]
}

export interface IconMeta {
  name: string
  tags: string[]
  categories: string[]
}

export function getCodeSnippet(name: string, framework: Framework, mode: IconMode = 'regular', color: string = 'currentColor'): string {
  const pascal = name
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  const colorAttr = color === 'currentColor' ? 'currentColor' : `"${color}"`
  const modeAttr = mode === 'filled' ? ' mode="filled"' : ''

  switch (framework) {
    case 'react':
      return `import { ${pascal}Icon } from '@nava-icons/react'\n\n<${pascal}Icon size={24} color={${colorAttr}}${modeAttr} />`
    case 'vue':
      return `<script setup>\nimport { ${pascal}Icon } from '@nava-icons/vue'\n</script>\n\n<${pascal}Icon :size="24" color="${color}"${modeAttr} />`
    case 'angular':
      return `// In your module:\nimport { ${pascal}IconComponent } from '@nava-icons/angular'\n\n// In your template:\n<icon-${name} [size]="24" color="${color}"${modeAttr}></icon-${name}>`
    case 'web-components':
      return `<script type="module" src="@nava-icons/web-components"></script>\n\n<icon-${name} size="24" color="${color}"${modeAttr}></icon-${name}>`
  }
}
