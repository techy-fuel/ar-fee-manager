import * as React from 'react';

/**
 * Compact status / category label.
 *
 * @startingPoint section="Core" subtitle="Status badges & pills" viewport="700x140"
 */
export interface BadgeProps {
  children?: React.ReactNode;
  /** Semantic color. @default "neutral" */
  variant?: 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand';
  /** @default "md" */
  size?: 'sm' | 'md';
  /** Show a leading status dot. @default false */
  dot?: boolean;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
