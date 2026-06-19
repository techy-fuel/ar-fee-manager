/* Al Rehman Fee Manager UI Kit — screens. */
(function () {
  const NS = window.AlRehmanFeeManagerDesignSystem_ad9d9e;
  const { Card, Button, Badge, Avatar, Input, Select, StatCard, ProgressBar } = NS;
  const { Icon, WhatsAppIcon, DATA, fmtRs } = window;
  const { ExpectedVsReceived, CollectionTrend, DonutGauge, YearlyRevenue } = window;
  const feeBadge = (s) => s === 'Paid' ? <Badge variant="success" dot>Paid</Badge> : s === 'Pending' ? <Badge variant="warning" dot>Pending</Badge> : <Badge variant="danger" dot>Overdue</Badge>;

  const PageWrap = ({ children }) => <div style={{ padding: 28, maxWidth: 1280, margin: '0 auto' }}>{children}</div>;
  const SectionTitle = ({ children, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
      <h2 style={{ fontSize: 'var(--fs-h4)', fontWeight: 700, color: 'var(--text-strong)', margin: 0 }}>{children}</h2>
      {right && <div style={{ marginLeft: 'auto' }}>{right}</div>}
    </div>
  );

  /* ---------------- DASHBOARD ---------------- */
  function Dashboard() {
    const s = DATA.stats;
    return (
      <PageWrap>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, marginBottom: 22 }}>
          <StatCard label="Total Students" value={s.totalStudents.toLocaleString()} tone="brand" icon={<Icon name="users" size={22} />} delta="4.6%" deltaDirection="up" />
          <StatCard label="Expected Fee" value={fmtRs(s.expected)} tone="navy" icon={<Icon name="calendar" size={22} />} footnote="July 2025" />
          <StatCard label="Collected Fee" value={fmtRs(s.collected)} tone="success" icon={<Icon name="wallet" size={22} />} delta="8.2%" deltaDirection="up" />
          <StatCard label="Pending Fee" value={fmtRs(s.pending)} tone="warning" icon={<Icon name="clock" size={22} />} delta="3.1%" deltaDirection="down" />
          <StatCard label="Collection %" value={s.rate + '%'} tone="brand" icon={<Icon name="trending" size={22} />} progress={s.rate} progressVariant="success" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16, marginBottom: 16 }}>
          <Card title="Expected vs Received" subtitle="Monthly fee collection · 2025" actions={<Legend />}>
            <ExpectedVsReceived data={DATA.monthly} />
          </Card>
          <Card title="Collection Rate" subtitle="This month">
            <div style={{ display: 'grid', placeItems: 'center', padding: '6px 0 14px' }}>
              <DonutGauge value={s.rate} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
              <KV label="Collected" value={fmtRs(s.collected)} color="var(--green-600)" />
              <KV label="Pending" value={fmtRs(s.pending)} color="var(--amber-600)" />
            </div>
          </Card>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card title="Collection Trend" subtitle="Received fees over the year">
            <CollectionTrend data={DATA.monthly} />
          </Card>
          <Card title="Recent Payments" subtitle="Latest verified transactions" actions={<Button size="sm" variant="ghost" iconRight={<Icon name="chevronRight" size={15} />}>View all</Button>} padding="none">
            <div>
              {DATA.transactions.slice(0, 5).map((t, i) => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                  <Avatar name={t.student} size="sm" />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{t.student}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.cls} · {t.method}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(t.amount)}</div>
                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>{t.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </PageWrap>
    );
  }
  const Legend = () => (
    <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
      <Dot c="#a9d2ee" t="Expected" /><Dot c="#248dce" t="Received" />
    </div>
  );
  const Dot = ({ c, t }) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: c }} />{t}</span>;
  const KV = ({ label, value, color }) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 'var(--fs-h4)', fontWeight: 800, color: color || 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );

  /* ---------------- STUDENTS ---------------- */
  function Students() {
    const [q, setQ] = React.useState('');
    const rows = DATA.students.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.cls.toLowerCase().includes(q.toLowerCase()));
    return (
      <PageWrap>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18, alignItems: 'center' }}>
          <div style={{ width: 320 }}>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students or class…" iconLeft={<Icon name="search" size={16} />} />
          </div>
          <div style={{ width: 160 }}><Select placeholder="All Classes" options={['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']} /></div>
          <Button variant="primary" iconLeft={<Icon name="plus" size={16} />} style={{ marginLeft: 'auto' }}>Add Student</Button>
        </div>
        <Card padding="none">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-sm)' }}>
            <thead>
              <tr style={{ background: 'var(--slate-50)', borderBottom: '1px solid var(--border-subtle)' }}>
                {['Student', 'Class', 'Monthly Fee', 'Status', 'Fee Status', 'Parent WhatsApp', ''].map((h, i) => (
                  <th key={i} style={{ textAlign: i === 2 ? 'right' : 'left', padding: '12px 18px', fontSize: 'var(--fs-xs)', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((s, i) => (
                <tr key={s.id} style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--slate-50)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '11px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={s.name} size="sm" />
                      <div><div style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{s.name}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>{s.id}</div></div>
                    </div>
                  </td>
                  <td style={{ padding: '11px 18px', color: 'var(--text-secondary)' }}>{s.cls}</td>
                  <td style={{ padding: '11px 18px', textAlign: 'right', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}</td>
                  <td style={{ padding: '11px 18px' }}>{s.status === 'Active' ? <Badge variant="success" dot>Active</Badge> : <Badge variant="neutral" dot>Inactive</Badge>}</td>
                  <td style={{ padding: '11px 18px' }}>{feeBadge(s.feeStatus)}</td>
                  <td style={{ padding: '11px 18px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)' }}>{s.wa}</td>
                  <td style={{ padding: '11px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 4 }}>
                      <IconBtn name="eye" /><IconBtn name="edit" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
            Showing {rows.length} of 1,284 students
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}><Button size="sm" variant="secondary">Previous</Button><Button size="sm" variant="secondary">Next</Button></div>
          </div>
        </Card>
      </PageWrap>
    );
  }
  const IconBtn = ({ name }) => <button style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', border: '1px solid var(--border-subtle)', background: '#fff', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)' }}><Icon name={name} size={15} /></button>;

  /* ---------------- FEE COLLECTION ---------------- */
  function FeeCollection() {
    const [drag, setDrag] = React.useState(false);
    const [uploaded, setUploaded] = React.useState(false);
    return (
      <PageWrap>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card title="Upload Payment Screenshot" subtitle="We auto-detect transaction details with OCR">
            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); setUploaded(true); }}
              onClick={() => setUploaded(true)}
              style={{
                border: `2px dashed ${drag ? 'var(--blue-500)' : 'var(--border-default)'}`,
                background: drag ? 'var(--blue-50)' : 'var(--slate-50)',
                borderRadius: 'var(--radius-lg)', padding: '34px 20px', textAlign: 'center',
                cursor: 'pointer', transition: 'all var(--dur-base)',
              }}>
              <div style={{ width: 52, height: 52, margin: '0 auto 12px', borderRadius: '50%', background: 'var(--blue-100)', display: 'grid', placeItems: 'center', color: 'var(--blue-600)' }}>
                <Icon name={uploaded ? 'check' : 'upload'} size={24} />
              </div>
              {uploaded ? (
                <>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>jazzcash_receipt.png</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--green-600)', marginTop: 4, fontWeight: 600 }}>Uploaded · OCR scan complete</div>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: 700, color: 'var(--text-strong)' }}>Drag &amp; drop a screenshot here</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: 4 }}>or click to browse · PNG, JPG up to 10MB</div>
                </>
              )}
            </div>
            {uploaded && (
              <div style={{ marginTop: 14, padding: 14, borderRadius: 'var(--radius-md)', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', display: 'flex', gap: 10 }}>
                <span style={{ color: 'var(--blue-600)', marginTop: 1 }}><Icon name="sparkles" size={18} /></span>
                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--blue-800)' }}>
                  <b>OCR detected:</b> Transaction TXN-3B81D2 · Rs 4,000 · 11 Jul 2025 · JazzCash. Review and confirm below.
                </div>
              </div>
            )}
          </Card>

          <Card title="Record Payment" subtitle="Confirm the detected details"
            footer={<div style={{ display: 'flex', gap: 10 }}><Button variant="primary" fullWidth iconLeft={<Icon name="checkSmall" size={16} />}>Confirm Payment</Button><Button variant="secondary">Cancel</Button></div>}>
            <div style={{ display: 'grid', gap: 14 }}>
              <Select label="Student" placeholder="Select student" options={DATA.students.map((s) => s.name)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Input label="Transaction ID" defaultValue={uploaded ? 'TXN-3B81D2' : ''} placeholder="TXN-…" />
                <Input label="Amount Received" defaultValue={uploaded ? '4000' : ''} iconLeft={<span style={{ fontWeight: 700 }}>₨</span>} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Select label="Fee Month" options={['July 2025', 'August 2025', 'September 2025']} />
                <Input label="Payment Date" defaultValue={uploaded ? '11 Jul 2025' : ''} iconLeft={<Icon name="calendar" size={15} />} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>Payment Status</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Badge variant="success" dot>Verified</Badge><Badge variant="warning" dot>Pending</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </PageWrap>
    );
  }

  /* ---------------- REPORTS ---------------- */
  function Reports() {
    return (
      <PageWrap>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
          <Select fullWidth={false} options={['Monthly Report', 'Yearly Report']} style={{ width: 180 }} />
          <Select fullWidth={false} options={['2025', '2024', '2023']} style={{ width: 120 }} />
          <Button variant="secondary" iconLeft={<Icon name="fileText" size={16} />} style={{ marginLeft: 'auto' }}>Export PDF</Button>
          <Button variant="secondary" iconLeft={<Icon name="spreadsheet" size={16} />}>Export Excel</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <Card title="Yearly Revenue" subtitle="Total fee revenue (Rs, millions)"><YearlyRevenue data={DATA.yearly} /></Card>
          <div style={{ display: 'grid', gap: 16 }}>
            <Card title="Top Performing Months" padding="md">
              {[['September', 97], ['August', 96], ['November', 95]].map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="success" />)}
            </Card>
            <Card title="Lowest Collection Months" padding="md">
              {[['July', 82], ['June', 88], ['March', 86]].map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="warning" />)}
            </Card>
          </div>
        </div>
        <Card title="Collection Analytics" subtitle="Expected vs received — full year"><ExpectedVsReceived data={DATA.monthly} height={260} /></Card>
      </PageWrap>
    );
  }
  const MonthRow = ({ m, v, variant }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
      <span style={{ width: 84, fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-secondary)' }}>{m}</span>
      <div style={{ flex: 1 }}><ProgressBar value={v} variant={variant} size="sm" /></div>
      <span style={{ width: 40, textAlign: 'right', fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{v}%</span>
    </div>
  );

  /* ---------------- REMINDERS ---------------- */
  function Reminders() {
    const [sent, setSent] = React.useState({});
    return (
      <PageWrap>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
          <Card title="Pending Fee Students" subtitle={`${DATA.pending.length} parents to remind`}
            actions={<Button variant="whatsapp" size="sm" iconLeft={<WhatsAppIcon size={15} color="#fff" />} onClick={() => setSent(Object.fromEntries(DATA.pending.map((p) => [p.id, true])))}>Send to All</Button>} padding="none">
            {DATA.pending.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                <Avatar name={s.name} size="sm" />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{s.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.cls} · {s.wa}</div>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, color: 'var(--amber-600)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}</span>
                  {sent[s.id]
                    ? <Badge variant="success" dot>Sent</Badge>
                    : <Button variant="whatsapp" size="sm" iconLeft={<WhatsAppIcon size={14} color="#fff" />} onClick={() => setSent((p) => ({ ...p, [s.id]: true }))}>Remind</Button>}
                </div>
              </div>
            ))}
          </Card>
          <Card title="Reminder History" subtitle="Recent activity" padding="none">
            {DATA.reminders.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--green-50)', display: 'grid', placeItems: 'center', color: 'var(--whatsapp-dark)' }}><WhatsAppIcon size={17} /></span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, color: 'var(--text-strong)' }}>{r.name}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{fmtRs(r.amount)} · {r.sent}</div>
                </div>
                <span style={{ marginLeft: 'auto' }}>
                  {r.status === 'Failed' ? <Badge variant="danger">Failed</Badge> : <Badge variant="neutral">{r.status}</Badge>}
                </span>
              </div>
            ))}
            <div style={{ padding: 16, borderTop: '1px solid var(--border-subtle)', background: 'var(--slate-50)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
              <Icon name="clock" size={14} /> Automated reminders run every Monday at 9:00 AM
            </div>
          </Card>
        </div>
      </PageWrap>
    );
  }

  /* ---------------- RECEIPT ---------------- */
  function Receipt() {
    return (
      <PageWrap>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'start' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', overflow: 'hidden', maxWidth: 560 }}>
            <div style={{ background: 'var(--navy-900)', padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src="../../assets/logo-horizontal-white.svg" alt="Al Rehman Academy" style={{ height: 46 }} />
              <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.85)' }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>FEE RECEIPT</div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>ARA-2025-00842</div>
              </div>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 22 }}>
                <RField label="Student Name" value="Ahmed Raza" />
                <RField label="Class" value="Class 9-A" />
                <RField label="Receipt Date" value="12 Jul 2025" />
                <RField label="Fee Month" value="July 2025" />
                <RField label="Transaction ID" value="TXN-9F2A7C" mono />
                <RField label="Payment Method" value="Bank Transfer" />
              </div>
              <div style={{ borderTop: '1px dashed var(--border-default)', paddingTop: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}><span>Monthly Tuition Fee</span><span style={{ fontFamily: 'var(--font-mono)' }}>₨ 3,500.00</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', marginTop: 8, background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)' }}>
                  <span style={{ fontWeight: 700, color: 'var(--green-700)' }}>Amount Paid</span>
                  <span style={{ fontWeight: 800, fontSize: 22, color: 'var(--green-700)', fontFamily: 'var(--font-mono)' }}>₨ 3,500.00</span>
                </div>
              </div>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Badge variant="success" dot>Paid · Verified</Badge>
                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-faint)' }}>Computer-generated receipt · Al Rehman Academy</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 10, width: 200 }}>
            <Button variant="primary" iconLeft={<Icon name="download" size={16} />}>Download PDF</Button>
            <Button variant="secondary" iconLeft={<Icon name="print" size={16} />}>Print</Button>
            <Button variant="whatsapp" iconLeft={<WhatsAppIcon size={15} color="#fff" />}>Send to Parent</Button>
          </div>
        </div>
      </PageWrap>
    );
  }
  const RField = ({ label, value, mono }) => (
    <div>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-strong)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</div>
    </div>
  );

  /* ---------------- SETTINGS (light) ---------------- */
  function Settings() {
    return (
      <PageWrap>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Card title="Academy Information">
            <div style={{ display: 'grid', gap: 14 }}>
              <Input label="Academy Name" defaultValue="Al Rehman Academy" />
              <Input label="Contact Email" defaultValue="admin@alrehman.edu.pk" />
              <Input label="Phone" defaultValue="+92 42 35551234" iconLeft={<Icon name="phone" size={15} />} />
            </div>
          </Card>
          <Card title="Academy Logo">
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 96, height: 96, borderRadius: 'var(--radius-lg)', background: 'var(--slate-50)', border: '1px solid var(--border-subtle)', display: 'grid', placeItems: 'center', padding: 12 }}>
                <img src="../../assets/logo-mark.svg" alt="" style={{ maxHeight: '100%' }} />
              </div>
              <Button variant="secondary" iconLeft={<Icon name="upload" size={16} />}>Upload new logo</Button>
            </div>
          </Card>
          <Card title="WhatsApp Integration" subtitle="Reminder delivery">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, background: 'var(--green-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--green-100)' }}>
              <WhatsAppIcon size={22} color="var(--whatsapp-dark)" />
              <div style={{ fontSize: 'var(--fs-sm)' }}><b style={{ color: 'var(--green-700)' }}>Connected</b><div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>Business API · +92 300 1112233</div></div>
              <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Active</Badge>
            </div>
          </Card>
          <Card title="Payment Methods">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {['Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cash'].map((m) => <Badge key={m} variant="brand">{m}</Badge>)}
            </div>
          </Card>
        </div>
      </PageWrap>
    );
  }

  window.SCREENS = { dashboard: Dashboard, students: Students, fees: FeeCollection, reports: Reports, reminders: Reminders, receipts: Receipt, settings: Settings };
})();
