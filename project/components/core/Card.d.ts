import * as React from 'react';

/** Surface container with optional header, body and footer. The base building block of every panel. */
export interface CardProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Header-right slot — buttons, menus, filters. */
  actions?: React.ReactNode;
  /** Footer slot, sits on a sunken bar. */
  footer?: React.ReactNode;
  /** Body padding. @default "md" */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Adds hover lift + pointer (for clickable cards). @default false */
  interactive?: boolean;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
