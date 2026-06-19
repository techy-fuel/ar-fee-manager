import * as React from 'react';

/**
 * Primary action button for Al Rehman Fee Manager.
 *
 * @startingPoint section="Core" subtitle="Buttons in every variant & size" viewport="700x220"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger' | 'whatsapp';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node rendered before the label (e.g. a Lucide <svg>). */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  /** Show spinner and block interaction. @default false */
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
