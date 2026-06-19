import * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

/** Styled native select with label / hint / error. */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'style'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  /** Array of strings or {value,label} objects. */
  options?: (string | SelectOption)[];
  placeholder?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** @default true */
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
