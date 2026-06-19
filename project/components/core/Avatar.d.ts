import * as React from 'react';

/** Initials (or image) avatar with deterministic brand-tinted color. */
export interface AvatarProps {
  /** Full name — initials & color are derived from this. */
  name?: string;
  /** Optional image URL; falls back to initials. */
  src?: string | null;
  /** @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Rounded-square instead of circle. @default false */
  square?: boolean;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
