import * as React from 'react';

/** Horizontal progress / collection meter. */
export interface ProgressBarProps {
  value?: number;
  /** @default 100 */
  max?: number;
  /** @default "brand" */
  variant?: 'brand' | 'success' | 'warning' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Show the percentage on the right. @default false */
  showLabel?: boolean;
  /** Caption on the left of the meter. */
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
