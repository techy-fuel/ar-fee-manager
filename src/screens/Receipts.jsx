import { useState } from 'react';
import { Card } from '../components/Card.jsx';
import { Button } from '../components/Button.jsx';
import { Badge } from '../components/Badge.jsx';
import { Icon, WhatsAppIcon } from '../components/Icon.jsx';

const RField = ({ label, value, mono }) => (
  <div>
    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-strong)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</div>
  </div>
);

function ReceiptCard({ compact = false }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)',
      overflow: 'hidden', maxWidth: compact ? '100%' : 560,
    }}>
      <div style={{ background: 'var(--navy-900)', padding: compact ? '18px 20px' : '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="/assets/logo-horizontal-white.svg" alt="Al Rehman Academy" style={{ height: compact ? 36 : 46 }} />
        <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.85)' }}>
          <div style={{ fontWeight: 800, fontSize: compact ? 13 : 15, color: '#fff' }}>FEE RECEIPT</div>
          <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>ARA-2025-00842</div>
        </div>
      </div>
      <div style={{ padding: compact ? 18 : 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: compact ? 14 : 18, marginBottom: compact ? 16 : 22 }}>
          <RField label="Student Name" value="Ahmed Raza" />
          <RField label="Class" value="Class 9-A" />
          <RField label="Receipt Date" value="12 Jul 2025" />
          <RField label="Fee Month" value="July 2025" />
          <RField label="Transaction ID" value="TXN-9F2A7C" mono />
          <RField label="Payment Method" value="Bank Transfer" />
        </div>
        <div style={{ borderTop: '1px dashed var(--border-default)', paddingTop: compact ? 14 : 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            <span>Monthly Tuition Fee</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>₨ 3,500.00</span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: compact ? '10px 14px' : '14px 16px', marginTop: 8,
            background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)',
          }}>
            <span style={{ fontWeight: 700, color: 'var(--green-700)' }}>Amount Paid</span>
            <span style={{ fontWeight: 800, fontSize: compact ? 18 : 22, color: 'var(--green-700)', fontFamily: 'var(--font-mono)' }}>₨ 3,500.00</span>
          </div>
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Badge variant="success" dot>Paid · Verified</Badge>
          <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>Computer-generated · Al Rehman Academy</span>
        </div>
      </div>
    </div>
  );
}

const RECEIPT_DATA = {
  receiptNo: 'ARA-2025-00842',
  studentName: 'Ahmed Raza',
  className: 'Class 9-A',
  date: '12 Jul 2025',
  feeMonth: 'July 2025',
  transactionId: 'TXN-9F2A7C',
  method: 'Bank Transfer',
  amount: 3500,
  academyName: 'Al Rehman Academy',
};

export function Receipts({ isMobile }) {
  const [downloading, setDownloading] = useState(false);

  async function handleDownload() {
    setDownloading(true);
    const { downloadReceiptPdf } = await import('../lib/generateReceiptPdf.jsx');
    await downloadReceiptPdf(RECEIPT_DATA);
    setDownloading(false);
  }

  function handlePrint() {
    window.print();
  }

  if (isMobile) {
    return (
      <div style={{ padding: '16px 16px 80px' }}>
        <ReceiptCard compact />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
          <Button variant="primary" fullWidth loading={downloading} iconLeft={<Icon name="download" size={16} />} onClick={handleDownload}>Download PDF</Button>
          <Button variant="secondary" fullWidth iconLeft={<Icon name="print" size={16} />} onClick={handlePrint}>Print</Button>
          <Button variant="whatsapp" fullWidth iconLeft={<WhatsAppIcon size={15} color="#fff" />}>Send to Parent</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
        <ReceiptCard />
        <div style={{ display: 'grid', gap: 10, width: 200 }}>
          <Button variant="primary" loading={downloading} iconLeft={<Icon name="download" size={16} />} onClick={handleDownload}>Download PDF</Button>
          <Button variant="secondary" iconLeft={<Icon name="print" size={16} />} onClick={handlePrint}>Print</Button>
          <Button variant="whatsapp" iconLeft={<WhatsAppIcon size={15} color="#fff" />}>Send to Parent</Button>
        </div>
      </div>
    </div>
  );
}
