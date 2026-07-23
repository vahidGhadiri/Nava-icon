export type IconMode = "regular" | "filled";

export interface IconEntry {
  name: string;
  regular: string | null;
  filled: string | null;
}

export interface SvgData {
  viewBox: string;
  inner: string;
  strokeBased: boolean;
}

export interface ParsedIcon {
  name: string;
  regular?: SvgData;
  filled?: SvgData;
}

export type ComponentGenerator = (icon: ParsedIcon) => string;

export interface FrameworkConfig {
  name: string;
  iconDir: string;
  fileExtension: string;
  indexPath: string;
  indexContent: (icons: ParsedIcon[]) => string;
  componentGenerator: ComponentGenerator;
  typePath?: string;
}
