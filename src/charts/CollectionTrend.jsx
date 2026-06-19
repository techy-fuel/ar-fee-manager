const GREEN = '#16a34a', GRID = '#e3e9f0';

export function CollectionTrend({ data, height = 240, color = GREEN }) {
  const W = 720, H = height, padL = 40, padB = 28, padT = 14, padR = 10;
  const vals = data.map(d => d.received);
  const max = Math.max(...vals) * 1.08, min = Math.min(...vals) * 0.9;
  const x = i => padL + (W - padL - padR) * (i / (data.length - 1));
  const y = v => padT + (H - padT - padB) * (1 - (v - min) / (max - min));
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
