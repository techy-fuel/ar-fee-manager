import * as React from 'react';

/** Text field with label, icons, hint and error states. */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'style'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  /** Error message — turns the field red and overrides hint. */
  error?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** @default true */
  fullWidth?: boolean;
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
