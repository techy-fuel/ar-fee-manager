const BLUE = '#248dce', BLUE_LIGHT = '#a9d2ee';

export function YearlyRevenue({ data, height = 200 }) {
  const W = 360, H = height, padB = 26, padT = 16, padL = 8, padR = 8;
  const max = (Math.max(0, ...data.map(d => d.revenue)) || 1) * 1.12;
  const cw = (W - padL - padR) / data.length;
  const bw = cw * 0.5;
  const y = v => padT + (H - padT - padB) * (1 - v / max);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      {data.map((d, i) => {
        const cx = padL + cw * i + cw / 2;
        return (
          <g key={i}>
            <rect x={cx - bw / 2} y={y(d.revenue)} width={bw} height={H - padB - y(d.revenue)} rx="4"
              fill={i === data.length - 1 ? BLUE : BLUE_LIGHT} />
            <text x={cx} y={y(d.revenue) - 6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#374352" fontFamily="IBM Plex Mono, monospace">{d.revenue}M</text>
            <text x={cx} y={H - padB + 16} textAnchor="middle" fontSize="11" fill="#6b7889" fontFamily="Plus Jakarta Sans, sans-serif">{d.y}</text>
          </g>
        );
      })}
    </svg>
  );
}
