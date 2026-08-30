import * as React from "react";
/**
 * Renders one glyph from the Lucide icon set — the system's only icon source.
 * @dsComponent
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, kebab-case (e.g. "book-open", "chevron-right"). */
  name: string;
  /** Pixel size of the square glyph. Default 18. */
  size?: number;
  /** Stroke weight. The brand uses 1.75 for UI, 2 for emphasis. Default 1.75. */
  strokeWidth?: number;
  /** Stroke colour. Default "currentColor". */
  color?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
