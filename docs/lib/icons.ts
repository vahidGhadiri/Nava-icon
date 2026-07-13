export type Framework = 'react' | 'vue' | 'angular' | 'web-components'

export interface Icon {
  name: string
  svg: string
  tags: string[]
  categories: string[]
}

export const categories: string[] = []

export const icons: Icon[] = []

export function getCodeSnippet(_name: string, _framework: Framework): string {
  return '// No icons generated yet. Run the icon generation pipeline first.'
}
