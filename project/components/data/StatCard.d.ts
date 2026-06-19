import * as React from 'react';

/**
 * Dashboard KPI card — the top-of-dashboard statistic tile.
 *
 * @startingPoint section="Data" subtitle="Dashboard KPI / stat tiles" viewport="700x190"
 */
export interface StatCardProps {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Lucide icon node. */
  icon?: React.ReactNode;
  /** Icon tint + default progress color. @default "brand" */
  tone?: 'brand' | 'success' | 'warning' | 'danger' | 'navy';
  /** Trend value, e.g. "12.4%". Omit to hide the delta pill. */
  delta?: React.ReactNode;
  /** @default "up" */
  deltaDirection?: 'up' | 'down';
  /** @default "vs last month" */
  deltaLabel?: React.ReactNode;
  /** Caption shown instead of / next to the delta. */
  footnote?: React.ReactNode;
  /** 0–100 — renders a thin meter at the bottom. */
  progress?: number | null;
  progressVariant?: 'brand' | 'success' | 'warning' | 'danger';
  style?: React.CSSProperties;
}

export function StatCard(props: StatCardProps): JSX.Element;
