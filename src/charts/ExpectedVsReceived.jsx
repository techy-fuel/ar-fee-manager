const BLUE = '#248dce', BLUE_LIGHT = '#a9d2ee', GRID = '#e3e9f0';

export function ExpectedVsReceived({ data, height = 240 }) {
  const W = 720, H = height, padL = 40, padB = 28, padT = 12, padR = 8;
  const max = (Math.max(0, ...data.map(d => d.expected)) || 1) * 1.1;
  const cw = (W - padL - padR) / data.length;
  const bw = cw * 0.28;
  const y = v => padT + (H - padT - padB) * (1 - v / max);
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
