const BLUE = '#248dce';

export function DonutGauge({ value, size = 168, stroke = 18, color = BLUE, track = '#eef2f7', label = 'Collected' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - value / 100);
  const valueFs = Math.round(size * 0.205);
  const labelFs = Math.max(9, Math.round(size * 0.072));
  const valY = label ? '46%' : '50%';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y={valY} textAnchor="middle" dominantBaseline={label ? 'auto' : 'central'}
        fontSize={valueFs} fontWeight="800" fill="#131b27"
        fontFamily="Plus Jakarta Sans, sans-serif"
        style={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}%
      </text>
      {label && (
        <text x="50%" y="62%" textAnchor="middle" fontSize={labelFs} fontWeight="600" fill="#6b7889" fontFamily="Plus Jakarta Sans, sans-serif">
          {label}
        </text>
      )}
    </svg>
  );
}
