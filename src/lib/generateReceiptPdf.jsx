import { pdf, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const S = StyleSheet.create({
  page:       { fontFamily: 'Helvetica', fontSize: 10, color: '#1e293b', backgroundColor: '#fff' },
  header:     { backgroundColor: '#0b1f38', padding: '20 28', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerL:    { color: '#fff', fontSize: 16, fontFamily: 'Helvetica-Bold' },
  headerR:    { textAlign: 'right' },
  headerRT:   { color: '#fff', fontSize: 11, fontFamily: 'Helvetica-Bold' },
  headerRN:   { color: 'rgba(255,255,255,0.75)', fontSize: 9, marginTop: 2 },
  body:       { padding: '22 28' },
  grid:       { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  field:      { width: '50%', marginBottom: 14 },
  label:      { fontSize: 8, color: '#64748b', fontFamily: 'Helvetica-Bold', marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.5 },
  value:      { fontSize: 10.5, color: '#0f172a', fontFamily: 'Helvetica-Bold' },
  divider:    { borderTop: '1pt dashed #cbd5e1', marginBottom: 14 },
  feeRow:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, color: '#475569' },
  totalBox:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0fdf4', padding: '12 14', borderRadius: 6, border: '1pt solid #bbf7d0', marginTop: 6 },
  totalL:     { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#15803d' },
  totalR:     { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#15803d' },
  footer:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  badge:      { backgroundColor: '#dcfce7', color: '#15803d', fontSize: 8, fontFamily: 'Helvetica-Bold', padding: '3 8', borderRadius: 4 },
  footerNote: { fontSize: 7.5, color: '#94a3b8' },
});

const Field = ({ label, value }) => (
  <View style={S.field}>
    <Text style={S.label}>{label}</Text>
    <Text style={S.value}>{value}</Text>
  </View>
);

function ReceiptDoc({ data }) {
  const {
    receiptNo = 'ARA-2025-00001',
    studentName = 'Ahmed Raza',
    className = 'Class 9-A',
    date = '12 Jul 2025',
    feeMonth = 'July 2025',
    transactionId = 'TXN-9F2A7C',
    method = 'Bank Transfer',
    amount = 3500,
    academyName = 'Al Rehman Academy',
  } = data;

  return (
    <Document>
      <Page size={[420, 340]} style={S.page}>
        <View style={S.header}>
          <Text style={S.headerL}>{academyName}</Text>
          <View style={S.headerR}>
            <Text style={S.headerRT}>FEE RECEIPT</Text>
            <Text style={S.headerRN}>{receiptNo}</Text>
          </View>
        </View>

        <View style={S.body}>
          <View style={S.grid}>
            <Field label="Student Name"  value={studentName} />
            <Field label="Class"         value={className} />
            <Field label="Receipt Date"  value={date} />
            <Field label="Fee Month"     value={feeMonth} />
            <Field label="Transaction ID" value={transactionId} />
            <Field label="Payment Method" value={method} />
          </View>

          <View style={S.divider} />

          <View style={S.feeRow}>
            <Text>Monthly Tuition Fee</Text>
            <Text>₨ {Number(amount).toLocaleString('en-PK', { minimumFractionDigits: 2 })}</Text>
          </View>

          <View style={S.totalBox}>
            <Text style={S.totalL}>Amount Paid</Text>
            <Text style={S.totalR}>₨ {Number(amount).toLocaleString('en-PK', { minimumFractionDigits: 2 })}</Text>
          </View>

          <View style={S.footer}>
            <Text style={S.badge}>✓ Paid · Verified</Text>
            <Text style={S.footerNote}>Computer-generated · {academyName}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function downloadReceiptPdf(data) {
  const blob = await pdf(<ReceiptDoc data={data} />).toBlob();
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `receipt-${data.receiptNo || 'fee'}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}
