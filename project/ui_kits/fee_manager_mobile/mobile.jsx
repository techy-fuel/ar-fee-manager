/* Al Rehman Fee Manager — Mobile screens (composed into the iOS frame). */
(function () {
  const NS = window.AlRehmanFeeManagerDesignSystem_ad9d9e;
  const { Badge, Avatar, Button, ProgressBar } = NS;
  const { Icon, WhatsAppIcon, DATA, fmtRs, DonutGauge, CollectionTrend } = window;

  const STATUS_TOP = 56; // clear the status bar / dynamic island (iOS default; overridable per-platform)
  const feeBadge = (s) => s === 'Paid' ? <Badge variant="success" dot>Paid</Badge> : s === 'Pending' ? <Badge variant="warning" dot>Pending</Badge> : <Badge variant="danger" dot>Overdue</Badge>;

  /* ---- shared chrome ---- */
  function AppHeader({ title, subtitle, accent, onBack }) {
    return (
      <div style={{
        flex: 'none', background: 'var(--navy-900)', color: '#fff',
        padding: `${window.MOBILE_STATUS_TOP ?? STATUS_TOP}px 18px 16px`,
        borderBottomLeftRadius: 22, borderBottomRightRadius: 22,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          {onBack
            ? <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', display: 'grid', placeItems: 'center', color: '#fff', cursor: 'pointer' }}><Icon name="chevronRight" size={18} style={{ transform: 'scaleX(-1)' }} /></button>
            : <img src="../../assets/logo-mark-white.svg" alt="" style={{ height: 30 }} />}
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.01em' }}>{title}</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-on-dark-muted)', fontWeight: 600 }}>{subtitle}</div>
          </div>
          <button style={{ marginLeft: 'auto', width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: 'none', display: 'grid', placeItems: 'center', color: '#fff', position: 'relative' }}>
            <Icon name="bell" size={18} />
            <span style={{ position: 'absolute', top: 9, right: 10, width: 7, height: 7, borderRadius: '50%', background: 'var(--red-500)', border: '1.5px solid var(--navy-900)' }} />
          </button>
        </div>
        {accent}
      </div>
    );
  }

  const Section = ({ title, action, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', margin: '0 4px 9px' }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)', margin: 0 }}>{title}</h2>
        {action && <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--text-link)', fontWeight: 600 }}>{action}</span>}
      </div>
      {children}
    </div>
  );
  const Tile = ({ children, style }) => (
    <div style={{ background: '#fff', border: '1px solid var(--border-subtle)', borderRadius: 16, boxShadow: 'var(--shadow-sm)', padding: 16, ...style }}>{children}</div>
  );
  const Scroll = ({ children }) => <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 18px', background: 'var(--color-bg)' }}>{children}</div>;

  /* ---- DASHBOARD ---- */
  function MDashboard() {
    const s = DATA.stats;
    const mini = [
      { label: 'Students', value: s.totalStudents.toLocaleString(), tone: 'brand', icon: 'users' },
      { label: 'Collected', value: fmtRs(s.collected), tone: 'success', icon: 'wallet' },
      { label: 'Pending', value: fmtRs(s.pending), tone: 'warning', icon: 'clock' },
      { label: 'Expected', value: fmtRs(s.expected), tone: 'navy', icon: 'calendar' },
    ];
    const tones = { brand: ['var(--blue-50)', 'var(--blue-600)'], success: ['var(--green-50)', 'var(--green-600)'], warning: ['var(--amber-50)', 'var(--amber-600)'], navy: ['var(--slate-100)', 'var(--navy-800)'] };
    return (
      <>
        <AppHeader title="Al Rehman" subtitle="Dashboard · July 2025" accent={
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 14 }}>
            <DonutGauge value={s.rate} size={78} stroke={10} color="#4ba0d9" track="rgba(255,255,255,0.14)" label="" />
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-on-dark-muted)', fontWeight: 600 }}>Collection rate</div>
              <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>{s.rate}%</div>
              <div style={{ fontSize: 11.5, color: '#8fd0a8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><Icon name="trending" size={13} /> 8.2% vs last month</div>
            </div>
          </div>
        } />
        <Scroll>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
            {mini.map((m) => (
              <Tile key={m.label} style={{ padding: 14 }}>
                <span style={{ display: 'inline-flex', width: 34, height: 34, borderRadius: 9, background: tones[m.tone][0], color: tones[m.tone][1], alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}><Icon name={m.icon} size={18} /></span>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
              </Tile>
            ))}
          </div>
          <Section title="Collection Trend">
            <Tile><CollectionTrend data={DATA.monthly.slice(5)} height={150} /></Tile>
          </Section>
          <Section title="Recent Payments" action="See all">
            <Tile style={{ padding: 0, overflow: 'hidden' }}>
              {DATA.transactions.slice(0, 4).map((t, i) => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                  <Avatar name={t.student} size="sm" />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{t.student}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{t.method} · {t.date}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontSize: 13.5, fontWeight: 700, color: 'var(--green-600)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(t.amount)}</div>
                </div>
              ))}
            </Tile>
          </Section>
        </Scroll>
      </>
    );
  }

  /* ---- STUDENTS ---- */
  function MStudents() {
    const [q, setQ] = React.useState('');
    const rows = DATA.students.filter((s) => s.name.toLowerCase().includes(q.toLowerCase()) || s.cls.toLowerCase().includes(q.toLowerCase()));
    return (
      <>
        <AppHeader title="Students" subtitle={`${DATA.students.length} shown · 1,284 total`} accent={
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: '0 12px', height: 42 }}>
            <Icon name="search" size={17} color="rgba(255,255,255,0.6)" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students or class…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: '#fff', fontSize: 14, fontFamily: 'var(--font-sans)' }} />
          </div>
        } />
        <Scroll>
          <div style={{ display: 'grid', gap: 10 }}>
            {rows.map((s) => (
              <Tile key={s.id} style={{ padding: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <Avatar name={s.name} size="md" />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</span>
                      {s.status === 'Active' ? <Badge variant="success" size="sm" dot>Active</Badge> : <Badge variant="neutral" size="sm" dot>Inactive</Badge>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.cls} · {s.id}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', fontWeight: 600 }}>Monthly fee</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(s.fee)}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {feeBadge(s.feeStatus)}
                    <button style={{ width: 34, height: 34, borderRadius: 9, border: 'none', background: 'var(--green-50)', color: 'var(--whatsapp-dark)', display: 'grid', placeItems: 'center' }}><WhatsAppIcon size={17} /></button>
                  </div>
                </div>
              </Tile>
            ))}
          </div>
        </Scroll>
      </>
    );
  }

  /* ---- COLLECT (upload + OCR) ---- */
  function MCollect() {
    const [up, setUp] = React.useState(false);
    return (
      <>
        <AppHeader title="Fee Collection" subtitle="Record a payment" />
        <Scroll>
          <div onClick={() => setUp(true)} style={{
            border: `2px dashed ${up ? 'var(--blue-500)' : 'var(--border-default)'}`,
            background: up ? 'var(--blue-50)' : '#fff', borderRadius: 16,
            padding: '30px 18px', textAlign: 'center', marginBottom: 14,
          }}>
            <div style={{ width: 56, height: 56, margin: '0 auto 12px', borderRadius: '50%', background: 'var(--blue-100)', display: 'grid', placeItems: 'center', color: 'var(--blue-600)' }}>
              <Icon name={up ? 'check' : 'scan'} size={26} />
            </div>
            {up ? (
              <>
                <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 14.5 }}>jazzcash_receipt.png</div>
                <div style={{ fontSize: 12, color: 'var(--green-600)', marginTop: 3, fontWeight: 600 }}>Uploaded · OCR scan complete</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 700, color: 'var(--text-strong)', fontSize: 14.5 }}>Tap to upload screenshot</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>Camera or gallery · we auto-detect details</div>
              </>
            )}
          </div>
          {up && (
            <div style={{ display: 'flex', gap: 9, padding: 13, borderRadius: 12, background: 'var(--blue-50)', border: '1px solid var(--blue-100)', marginBottom: 16 }}>
              <span style={{ color: 'var(--blue-600)', marginTop: 1 }}><Icon name="sparkles" size={17} /></span>
              <div style={{ fontSize: 12.5, color: 'var(--blue-800)', lineHeight: 1.4 }}><b>OCR detected:</b> TXN-3B81D2 · Rs 4,000 · 11 Jul 2025 · JazzCash</div>
            </div>
          )}
          <Tile style={{ padding: 16 }}>
            <div style={{ display: 'grid', gap: 12 }}>
              <Field label="Student" value="Usman Khan" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Transaction ID" value={up ? 'TXN-3B81D2' : '—'} mono />
                <Field label="Amount" value={up ? '₨ 4,000' : '—'} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <Field label="Fee Month" value="July 2025" />
                <Field label="Date" value={up ? '11 Jul 2025' : '—'} />
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Button variant="primary" fullWidth size="lg" iconLeft={<Icon name="checkSmall" size={17} />}>Confirm Payment</Button>
            </div>
          </Tile>
        </Scroll>
      </>
    );
  }
  const Field = ({ label, value, mono }) => (
    <div style={{ background: 'var(--slate-50)', border: '1px solid var(--border-subtle)', borderRadius: 10, padding: '9px 12px' }}>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--text-strong)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</div>
    </div>
  );

  /* ---- REMINDERS ---- */
  function MReminders() {
    const [sent, setSent] = React.useState({});
    const allSent = () => setSent(Object.fromEntries(DATA.pending.map((p) => [p.id, true])));
    return (
      <>
        <AppHeader title="Reminders" subtitle={`${DATA.pending.length} parents to remind`} accent={
          <button onClick={allSent} style={{ marginTop: 14, width: '100%', height: 44, borderRadius: 12, border: 'none', background: 'var(--whatsapp)', color: '#fff', fontWeight: 700, fontSize: 14.5, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <WhatsAppIcon size={18} color="#fff" /> Send WhatsApp to All
          </button>
        } />
        <Scroll>
          <Section title="Pending Fees">
            <div style={{ display: 'grid', gap: 10 }}>
              {DATA.pending.map((s) => (
                <Tile key={s.id} style={{ padding: 13, display: 'flex', alignItems: 'center', gap: 11 }}>
                  <Avatar name={s.name} size="md" />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--amber-600)', fontWeight: 600 }}>{fmtRs(s.fee)} pending</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    {sent[s.id]
                      ? <Badge variant="success" dot>Sent</Badge>
                      : <button onClick={() => setSent((p) => ({ ...p, [s.id]: true }))} style={{ height: 36, padding: '0 14px', borderRadius: 10, border: 'none', background: 'var(--whatsapp)', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', gap: 6 }}><WhatsAppIcon size={14} color="#fff" /> Remind</button>}
                  </div>
                </Tile>
              ))}
            </div>
          </Section>
          <Section title="Reminder History">
            <Tile style={{ padding: 0, overflow: 'hidden' }}>
              {DATA.reminders.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '12px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                  <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--green-50)', display: 'grid', placeItems: 'center', color: 'var(--whatsapp-dark)' }}><WhatsAppIcon size={16} /></span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)' }}>{r.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{fmtRs(r.amount)} · {r.sent}</div>
                  </div>
                  <span style={{ marginLeft: 'auto' }}>{r.status === 'Failed' ? <Badge variant="danger" size="sm">Failed</Badge> : <Badge variant="neutral" size="sm">{r.status}</Badge>}</span>
                </div>
              ))}
            </Tile>
          </Section>
        </Scroll>
      </>
    );
  }

  /* ---- REPORTS ---- */
  function MReports({ onBack }) {
    return (
      <>
        <AppHeader title="Reports" subtitle="Analytics & exports" onBack={onBack} accent={
          <div style={{ marginTop: 14, display: 'flex', gap: 9 }}>
            <button style={{ flex: 1, height: 42, borderRadius: 11, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><Icon name="fileText" size={16} /> Export PDF</button>
            <button style={{ flex: 1, height: 42, borderRadius: 11, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-sans)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}><Icon name="spreadsheet" size={16} /> Export Excel</button>
          </div>
        } />
        <Scroll>
          <Section title="Yearly Revenue"><Tile><YearlyRevenue data={DATA.yearly} height={170} /></Tile></Section>
          <Section title="Top Performing Months">
            <Tile>{[['September', 97], ['August', 96], ['November', 95]].map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="success" />)}</Tile>
          </Section>
          <Section title="Lowest Collection Months">
            <Tile>{[['July', 82], ['June', 88], ['March', 86]].map(([m, v]) => <MonthRow key={m} m={m} v={v} variant="warning" />)}</Tile>
          </Section>
          <Section title="Expected vs Received"><Tile><ExpectedVsReceived data={DATA.monthly} height={180} /></Tile></Section>
        </Scroll>
      </>
    );
  }
  const MonthRow = ({ m, v, variant }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '7px 0' }}>
      <span style={{ width: 74, fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{m}</span>
      <div style={{ flex: 1 }}><ProgressBar value={v} variant={variant} size="sm" /></div>
      <span style={{ width: 36, textAlign: 'right', fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{v}%</span>
    </div>
  );

  /* ---- RECEIPT ---- */
  function MReceipt({ onBack }) {
    const RField = ({ label, value, mono }) => (
      <div><div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{label}</div><div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-strong)', fontFamily: mono ? 'var(--font-mono)' : 'inherit' }}>{value}</div></div>
    );
    return (
      <>
        <AppHeader title="Receipt" subtitle="ARA-2025-00842" onBack={onBack} />
        <Scroll>
          <Tile style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ background: 'var(--navy-900)', padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src="../../assets/logo-horizontal-white.svg" alt="Al Rehman Academy" style={{ height: 34 }} />
              <div style={{ textAlign: 'right', color: '#fff' }}><div style={{ fontWeight: 800, fontSize: 12.5 }}>FEE RECEIPT</div><div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.8)' }}>ARA-2025-00842</div></div>
            </div>
            <div style={{ padding: 18 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                <RField label="Student" value="Ahmed Raza" /><RField label="Class" value="Class 9-A" />
                <RField label="Date" value="12 Jul 2025" /><RField label="Fee Month" value="July 2025" />
                <RField label="Transaction" value="TXN-9F2A7C" mono /><RField label="Method" value="Bank Transfer" />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'var(--green-50)', borderRadius: 10, border: '1px solid var(--green-100)' }}>
                <span style={{ fontWeight: 700, color: 'var(--green-700)', fontSize: 13.5 }}>Amount Paid</span>
                <span style={{ fontWeight: 800, fontSize: 19, color: 'var(--green-700)', fontFamily: 'var(--font-mono)' }}>₨ 3,500.00</span>
              </div>
              <div style={{ marginTop: 14 }}><Badge variant="success" dot>Paid · Verified</Badge></div>
            </div>
          </Tile>
          <div style={{ display: 'grid', gap: 9 }}>
            <Button variant="primary" fullWidth size="lg" iconLeft={<Icon name="download" size={17} />}>Download PDF</Button>
            <div style={{ display: 'flex', gap: 9 }}>
              <Button variant="secondary" fullWidth iconLeft={<Icon name="print" size={16} />}>Print</Button>
              <Button variant="whatsapp" fullWidth iconLeft={<WhatsAppIcon size={15} color="#fff" />}>Send</Button>
            </div>
          </div>
        </Scroll>
      </>
    );
  }

  /* ---- NOTIFICATIONS ---- */
  function MNotifications({ onBack }) {
    const tone = { success: ['var(--green-50)', 'var(--green-600)', 'check'], warning: ['var(--amber-50)', 'var(--amber-600)', 'clock'], info: ['var(--blue-50)', 'var(--blue-600)', 'bell'], danger: ['var(--red-50)', 'var(--red-600)', 'alert'] };
    return (
      <>
        <AppHeader title="Notifications" subtitle="Recent activity" onBack={onBack} />
        <Scroll>
          <Tile style={{ padding: 0, overflow: 'hidden' }}>
            {DATA.notifications.map((n, i) => {
              const [bg, fg, ic] = tone[n.type];
              return (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '13px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                  <span style={{ width: 34, height: 34, flex: 'none', borderRadius: '50%', background: bg, color: fg, display: 'grid', placeItems: 'center' }}><Icon name={ic} size={17} /></span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)' }}>{n.title}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--text-secondary)', marginTop: 1, lineHeight: 1.4 }}>{n.body}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 3 }}>{n.time}</div>
                  </div>
                </div>
              );
            })}
          </Tile>
        </Scroll>
      </>
    );
  }

  /* ---- SETTINGS ---- */
  function MSettings({ onBack }) {
    const Row = ({ icon, tone, title, detail }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px' }}>
        <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 9, background: tone[0], color: tone[1], display: 'grid', placeItems: 'center' }}><Icon name={icon} size={17} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{title}</div>
          {detail && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{detail}</div>}
        </div>
        <Icon name="chevronRight" size={16} color="var(--text-faint)" />
      </div>
    );
    const Sep = () => <div style={{ height: 1, background: 'var(--border-subtle)', marginLeft: 60 }} />;
    return (
      <>
        <AppHeader title="Settings" subtitle="Academy configuration" onBack={onBack} />
        <Scroll>
          <Tile style={{ padding: 14, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{ width: 56, height: 56, borderRadius: 13, background: 'var(--slate-50)', border: '1px solid var(--border-subtle)', display: 'grid', placeItems: 'center', padding: 8 }}><img src="../../assets/logo-mark.svg" alt="" style={{ maxHeight: '100%' }} /></div>
            <div><div style={{ fontSize: 15.5, fontWeight: 800, color: 'var(--text-strong)' }}>Al Rehman Academy</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>admin@alrehman.edu.pk</div></div>
          </Tile>
          <Tile style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
            <Row icon="settings" tone={['var(--blue-50)', 'var(--blue-600)']} title="Academy Information" detail="Name, contact, address" />
            <Sep />
            <Row icon="image" tone={['var(--slate-100)', 'var(--navy-800)']} title="Logo" detail="Upload academy logo" />
            <Sep />
            <Row icon="users" tone={['var(--amber-50)', 'var(--amber-600)']} title="User Roles & Permissions" detail="3 staff accounts" />
          </Tile>
          <Tile style={{ padding: 0, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px' }}>
              <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 9, background: 'var(--green-50)', color: 'var(--whatsapp-dark)', display: 'grid', placeItems: 'center' }}><WhatsAppIcon size={18} /></span>
              <div style={{ flex: 1 }}><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>WhatsApp Integration</div><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>+92 300 1112233</div></div>
              <Badge variant="success" dot>Active</Badge>
            </div>
          </Tile>
          <Section title="Payment Methods">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{['Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cash'].map((m) => <Badge key={m} variant="brand">{m}</Badge>)}</div>
          </Section>
        </Scroll>
      </>
    );
  }

  /* ---- PARENT PORTAL ---- */
  function MParent({ onBack }) {
    const history = [
      { month: 'July 2025', amount: 3500, date: '12 Jul 2025' },
      { month: 'June 2025', amount: 3500, date: '09 Jun 2025' },
      { month: 'May 2025', amount: 3500, date: '11 May 2025' },
    ];
    return (
      <>
        <AppHeader title="Parent Portal" subtitle="Ahmed Raza · Class 9-A" onBack={onBack} accent={
          <div style={{ marginTop: 14, display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 13, padding: 13 }}>
              <div style={{ fontSize: 11.5, color: 'var(--text-on-dark-muted)', fontWeight: 600 }}>Pending Dues</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>Rs 0</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', borderRadius: 13, padding: 13 }}>
              <div style={{ fontSize: 11.5, color: 'var(--text-on-dark-muted)', fontWeight: 600 }}>Next Due</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>01 Aug</div>
            </div>
          </div>
        } />
        <Scroll>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: 13, borderRadius: 12, background: 'var(--green-50)', border: '1px solid var(--green-100)', marginBottom: 16 }}>
            <Icon name="check" size={20} color="var(--green-600)" />
            <div style={{ fontSize: 13, color: 'var(--green-700)', fontWeight: 600 }}>All fees are up to date. Thank you!</div>
          </div>
          <Section title="Fee History">
            <Tile style={{ padding: 0, overflow: 'hidden' }}>
              {history.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 14px', borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
                  <span style={{ width: 34, height: 34, flex: 'none', borderRadius: 9, background: 'var(--green-50)', color: 'var(--green-600)', display: 'grid', placeItems: 'center' }}><Icon name="receipt" size={17} /></span>
                  <div><div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)' }}>{h.month}</div><div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>Paid {h.date}</div></div>
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{fmtRs(h.amount)}</span>
                    <button style={{ width: 32, height: 32, borderRadius: 8, border: '1px solid var(--border-subtle)', background: '#fff', color: 'var(--text-muted)', display: 'grid', placeItems: 'center' }}><Icon name="download" size={15} /></button>
                  </div>
                </div>
              ))}
            </Tile>
          </Section>
        </Scroll>
      </>
    );
  }

  /* ---- MORE MENU ---- */
  function MMore({ onOpen }) {
    const items = [
      { key: 'reports', icon: 'report', tone: ['var(--blue-50)', 'var(--blue-600)'], title: 'Reports', detail: 'Analytics, PDF & Excel exports' },
      { key: 'receipts', icon: 'receipt', tone: ['var(--green-50)', 'var(--green-600)'], title: 'Receipts', detail: 'Generate & share fee receipts' },
      { key: 'notifications', icon: 'bell', tone: ['var(--amber-50)', 'var(--amber-600)'], title: 'Notifications', detail: 'Payments, reminders & alerts' },
      { key: 'parent', icon: 'users', tone: ['#e6ddf7', '#5b3da8'], title: 'Parent Portal', detail: 'Fee history & receipts for parents' },
      { key: 'settings', icon: 'settings', tone: ['var(--slate-100)', 'var(--navy-800)'], title: 'Settings', detail: 'Academy, logo, WhatsApp, roles' },
    ];
    return (
      <>
        <AppHeader title="More" subtitle="All features" />
        <Scroll>
          <Tile style={{ padding: 0, overflow: 'hidden' }}>
            {items.map((it, i) => (
              <button key={it.key} onClick={() => onOpen(it.key)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px', border: 'none', borderTop: i ? '1px solid var(--border-subtle)' : 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ width: 36, height: 36, flex: 'none', borderRadius: 9, background: it.tone[0], color: it.tone[1], display: 'grid', placeItems: 'center' }}><Icon name={it.icon} size={18} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--text-strong)' }}>{it.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>{it.detail}</div>
                </div>
                <Icon name="chevronRight" size={17} color="var(--text-faint)" />
              </button>
            ))}
          </Tile>
        </Scroll>
      </>
    );
  }

  window.MOBILE_SCREENS = { dashboard: MDashboard, students: MStudents, collect: MCollect, reminders: MReminders };
  window.MOBILE_MORE = { reports: MReports, receipts: MReceipt, notifications: MNotifications, settings: MSettings, parent: MParent, more: MMore };
})();
