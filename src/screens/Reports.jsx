import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Select } from '../components/Select.jsx';
import { ProgressBar } from '../components/ProgressBar.jsx';
import { Icon } from '../components/Icon.jsx';
import { ExpectedVsReceived } from '../charts/ExpectedVsReceived.jsx';
import { YearlyRevenue } from '../charts/YearlyRevenue.jsx';
import { monthly, yearly } from '../data/mockData.js';

const TOP_MONTHS    = [['September', 97], ['August', 96], ['November', 95]];
const LOWEST_MONTHS = [['July', 82], ['June', 88], ['March', 86]];

const MonthRow = ({ m, v, variant }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
    <span style={{ width: 84, fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>{m}</span>
    <div style={{ flex: 1 }}><ProgressBar value={v} variant={variant} size="sm" /></div>
    <span style={{ width: 40, textAlign: 'right', fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{v}%</span>
  </div>
);

export function Reports({ isMobile }) {
  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          <Button variant="secondary" iconLeft={<Icon name="fileText" size={15} />} size="sm">PDF</Button>
          <Button variant="secondary" iconLeft={<Icon name="spreadsheet" size={15} />} size="sm">Excel</Button>
        </div>
        <Card title="Yearly Revenue" subtitle="Rs in millions" style={{ marginBottom: 14 }}>
          <YearlyRevenue data={yearly} height={160} />
        </Card>
        <Card title="Top Months" padding="md" style={{ marginBottom: 14 }}>
          {TOP_MONTHS.map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="success" />)}
        </Card>
        <Card title="Lowest Months" padding="md" style={{ marginBottom: 14 }}>
          {LOWEST_MONTHS.map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="warning" />)}
        </Card>
        <Card title="Collection Analytics" subtitle="Expected vs received · 2025">
          <ExpectedVsReceived data={monthly} height={200} />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
        <Select fullWidth={false} options={['Monthly Report', 'Yearly Report']} style={{ width: 180 }} />
        <Select fullWidth={false} options={['2025', '2024', '2023']} style={{ width: 120 }} />
        <Button variant="secondary" iconLeft={<Icon name="fileText" size={16} />} style={{ marginLeft: 'auto' }}>Export PDF</Button>
        <Button variant="secondary" iconLeft={<Icon name="spreadsheet" size={16} />}>Export Excel</Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <Card title="Yearly Revenue" subtitle="Total fee revenue (Rs, millions)">
          <YearlyRevenue data={yearly} />
        </Card>
        <div style={{ display: 'grid', gap: 16 }}>
          <Card title="Top Performing Months" padding="md">
            {TOP_MONTHS.map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="success" />)}
          </Card>
          <Card title="Lowest Collection Months" padding="md">
            {LOWEST_MONTHS.map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="warning" />)}
          </Card>
        </div>
      </div>
      <Card title="Collection Analytics" subtitle="Expected vs received — full year">
        <ExpectedVsReceived data={monthly} height={260} />
      </Card>
    </div>
  );
}
