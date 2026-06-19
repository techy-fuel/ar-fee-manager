/* Al Rehman Fee Manager UI Kit — lightweight inline SVG charts. */
(function () {
  const BLUE = '#248dce', BLUE_LIGHT = '#a9d2ee', GREEN = '#16a34a', GRID = '#e3e9f0', AMBER = '#e08a0b';

  // Grouped bars: expected (light) vs received (brand) per month
  function ExpectedVsReceived({ data, height = 240 }) {
    const W = 720, H = height, padL = 40, padB = 28, padT = 12, padR = 8;
    const max = Math.max(...data.map((d) => d.expected)) * 1.1;
    const cw = (W - padL - padR) / data.length;
    const bw = cw * 0.28;
    const y = (v) => padT + (H - padT - padB) * (1 - v / max);
    const ticks = 4;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        {Array.from({ length: ticks + 1 }).map((_, i) => {
          const v = (max / ticks) * i;
          return (
            <g key={i}>
              <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={GRID} strokeWidth="1" />
              <text x={padL - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="#9aa7b8" fontFamily="IBM Plex Mono, monospace">{Math.round(v)}k</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const cx = padL + cw * i + cw / 2;
          return (
            <g key={i}>
              <rect x={cx - bw - 2} y={y(d.expected)} width={bw} height={H - padB - y(d.expected)} rx="3" fill={BLUE_LIGHT} />
              <rect x={cx + 2} y={y(d.received)} width={bw} height={H - padB - y(d.received)} rx="3" fill={BLUE} />
              <text x={cx} y={H - padB + 16} textAnchor="middle" fontSize="11" fill="#6b7889" fontFamily="Plus Jakarta Sans, sans-serif">{d.m}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  // Smooth area + line trend for received collection
  function CollectionTrend({ data, height = 240, color = GREEN }) {
    const W = 720, H = height, padL = 40, padB = 28, padT = 14, padR = 10;
    const vals = data.map((d) => d.received);
    const max = Math.max(...vals) * 1.08, min = Math.min(...vals) * 0.9;
    const x = (i) => padL + (W - padL - padR) * (i / (data.length - 1));
    const y = (v) => padT + (H - padT - padB) * (1 - (v - min) / (max - min));
    const pts = data.map((d, i) => [x(i), y(d.received)]);
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const area = line + ` L${x(data.length - 1)} ${H - padB} L${padL} ${H - padB} Z`;
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: 4 }).map((_, i) => {
          const v = min + ((max - min) / 3) * i;
          return <line key={i} x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke={GRID} strokeWidth="1" />;
        })}
        <path d={area} fill="url(#trendFill)" />
        <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#fff" stroke={color} strokeWidth="2" />)}
        {data.map((d, i) => <text key={i} x={x(i)} y={H - padB + 16} textAnchor="middle" fontSize="11" fill="#6b7889" fontFamily="Plus Jakarta Sans, sans-serif">{d.m}</text>)}
      </svg>
    );
  }

  // Donut ring for collection %
  function DonutGauge({ value, size = 168, stroke = 18, color = BLUE, track = '#eef2f7', label = 'Collected' }) {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r, off = c * (1 - value / 100);
    const valueFs = Math.round(size * 0.205), labelFs = Math.max(9, Math.round(size * 0.072));
    const valY = label ? '46%' : '50%';
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x="50%" y={valY} textAnchor="middle" dominantBaseline={label ? 'auto' : 'central'} fontSize={valueFs} fontWeight="800" fill="#131b27" fontFamily="Plus Jakarta Sans, sans-serif" style={{ fontVariantNumeric: 'tabular-nums' }}>{value}%</text>
        {label && <text x="50%" y="62%" textAnchor="middle" fontSize={labelFs} fontWeight="600" fill="#6b7889" fontFamily="Plus Jakarta Sans, sans-serif">{label}</text>}
      </svg>
    );
  }

  // Simple year revenue bars (Rs in millions)
  function YearlyRevenue({ data, height = 200 }) {
    const W = 360, H = height, padB = 26, padT = 16, padL = 8, padR = 8;
    const max = Math.max(...data.map((d) => d.revenue)) * 1.12;
    const cw = (W - padL - padR) / data.length;
    const bw = cw * 0.5;
    const y = (v) => padT + (H - padT - padB) * (1 - v / max);
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        {data.map((d, i) => {
          const cx = padL + cw * i + cw / 2;
          return (
            <g key={i}>
              <rect x={cx - bw / 2} y={y(d.revenue)} width={bw} height={H - padB - y(d.revenue)} rx="4" fill={i === data.length - 1 ? BLUE : BLUE_LIGHT} />
              <text x={cx} y={y(d.revenue) - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#374352" fontFamily="IBM Plex Mono, monospace">{d.revenue}M</text>
              <text x={cx} y={H - padB + 16} textAnchor="middle" fontSize="11" fill="#6b7889" fontFamily="Plus Jakarta Sans, sans-serif">{d.y}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  Object.assign(window, { ExpectedVsReceived, CollectionTrend, DonutGauge, YearlyRevenue });
})();
