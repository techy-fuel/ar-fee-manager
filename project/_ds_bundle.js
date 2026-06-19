/* @ds-bundle: {"format":3,"namespace":"AlRehmanFeeManagerDesignSystem_ad9d9e","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StatCard","sourcePath":"components/data/StatCard.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"1a4044b67c68","components/core/Badge.jsx":"9c2033385b25","components/core/Button.jsx":"18736059cf96","components/core/Card.jsx":"e774004394bb","components/data/ProgressBar.jsx":"eb0ae4b828f0","components/data/StatCard.jsx":"17a4b0a026bb","components/forms/Input.jsx":"dfea7d2cef3e","components/forms/Select.jsx":"d807fb6cea60","ui_kits/fee_manager/charts.jsx":"7e2bac6cc6b5","ui_kits/fee_manager/data.jsx":"c0a5d79bc921","ui_kits/fee_manager/icons.jsx":"67a64864c1e1","ui_kits/fee_manager/screens.jsx":"09db847b0f88","ui_kits/fee_manager/shell.jsx":"22e9eff18bea","ui_kits/fee_manager_android/android-frame.jsx":"70c8c3059eeb","ui_kits/fee_manager_mobile/ios-frame.jsx":"be3343be4b51","ui_kits/fee_manager_mobile/mobile.jsx":"79837111fe90"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AlRehmanFeeManagerDesignSystem_ad9d9e = window.AlRehmanFeeManagerDesignSystem_ad9d9e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — Avatar
 * Initials avatar with deterministic brand-tinted color. Used for students/parents/users.
 */
function Avatar({
  name = '',
  src = null,
  size = 'md',
  square = false,
  style = {},
  ...rest
}) {
  const sizes = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };
  const px = sizes[size] || sizes.md;
  const fontPx = Math.round(px * 0.38);
  const initials = name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';

  // deterministic tone from name
  const palette = [['var(--blue-100)', 'var(--blue-700)'], ['var(--green-100)', 'var(--green-700)'], ['var(--amber-100)', 'var(--amber-700)'], ['#e6ddf7', '#5b3da8'], ['#d9eef5', '#0f6f8c'], ['#fbdce4', '#a8325a']];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = hash * 31 + name.charCodeAt(i) >>> 0;
  const [bg, fg] = palette[hash % palette.length];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: px,
      height: px,
      flex: 'none',
      borderRadius: square ? 'var(--radius-md)' : '50%',
      background: src ? 'var(--slate-100)' : bg,
      color: fg,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-bold)',
      fontSize: fontPx,
      letterSpacing: '-0.01em',
      overflow: 'hidden',
      border: '1px solid rgba(19,27,39,0.06)',
      userSelect: 'none',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — Badge
 * Compact status / category label. Used for Active/Inactive, Paid/Pending/Overdue.
 */
function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  style = {},
  ...rest
}) {
  const variants = {
    neutral: {
      bg: 'var(--slate-100)',
      fg: 'var(--slate-600)',
      bd: 'var(--slate-200)',
      solid: 'var(--slate-400)'
    },
    info: {
      bg: 'var(--status-info-bg)',
      fg: 'var(--status-info-fg)',
      bd: 'var(--status-info-border)',
      solid: 'var(--status-info-solid)'
    },
    success: {
      bg: 'var(--status-success-bg)',
      fg: 'var(--status-success-fg)',
      bd: 'var(--status-success-border)',
      solid: 'var(--status-success-solid)'
    },
    warning: {
      bg: 'var(--status-warning-bg)',
      fg: 'var(--status-warning-fg)',
      bd: 'var(--status-warning-border)',
      solid: 'var(--status-warning-solid)'
    },
    danger: {
      bg: 'var(--status-danger-bg)',
      fg: 'var(--status-danger-fg)',
      bd: 'var(--status-danger-border)',
      solid: 'var(--status-danger-solid)'
    },
    brand: {
      bg: 'var(--blue-50)',
      fg: 'var(--blue-700)',
      bd: 'var(--blue-100)',
      solid: 'var(--blue-500)'
    }
  };
  const sizes = {
    sm: {
      fontSize: 'var(--fs-2xs)',
      padding: dot ? '2px 8px 2px 6px' : '2px 8px',
      gap: 5,
      dotSize: 5
    },
    md: {
      fontSize: 'var(--fs-xs)',
      padding: dot ? '3px 10px 3px 8px' : '3px 10px',
      gap: 6,
      dotSize: 6
    }
  };
  const v = variants[variant] || variants.neutral;
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: s.gap,
      padding: s.padding,
      fontSize: s.fontSize,
      fontWeight: 'var(--fw-semibold)',
      fontFamily: 'var(--font-sans)',
      letterSpacing: 'var(--ls-snug)',
      lineHeight: 1.4,
      color: v.fg,
      background: v.bg,
      border: `1px solid ${v.bd}`,
      borderRadius: 'var(--radius-full)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.dotSize,
      height: s.dotSize,
      borderRadius: '50%',
      background: v.solid,
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — Button
 * Primary action control. Variants, sizes, icon support, loading + disabled.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      height: 32,
      padding: '0 12px',
      fontSize: 'var(--fs-sm)',
      gap: 6,
      radius: 'var(--radius-sm)'
    },
    md: {
      height: 40,
      padding: '0 16px',
      fontSize: 'var(--fs-body)',
      gap: 8,
      radius: 'var(--radius-md)'
    },
    lg: {
      height: 48,
      padding: '0 22px',
      fontSize: 'var(--fs-h4)',
      gap: 9,
      radius: 'var(--radius-md)'
    }
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      border: '1px solid var(--color-primary)',
      boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--color-primary-hover)'
    },
    secondary: {
      background: 'var(--color-surface)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--color-surface-hover)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent',
      boxShadow: 'none',
      '--hover-bg': 'var(--color-surface-hover)'
    },
    subtle: {
      background: 'var(--color-primary-subtle)',
      color: 'var(--blue-700)',
      border: '1px solid var(--color-primary-border)',
      boxShadow: 'none',
      '--hover-bg': 'var(--blue-100)'
    },
    danger: {
      background: 'var(--status-danger-solid)',
      color: '#fff',
      border: '1px solid var(--status-danger-solid)',
      boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--red-600)'
    },
    whatsapp: {
      background: 'var(--whatsapp)',
      color: '#fff',
      border: '1px solid var(--whatsapp)',
      boxShadow: 'var(--shadow-xs)',
      '--hover-bg': 'var(--whatsapp-dark)'
    }
  };
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled || loading,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-snug)',
      lineHeight: 1,
      borderRadius: s.radius,
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      width: fullWidth ? '100%' : 'auto',
      whiteSpace: 'nowrap',
      transition: 'background var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast), transform var(--dur-fast)',
      opacity: disabled ? 0.5 : 1,
      transform: hover && !disabled && !loading ? 'translateY(-1px)' : 'none',
      ...v,
      background: hover && !disabled && !loading ? v['--hover-bg'] : v.background,
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement(Spinner, null), !loading && iconLeft, children, !loading && iconRight);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: 15,
      height: 15,
      borderRadius: '50%',
      border: '2px solid rgba(255,255,255,0.45)',
      borderTopColor: '#fff',
      display: 'inline-block',
      animation: 'arfm-spin 0.7s linear infinite'
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes arfm-spin{to{transform:rotate(360deg)}}`));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — Card
 * Surface container with optional header (title/subtitle/actions) and footer.
 */
function Card({
  children,
  title = null,
  subtitle = null,
  actions = null,
  footer = null,
  padding = 'md',
  interactive = false,
  style = {},
  bodyStyle = {},
  ...rest
}) {
  const pads = {
    none: '0',
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  };
  const pad = pads[padding] ?? pads.md;
  const [hover, setHover] = React.useState(false);
  const hasHeader = title || subtitle || actions;
  return /*#__PURE__*/React.createElement("section", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--card-radius)',
      boxShadow: hover ? 'var(--shadow-md)' : 'var(--card-shadow)',
      transition: 'box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base), border-color var(--dur-base)',
      transform: hover ? 'translateY(-2px)' : 'none',
      cursor: interactive ? 'pointer' : 'default',
      overflow: 'hidden',
      ...style
    }
  }, rest), hasHeader && /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      padding: `${pad === '0' ? 'var(--space-5)' : pad} ${pad === '0' ? 'var(--space-5)' : pad} 0`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'var(--fs-h4)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--ls-snug)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-muted)'
    }
  }, subtitle)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      gap: 'var(--space-2)'
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: hasHeader && pad !== '0' ? `var(--space-4) ${pad} ${pad}` : pad,
      ...bodyStyle
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: `var(--space-4) ${pad === '0' ? 'var(--space-5)' : pad}`,
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--color-surface-sunken)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — ProgressBar
 * Horizontal progress / collection meter with semantic colors and optional label.
 */
function ProgressBar({
  value = 0,
  max = 100,
  variant = 'brand',
  size = 'md',
  showLabel = false,
  label = null,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const colors = {
    brand: 'var(--blue-500)',
    success: 'var(--green-500)',
    warning: 'var(--amber-500)',
    danger: 'var(--red-500)'
  };
  const heights = {
    sm: 6,
    md: 8,
    lg: 12
  };
  const h = heights[size] || heights.md;
  const fill = colors[variant] || colors.brand;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      ...style
    }
  }, rest), (showLabel || label) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-muted)'
    }
  }, label), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-bold)',
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: h,
      background: 'var(--chart-track)',
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: fill,
      borderRadius: 'var(--radius-full)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — StatCard
 * Dashboard KPI card: tinted icon, big value, trend delta, optional progress meter.
 */
function StatCard({
  label,
  value,
  icon = null,
  tone = 'brand',
  delta = null,
  deltaDirection = 'up',
  deltaLabel = 'vs last month',
  progress = null,
  progressVariant = null,
  footnote = null,
  style = {},
  ...rest
}) {
  const tones = {
    brand: {
      bg: 'var(--blue-50)',
      fg: 'var(--blue-600)'
    },
    success: {
      bg: 'var(--green-50)',
      fg: 'var(--green-600)'
    },
    warning: {
      bg: 'var(--amber-50)',
      fg: 'var(--amber-600)'
    },
    danger: {
      bg: 'var(--red-50)',
      fg: 'var(--red-600)'
    },
    navy: {
      bg: 'var(--slate-100)',
      fg: 'var(--navy-800)'
    }
  };
  const t = tones[tone] || tones.brand;
  const up = deltaDirection === 'up';
  const deltaColor = up ? 'var(--green-600)' : 'var(--red-600)';
  const deltaBg = up ? 'var(--green-50)' : 'var(--red-50)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: 'var(--color-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--card-radius)',
      boxShadow: 'var(--card-shadow)',
      padding: 'var(--space-5)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-muted)',
      letterSpacing: 'var(--ls-snug)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 'var(--fs-h1)',
      fontWeight: 'var(--fw-extra)',
      color: 'var(--text-strong)',
      letterSpacing: 'var(--ls-tight)',
      lineHeight: 1.05,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value)), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: t.bg,
      color: t.fg
    }
  }, icon)), (delta != null || footnote) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flexWrap: 'wrap'
    }
  }, delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '2px 8px',
      borderRadius: 'var(--radius-full)',
      background: deltaBg,
      color: deltaColor,
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.6",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      transform: up ? 'none' : 'scaleY(-1)'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 17 9 11 13 15 21 7"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "15 7 21 7 21 13"
  })), delta), deltaLabel && delta != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-faint)'
    }
  }, deltaLabel), footnote && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)'
    }
  }, footnote)), progress != null && /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    value: progress,
    variant: progressVariant || tone,
    size: "sm"
  }));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — Input
 * Text field with optional label, leading/trailing icons, hint and error.
 */
function Input({
  label = null,
  hint = null,
  error = null,
  iconLeft = null,
  iconRight = null,
  size = 'md',
  fullWidth = true,
  id,
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      height: 34,
      font: 'var(--fs-sm)',
      pad: 10
    },
    md: {
      height: 40,
      font: 'var(--fs-body)',
      pad: 12
    },
    lg: {
      height: 46,
      font: 'var(--fs-h4)',
      pad: 14
    }
  };
  const s = sizes[size] || sizes.md;
  const reactId = React.useId();
  const fieldId = id || reactId;
  const borderColor = error ? 'var(--status-danger-solid)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : 'auto',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      marginBottom: 6,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: s.height,
      padding: `0 ${s.pad}px`,
      background: 'var(--color-surface)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? error ? 'var(--ring-danger)' : 'var(--ring-primary)' : 'var(--shadow-xs)',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-faint)',
      flex: 'none'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      color: 'var(--text-primary)',
      ...inputStyle
    }
  }, rest)), iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-faint)',
      flex: 'none'
    }
  }, iconRight)), (hint || error) && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--fs-xs)',
      color: error ? 'var(--status-danger-fg)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Al Rehman Fee Manager — Select
 * Styled native select with label / hint / error. Wraps a real <select> for accessibility.
 */
function Select({
  label = null,
  hint = null,
  error = null,
  options = [],
  placeholder = null,
  size = 'md',
  fullWidth = true,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      height: 34,
      font: 'var(--fs-sm)',
      pad: 10
    },
    md: {
      height: 40,
      font: 'var(--fs-body)',
      pad: 12
    },
    lg: {
      height: 46,
      font: 'var(--fs-h4)',
      pad: 14
    }
  };
  const s = sizes[size] || sizes.md;
  const reactId = React.useId();
  const fieldId = id || reactId;
  const borderColor = error ? 'var(--status-danger-solid)' : focus ? 'var(--border-focus)' : 'var(--border-default)';
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : 'auto',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      display: 'block',
      marginBottom: 6,
      fontSize: 'var(--fs-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: s.height,
      background: 'var(--color-surface)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? error ? 'var(--ring-danger)' : 'var(--ring-primary)' : 'var(--shadow-xs)',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: '100%',
      padding: `0 36px 0 ${s.pad}px`,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: s.font,
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), norm.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-faint)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      position: 'absolute',
      right: s.pad,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), (hint || error) && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 'var(--fs-xs)',
      color: error ? 'var(--status-danger-fg)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager/charts.jsx
try { (() => {
/* Al Rehman Fee Manager UI Kit — lightweight inline SVG charts. */
(function () {
  const BLUE = '#248dce',
    BLUE_LIGHT = '#a9d2ee',
    GREEN = '#16a34a',
    GRID = '#e3e9f0',
    AMBER = '#e08a0b';

  // Grouped bars: expected (light) vs received (brand) per month
  function ExpectedVsReceived({
    data,
    height = 240
  }) {
    const W = 720,
      H = height,
      padL = 40,
      padB = 28,
      padT = 12,
      padR = 8;
    const max = Math.max(...data.map(d => d.expected)) * 1.1;
    const cw = (W - padL - padR) / data.length;
    const bw = cw * 0.28;
    const y = v => padT + (H - padT - padB) * (1 - v / max);
    const ticks = 4;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      preserveAspectRatio: "xMidYMid meet",
      style: {
        display: 'block'
      }
    }, Array.from({
      length: ticks + 1
    }).map((_, i) => {
      const v = max / ticks * i;
      return /*#__PURE__*/React.createElement("g", {
        key: i
      }, /*#__PURE__*/React.createElement("line", {
        x1: padL,
        y1: y(v),
        x2: W - padR,
        y2: y(v),
        stroke: GRID,
        strokeWidth: "1"
      }), /*#__PURE__*/React.createElement("text", {
        x: padL - 8,
        y: y(v) + 4,
        textAnchor: "end",
        fontSize: "11",
        fill: "#9aa7b8",
        fontFamily: "IBM Plex Mono, monospace"
      }, Math.round(v), "k"));
    }), data.map((d, i) => {
      const cx = padL + cw * i + cw / 2;
      return /*#__PURE__*/React.createElement("g", {
        key: i
      }, /*#__PURE__*/React.createElement("rect", {
        x: cx - bw - 2,
        y: y(d.expected),
        width: bw,
        height: H - padB - y(d.expected),
        rx: "3",
        fill: BLUE_LIGHT
      }), /*#__PURE__*/React.createElement("rect", {
        x: cx + 2,
        y: y(d.received),
        width: bw,
        height: H - padB - y(d.received),
        rx: "3",
        fill: BLUE
      }), /*#__PURE__*/React.createElement("text", {
        x: cx,
        y: H - padB + 16,
        textAnchor: "middle",
        fontSize: "11",
        fill: "#6b7889",
        fontFamily: "Plus Jakarta Sans, sans-serif"
      }, d.m));
    }));
  }

  // Smooth area + line trend for received collection
  function CollectionTrend({
    data,
    height = 240,
    color = GREEN
  }) {
    const W = 720,
      H = height,
      padL = 40,
      padB = 28,
      padT = 14,
      padR = 10;
    const vals = data.map(d => d.received);
    const max = Math.max(...vals) * 1.08,
      min = Math.min(...vals) * 0.9;
    const x = i => padL + (W - padL - padR) * (i / (data.length - 1));
    const y = v => padT + (H - padT - padB) * (1 - (v - min) / (max - min));
    const pts = data.map((d, i) => [x(i), y(d.received)]);
    const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
    const area = line + ` L${x(data.length - 1)} ${H - padB} L${padL} ${H - padB} Z`;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      preserveAspectRatio: "xMidYMid meet",
      style: {
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "trendFill",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: color,
      stopOpacity: "0.18"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: color,
      stopOpacity: "0"
    }))), Array.from({
      length: 4
    }).map((_, i) => {
      const v = min + (max - min) / 3 * i;
      return /*#__PURE__*/React.createElement("line", {
        key: i,
        x1: padL,
        y1: y(v),
        x2: W - padR,
        y2: y(v),
        stroke: GRID,
        strokeWidth: "1"
      });
    }), /*#__PURE__*/React.createElement("path", {
      d: area,
      fill: "url(#trendFill)"
    }), /*#__PURE__*/React.createElement("path", {
      d: line,
      fill: "none",
      stroke: color,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: p[0],
      cy: p[1],
      r: "3",
      fill: "#fff",
      stroke: color,
      strokeWidth: "2"
    })), data.map((d, i) => /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x(i),
      y: H - padB + 16,
      textAnchor: "middle",
      fontSize: "11",
      fill: "#6b7889",
      fontFamily: "Plus Jakarta Sans, sans-serif"
    }, d.m)));
  }

  // Donut ring for collection %
  function DonutGauge({
    value,
    size = 168,
    stroke = 18,
    color = BLUE,
    track = '#eef2f7',
    label = 'Collected'
  }) {
    const r = (size - stroke) / 2,
      c = 2 * Math.PI * r,
      off = c * (1 - value / 100);
    const valueFs = Math.round(size * 0.205),
      labelFs = Math.max(9, Math.round(size * 0.072));
    const valY = label ? '46%' : '50%';
    return /*#__PURE__*/React.createElement("svg", {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`
    }, /*#__PURE__*/React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: track,
      strokeWidth: stroke
    }), /*#__PURE__*/React.createElement("circle", {
      cx: size / 2,
      cy: size / 2,
      r: r,
      fill: "none",
      stroke: color,
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeDasharray: c,
      strokeDashoffset: off,
      transform: `rotate(-90 ${size / 2} ${size / 2})`
    }), /*#__PURE__*/React.createElement("text", {
      x: "50%",
      y: valY,
      textAnchor: "middle",
      dominantBaseline: label ? 'auto' : 'central',
      fontSize: valueFs,
      fontWeight: "800",
      fill: "#131b27",
      fontFamily: "Plus Jakarta Sans, sans-serif",
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, value, "%"), label && /*#__PURE__*/React.createElement("text", {
      x: "50%",
      y: "62%",
      textAnchor: "middle",
      fontSize: labelFs,
      fontWeight: "600",
      fill: "#6b7889",
      fontFamily: "Plus Jakarta Sans, sans-serif"
    }, label));
  }

  // Simple year revenue bars (Rs in millions)
  function YearlyRevenue({
    data,
    height = 200
  }) {
    const W = 360,
      H = height,
      padB = 26,
      padT = 16,
      padL = 8,
      padR = 8;
    const max = Math.max(...data.map(d => d.revenue)) * 1.12;
    const cw = (W - padL - padR) / data.length;
    const bw = cw * 0.5;
    const y = v => padT + (H - padT - padB) * (1 - v / max);
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: `0 0 ${W} ${H}`,
      width: "100%",
      preserveAspectRatio: "xMidYMid meet",
      style: {
        display: 'block'
      }
    }, data.map((d, i) => {
      const cx = padL + cw * i + cw / 2;
      return /*#__PURE__*/React.createElement("g", {
        key: i
      }, /*#__PURE__*/React.createElement("rect", {
        x: cx - bw / 2,
        y: y(d.revenue),
        width: bw,
        height: H - padB - y(d.revenue),
        rx: "4",
        fill: i === data.length - 1 ? BLUE : BLUE_LIGHT
      }), /*#__PURE__*/React.createElement("text", {
        x: cx,
        y: y(d.revenue) - 6,
        textAnchor: "middle",
        fontSize: "11",
        fontWeight: "700",
        fill: "#374352",
        fontFamily: "IBM Plex Mono, monospace"
      }, d.revenue, "M"), /*#__PURE__*/React.createElement("text", {
        x: cx,
        y: H - padB + 16,
        textAnchor: "middle",
        fontSize: "11",
        fill: "#6b7889",
        fontFamily: "Plus Jakarta Sans, sans-serif"
      }, d.y));
    }));
  }
  Object.assign(window, {
    ExpectedVsReceived,
    CollectionTrend,
    DonutGauge,
    YearlyRevenue
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager/charts.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager/data.jsx
try { (() => {
/* Al Rehman Fee Manager UI Kit — realistic mock data. */
(function () {
  const students = [{
    id: 'STU-1042',
    name: 'Ahmed Raza',
    cls: 'Class 9-A',
    fee: 3500,
    status: 'Active',
    feeStatus: 'Paid',
    parent: 'Raza Muhammad',
    wa: '+92 300 1234567',
    avatar: null
  }, {
    id: 'STU-1043',
    name: 'Fatima Bibi',
    cls: 'Class 7-B',
    fee: 3000,
    status: 'Active',
    feeStatus: 'Pending',
    parent: 'Abdul Karim',
    wa: '+92 301 7654321',
    avatar: null
  }, {
    id: 'STU-1044',
    name: 'Usman Khan',
    cls: 'Class 10-A',
    fee: 4000,
    status: 'Active',
    feeStatus: 'Paid',
    parent: 'Imran Khan',
    wa: '+92 333 9988776',
    avatar: null
  }, {
    id: 'STU-1045',
    name: 'Zainab Ali',
    cls: 'Class 6-A',
    fee: 2800,
    status: 'Active',
    feeStatus: 'Overdue',
    parent: 'Ali Hassan',
    wa: '+92 321 4567890',
    avatar: null
  }, {
    id: 'STU-1046',
    name: 'Bilal Sheikh',
    cls: 'Class 8-B',
    fee: 3200,
    status: 'Inactive',
    feeStatus: 'Overdue',
    parent: 'Sheikh Tariq',
    wa: '+92 345 1122334',
    avatar: null
  }, {
    id: 'STU-1047',
    name: 'Ayesha Noor',
    cls: 'Class 9-A',
    fee: 3500,
    status: 'Active',
    feeStatus: 'Paid',
    parent: 'Noor ul Haq',
    wa: '+92 300 5566778',
    avatar: null
  }, {
    id: 'STU-1048',
    name: 'Hamza Yousaf',
    cls: 'Class 7-A',
    fee: 3000,
    status: 'Active',
    feeStatus: 'Pending',
    parent: 'Yousaf Ali',
    wa: '+92 302 6677889',
    avatar: null
  }, {
    id: 'STU-1049',
    name: 'Mariam Iqbal',
    cls: 'Class 10-B',
    fee: 4000,
    status: 'Active',
    feeStatus: 'Paid',
    parent: 'Iqbal Ahmed',
    wa: '+92 311 2233445',
    avatar: null
  }, {
    id: 'STU-1050',
    name: 'Saad Mahmood',
    cls: 'Class 8-A',
    fee: 3200,
    status: 'Active',
    feeStatus: 'Pending',
    parent: 'Mahmood Hussain',
    wa: '+92 322 3344556',
    avatar: null
  }, {
    id: 'STU-1051',
    name: 'Hira Aslam',
    cls: 'Class 6-B',
    fee: 2800,
    status: 'Active',
    feeStatus: 'Paid',
    parent: 'Aslam Pervez',
    wa: '+92 334 4455667',
    avatar: null
  }, {
    id: 'STU-1052',
    name: 'Talha Javed',
    cls: 'Class 9-B',
    fee: 3500,
    status: 'Active',
    feeStatus: 'Overdue',
    parent: 'Javed Akhtar',
    wa: '+92 300 5544332',
    avatar: null
  }, {
    id: 'STU-1053',
    name: 'Komal Riaz',
    cls: 'Class 7-B',
    fee: 3000,
    status: 'Active',
    feeStatus: 'Paid',
    parent: 'Riaz Ahmed',
    wa: '+92 301 9988771',
    avatar: null
  }];

  // monthly collection (expected vs received), in thousands of Rs
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthly = [{
    m: 'Jan',
    expected: 412,
    received: 388
  }, {
    m: 'Feb',
    expected: 415,
    received: 401
  }, {
    m: 'Mar',
    expected: 418,
    received: 360
  }, {
    m: 'Apr',
    expected: 420,
    received: 408
  }, {
    m: 'May',
    expected: 422,
    received: 395
  }, {
    m: 'Jun',
    expected: 425,
    received: 372
  }, {
    m: 'Jul',
    expected: 428,
    received: 351
  }, {
    m: 'Aug',
    expected: 430,
    received: 412
  }, {
    m: 'Sep',
    expected: 432,
    received: 420
  }, {
    m: 'Oct',
    expected: 435,
    received: 398
  }, {
    m: 'Nov',
    expected: 438,
    received: 416
  }, {
    m: 'Dec',
    expected: 440,
    received: 405
  }];
  const yearly = [{
    y: '2021',
    revenue: 3.9
  }, {
    y: '2022',
    revenue: 4.3
  }, {
    y: '2023',
    revenue: 4.6
  }, {
    y: '2024',
    revenue: 4.9
  }, {
    y: '2025',
    revenue: 5.2
  }];
  const transactions = [{
    id: 'TXN-9F2A7C',
    student: 'Ahmed Raza',
    cls: 'Class 9-A',
    amount: 3500,
    month: 'July 2025',
    date: '12 Jul 2025',
    method: 'Bank Transfer',
    status: 'Verified'
  }, {
    id: 'TXN-3B81D2',
    student: 'Usman Khan',
    cls: 'Class 10-A',
    amount: 4000,
    month: 'July 2025',
    date: '11 Jul 2025',
    method: 'JazzCash',
    status: 'Verified'
  }, {
    id: 'TXN-7E44A9',
    student: 'Ayesha Noor',
    cls: 'Class 9-A',
    amount: 3500,
    month: 'July 2025',
    date: '10 Jul 2025',
    method: 'EasyPaisa',
    status: 'Verified'
  }, {
    id: 'TXN-1C09F5',
    student: 'Mariam Iqbal',
    cls: 'Class 10-B',
    amount: 4000,
    month: 'July 2025',
    date: '09 Jul 2025',
    method: 'Bank Transfer',
    status: 'Pending'
  }, {
    id: 'TXN-5A6E33',
    student: 'Hira Aslam',
    cls: 'Class 6-B',
    amount: 2800,
    month: 'July 2025',
    date: '08 Jul 2025',
    method: 'Cash',
    status: 'Verified'
  }];
  const pending = students.filter(s => s.feeStatus !== 'Paid');
  const reminders = [{
    name: 'Zainab Ali',
    cls: 'Class 6-A',
    amount: 2800,
    sent: '2 days ago',
    channel: 'WhatsApp',
    status: 'Delivered'
  }, {
    name: 'Bilal Sheikh',
    cls: 'Class 8-B',
    amount: 3200,
    sent: '2 days ago',
    channel: 'WhatsApp',
    status: 'Read'
  }, {
    name: 'Talha Javed',
    cls: 'Class 9-B',
    amount: 3500,
    sent: '5 days ago',
    channel: 'WhatsApp',
    status: 'Delivered'
  }, {
    name: 'Fatima Bibi',
    cls: 'Class 7-B',
    amount: 3000,
    sent: '6 days ago',
    channel: 'WhatsApp',
    status: 'Failed'
  }];
  const notifications = [{
    type: 'success',
    title: 'New fee received',
    body: 'Ahmed Raza paid Rs 3,500 for July via Bank Transfer.',
    time: '12 min ago'
  }, {
    type: 'warning',
    title: 'Payment pending',
    body: 'Hamza Yousaf has not paid the July fee of Rs 3,000.',
    time: '1 hour ago'
  }, {
    type: 'info',
    title: 'Reminder sent',
    body: 'WhatsApp reminder delivered to 14 parents.',
    time: '3 hours ago'
  }, {
    type: 'success',
    title: 'New fee received',
    body: 'Usman Khan paid Rs 4,000 for July via JazzCash.',
    time: '5 hours ago'
  }, {
    type: 'danger',
    title: 'Fee overdue',
    body: 'Zainab Ali is 12 days overdue for the July fee.',
    time: 'Yesterday'
  }];
  const stats = {
    totalStudents: 1284,
    expected: 428000,
    collected: 351000,
    pending: 77000,
    rate: 82
  };
  window.DATA = {
    students,
    months,
    monthly,
    yearly,
    transactions,
    pending,
    reminders,
    notifications,
    stats
  };
  window.fmtRs = n => 'Rs ' + n.toLocaleString('en-PK');
  window.fmtK = n => 'Rs ' + (n / 1000).toFixed(0) + 'k';
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager/icons.jsx
try { (() => {
/* Al Rehman Fee Manager UI Kit — Lucide line icons (2px stroke) as a small registry. */
(function () {
  const P = {
    dashboard: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    wallet: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>',
    report: '<path d="M3 3v18h18"/><rect x="7" y="11" width="3" height="6"/><rect x="12" y="7" width="3" height="10"/><rect x="17" y="13" width="3" height="4"/>',
    receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    chevronDown: '<polyline points="6 9 12 15 18 9"/>',
    chevronRight: '<polyline points="9 18 15 12 9 6"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>',
    arrowUpRight: '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    fileText: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    spreadsheet: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="12" y1="11" x2="12" y2="19"/>',
    menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9Z"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/>',
    edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
    print: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    checkSmall: '<polyline points="20 6 9 17 4 12"/>'
  };
  function Icon({
    name,
    size = 20,
    strokeWidth = 2,
    color = 'currentColor',
    style = {}
  }) {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: {
        flex: 'none',
        ...style
      },
      dangerouslySetInnerHTML: {
        __html: P[name] || ''
      }
    });
  }
  function WhatsAppIcon({
    size = 18,
    color = 'currentColor'
  }) {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: color,
      style: {
        flex: 'none'
      },
      dangerouslySetInnerHTML: {
        __html: '<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 .9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.6c-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.5.3.1.3.1.6-.1 1Z"/>'
      }
    });
  }
  window.Icon = Icon;
  window.WhatsAppIcon = WhatsAppIcon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager/screens.jsx
try { (() => {
/* Al Rehman Fee Manager UI Kit — screens. */
(function () {
  const NS = window.AlRehmanFeeManagerDesignSystem_ad9d9e;
  const {
    Card,
    Button,
    Badge,
    Avatar,
    Input,
    Select,
    StatCard,
    ProgressBar
  } = NS;
  const {
    Icon,
    WhatsAppIcon,
    DATA,
    fmtRs
  } = window;
  const {
    ExpectedVsReceived,
    CollectionTrend,
    DonutGauge,
    YearlyRevenue
  } = window;
  const feeBadge = s => s === 'Paid' ? /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    dot: true
  }, "Paid") : s === 'Pending' ? /*#__PURE__*/React.createElement(Badge, {
    variant: "warning",
    dot: true
  }, "Pending") : /*#__PURE__*/React.createElement(Badge, {
    variant: "danger",
    dot: true
  }, "Overdue");
  const PageWrap = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, children);
  const SectionTitle = ({
    children,
    right
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--fs-h4)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: 0
    }
  }, children), right && /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto'
    }
  }, right));

  /* ---------------- DASHBOARD ---------------- */
  function Dashboard() {
    const s = DATA.stats;
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5,1fr)',
        gap: 16,
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "Total Students",
      value: s.totalStudents.toLocaleString(),
      tone: "brand",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 22
      }),
      delta: "4.6%",
      deltaDirection: "up"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Expected Fee",
      value: fmtRs(s.expected),
      tone: "navy",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 22
      }),
      footnote: "July 2025"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Collected Fee",
      value: fmtRs(s.collected),
      tone: "success",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wallet",
        size: 22
      }),
      delta: "8.2%",
      deltaDirection: "up"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Pending Fee",
      value: fmtRs(s.pending),
      tone: "warning",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "clock",
        size: 22
      }),
      delta: "3.1%",
      deltaDirection: "down"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Collection %",
      value: s.rate + '%',
      tone: "brand",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending",
        size: 22
      }),
      progress: s.rate,
      progressVariant: "success"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.7fr 1fr',
        gap: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Expected vs Received",
      subtitle: "Monthly fee collection \xB7 2025",
      actions: /*#__PURE__*/React.createElement(Legend, null)
    }, /*#__PURE__*/React.createElement(ExpectedVsReceived, {
      data: DATA.monthly
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Collection Rate",
      subtitle: "This month"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        placeItems: 'center',
        padding: '6px 0 14px'
      }
    }, /*#__PURE__*/React.createElement(DonutGauge, {
      value: s.rate
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-around',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 14
      }
    }, /*#__PURE__*/React.createElement(KV, {
      label: "Collected",
      value: fmtRs(s.collected),
      color: "var(--green-600)"
    }), /*#__PURE__*/React.createElement(KV, {
      label: "Pending",
      value: fmtRs(s.pending),
      color: "var(--amber-600)"
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Collection Trend",
      subtitle: "Received fees over the year"
    }, /*#__PURE__*/React.createElement(CollectionTrend, {
      data: DATA.monthly
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Recent Payments",
      subtitle: "Latest verified transactions",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        iconRight: /*#__PURE__*/React.createElement(Icon, {
          name: "chevronRight",
          size: 15
        })
      }, "View all"),
      padding: "none"
    }, /*#__PURE__*/React.createElement("div", null, DATA.transactions.slice(0, 5).map((t, i) => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: t.student,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, t.student), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)'
      }
    }, t.cls, " \xB7 ", t.method)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtRs(t.amount)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-faint)'
      }
    }, t.date))))))));
  }
  const Legend = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Dot, {
    c: "#a9d2ee",
    t: "Expected"
  }), /*#__PURE__*/React.createElement(Dot, {
    c: "#248dce",
    t: "Received"
  }));
  const Dot = ({
    c,
    t
  }) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: 3,
      background: c
    }
  }), t);
  const KV = ({
    label,
    value,
    color
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600,
      marginBottom: 2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-h4)',
      fontWeight: 800,
      color: color || 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value));

  /* ---------------- STUDENTS ---------------- */
  function Students() {
    const [q, setQ] = React.useState('');
    const rows = DATA.students.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.cls.toLowerCase().includes(q.toLowerCase()));
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        marginBottom: 18,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 320
      }
    }, /*#__PURE__*/React.createElement(Input, {
      value: q,
      onChange: e => setQ(e.target.value),
      placeholder: "Search students or class\u2026",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 16
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 160
      }
    }, /*#__PURE__*/React.createElement(Select, {
      placeholder: "All Classes",
      options: ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "plus",
        size: 16
      }),
      style: {
        marginLeft: 'auto'
      }
    }, "Add Student")), /*#__PURE__*/React.createElement(Card, {
      padding: "none"
    }, /*#__PURE__*/React.createElement("table", {
      style: {
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--fs-sm)'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
      style: {
        background: 'var(--slate-50)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, ['Student', 'Class', 'Monthly Fee', 'Status', 'Fee Status', 'Parent WhatsApp', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
      key: i,
      style: {
        textAlign: i === 2 ? 'right' : 'left',
        padding: '12px 18px',
        fontSize: 'var(--fs-xs)',
        fontWeight: 700,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        whiteSpace: 'nowrap'
      }
    }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((s, i) => /*#__PURE__*/React.createElement("tr", {
      key: s.id,
      style: {
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--slate-50)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: s.name,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-mono)'
      }
    }, s.id)))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px',
        color: 'var(--text-secondary)'
      }
    }, s.cls), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px',
        textAlign: 'right',
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtRs(s.fee)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px'
      }
    }, s.status === 'Active' ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Active") : /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral",
      dot: true
    }, "Inactive")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px'
      }
    }, feeBadge(s.feeStatus)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-xs)'
      }
    }, s.wa), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '11px 18px',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(IconBtn, {
      name: "eye"
    }), /*#__PURE__*/React.createElement(IconBtn, {
      name: "edit"
    }))))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 18px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--slate-50)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)'
      }
    }, "Showing ", rows.length, " of 1,284 students", /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary"
    }, "Previous"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary"
    }, "Next")))));
  }
  const IconBtn = ({
    name
  }) => /*#__PURE__*/React.createElement("button", {
    style: {
      width: 30,
      height: 30,
      display: 'grid',
      placeItems: 'center',
      border: '1px solid var(--border-subtle)',
      background: '#fff',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: 15
  }));

  /* ---------------- FEE COLLECTION ---------------- */
  function FeeCollection() {
    const [drag, setDrag] = React.useState(false);
    const [uploaded, setUploaded] = React.useState(false);
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Upload Payment Screenshot",
      subtitle: "We auto-detect transaction details with OCR"
    }, /*#__PURE__*/React.createElement("div", {
      onDragOver: e => {
        e.preventDefault();
        setDrag(true);
      },
      onDragLeave: () => setDrag(false),
      onDrop: e => {
        e.preventDefault();
        setDrag(false);
        setUploaded(true);
      },
      onClick: () => setUploaded(true),
      style: {
        border: `2px dashed ${drag ? 'var(--blue-500)' : 'var(--border-default)'}`,
        background: drag ? 'var(--blue-50)' : 'var(--slate-50)',
        borderRadius: 'var(--radius-lg)',
        padding: '34px 20px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all var(--dur-base)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        margin: '0 auto 12px',
        borderRadius: '50%',
        background: 'var(--blue-100)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--blue-600)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: uploaded ? 'check' : 'upload',
      size: 24
    })), uploaded ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, "jazzcash_receipt.png"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--green-600)',
        marginTop: 4,
        fontWeight: 600
      }
    }, "Uploaded \xB7 OCR scan complete")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, "Drag & drop a screenshot here"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)',
        marginTop: 4
      }
    }, "or click to browse \xB7 PNG, JPG up to 10MB"))), uploaded && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        padding: 14,
        borderRadius: 'var(--radius-md)',
        background: 'var(--blue-50)',
        border: '1px solid var(--blue-100)',
        display: 'flex',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--blue-600)',
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-sm)',
        color: 'var(--blue-800)'
      }
    }, /*#__PURE__*/React.createElement("b", null, "OCR detected:"), " Transaction TXN-3B81D2 \xB7 Rs 4,000 \xB7 11 Jul 2025 \xB7 JazzCash. Review and confirm below."))), /*#__PURE__*/React.createElement(Card, {
      title: "Record Payment",
      subtitle: "Confirm the detected details",
      footer: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        fullWidth: true,
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "checkSmall",
          size: 16
        })
      }, "Confirm Payment"), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary"
      }, "Cancel"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Student",
      placeholder: "Select student",
      options: DATA.students.map(s => s.name)
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Transaction ID",
      defaultValue: uploaded ? 'TXN-3B81D2' : '',
      placeholder: "TXN-\u2026"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Amount Received",
      defaultValue: uploaded ? '4000' : '',
      iconLeft: /*#__PURE__*/React.createElement("span", {
        style: {
          fontWeight: 700
        }
      }, "\u20A8")
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Select, {
      label: "Fee Month",
      options: ['July 2025', 'August 2025', 'September 2025']
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Payment Date",
      defaultValue: uploaded ? '11 Jul 2025' : '',
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar",
        size: 15
      })
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'block',
        marginBottom: 6,
        fontSize: 'var(--fs-sm)',
        fontWeight: 600,
        color: 'var(--text-secondary)'
      }
    }, "Payment Status"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Verified"), /*#__PURE__*/React.createElement(Badge, {
      variant: "warning",
      dot: true
    }, "Pending")))))));
  }

  /* ---------------- REPORTS ---------------- */
  function Reports() {
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 10,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement(Select, {
      fullWidth: false,
      options: ['Monthly Report', 'Yearly Report'],
      style: {
        width: 180
      }
    }), /*#__PURE__*/React.createElement(Select, {
      fullWidth: false,
      options: ['2025', '2024', '2023'],
      style: {
        width: 120
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "fileText",
        size: 16
      }),
      style: {
        marginLeft: 'auto'
      }
    }, "Export PDF"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "spreadsheet",
        size: 16
      })
    }, "Export Excel")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Yearly Revenue",
      subtitle: "Total fee revenue (Rs, millions)"
    }, /*#__PURE__*/React.createElement(YearlyRevenue, {
      data: DATA.yearly
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Top Performing Months",
      padding: "md"
    }, [['September', 97], ['August', 96], ['November', 95]].map(([m, v]) => /*#__PURE__*/React.createElement(MonthRow, {
      key: m,
      m: m,
      v: v,
      variant: "success"
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Lowest Collection Months",
      padding: "md"
    }, [['July', 82], ['June', 88], ['March', 86]].map(([m, v]) => /*#__PURE__*/React.createElement(MonthRow, {
      key: m,
      m: m,
      v: v,
      variant: "warning"
    }))))), /*#__PURE__*/React.createElement(Card, {
      title: "Collection Analytics",
      subtitle: "Expected vs received \u2014 full year"
    }, /*#__PURE__*/React.createElement(ExpectedVsReceived, {
      data: DATA.monthly,
      height: 260
    })));
  }
  const MonthRow = ({
    m,
    v,
    variant
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 84,
      fontSize: 'var(--fs-sm)',
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, m), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: v,
    variant: variant,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      textAlign: 'right',
      fontSize: 'var(--fs-sm)',
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, v, "%"));

  /* ---------------- REMINDERS ---------------- */
  function Reminders() {
    const [sent, setSent] = React.useState({});
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Pending Fee Students",
      subtitle: `${DATA.pending.length} parents to remind`,
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "whatsapp",
        size: "sm",
        iconLeft: /*#__PURE__*/React.createElement(WhatsAppIcon, {
          size: 15,
          color: "#fff"
        }),
        onClick: () => setSent(Object.fromEntries(DATA.pending.map(p => [p.id, true])))
      }, "Send to All"),
      padding: "none"
    }, DATA.pending.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: s.name,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)'
      }
    }, s.cls, " \xB7 ", s.wa)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 700,
        color: 'var(--amber-600)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtRs(s.fee)), sent[s.id] ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Sent") : /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      size: "sm",
      iconLeft: /*#__PURE__*/React.createElement(WhatsAppIcon, {
        size: 14,
        color: "#fff"
      }),
      onClick: () => setSent(p => ({
        ...p,
        [s.id]: true
      }))
    }, "Remind"))))), /*#__PURE__*/React.createElement(Card, {
      title: "Reminder History",
      subtitle: "Recent activity",
      padding: "none"
    }, DATA.reminders.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: 'var(--green-50)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--whatsapp-dark)'
      }
    }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
      size: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-sm)',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)'
      }
    }, fmtRs(r.amount), " \xB7 ", r.sent)), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto'
      }
    }, r.status === 'Failed' ? /*#__PURE__*/React.createElement(Badge, {
      variant: "danger"
    }, "Failed") : /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral"
    }, r.status)))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 16,
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--slate-50)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 14
    }), " Automated reminders run every Monday at 9:00 AM"))));
  }

  /* ---------------- RECEIPT ---------------- */
  function Receipt() {
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 16,
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        maxWidth: 560
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--navy-900)',
        padding: '22px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-horizontal-white.svg",
      alt: "Al Rehman Academy",
      style: {
        height: 46
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        color: 'rgba(255,255,255,0.85)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 15,
        color: '#fff'
      }
    }, "FEE RECEIPT"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontFamily: 'var(--font-mono)'
      }
    }, "ARA-2025-00842"))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 28
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        marginBottom: 22
      }
    }, /*#__PURE__*/React.createElement(RField, {
      label: "Student Name",
      value: "Ahmed Raza"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Class",
      value: "Class 9-A"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Receipt Date",
      value: "12 Jul 2025"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Fee Month",
      value: "July 2025"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Transaction ID",
      value: "TXN-9F2A7C",
      mono: true
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Payment Method",
      value: "Bank Transfer"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px dashed var(--border-default)',
        paddingTop: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 0',
        color: 'var(--text-secondary)',
        fontSize: 'var(--fs-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "Monthly Tuition Fee"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, "\u20A8 3,500.00")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 16px',
        marginTop: 8,
        background: 'var(--green-50)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--green-100)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: 'var(--green-700)'
      }
    }, "Amount Paid"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 22,
        color: 'var(--green-700)',
        fontFamily: 'var(--font-mono)'
      }
    }, "\u20A8 3,500.00"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Paid \xB7 Verified"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-faint)'
      }
    }, "Computer-generated receipt \xB7 Al Rehman Academy")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 10,
        width: 200
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 16
      })
    }, "Download PDF"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "print",
        size: 16
      })
    }, "Print"), /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      iconLeft: /*#__PURE__*/React.createElement(WhatsAppIcon, {
        size: 15,
        color: "#fff"
      })
    }, "Send to Parent"))));
  }
  const RField = ({
    label,
    value,
    mono
  }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-muted)',
      fontWeight: 600,
      marginBottom: 3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-body)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontFamily: mono ? 'var(--font-mono)' : 'inherit'
    }
  }, value));

  /* ---------------- SETTINGS (light) ---------------- */
  function Settings() {
    return /*#__PURE__*/React.createElement(PageWrap, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Academy Information"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Academy Name",
      defaultValue: "Al Rehman Academy"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Contact Email",
      defaultValue: "admin@alrehman.edu.pk"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Phone",
      defaultValue: "+92 42 35551234",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "phone",
        size: 15
      })
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Academy Logo"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 96,
        height: 96,
        borderRadius: 'var(--radius-lg)',
        background: 'var(--slate-50)',
        border: '1px solid var(--border-subtle)',
        display: 'grid',
        placeItems: 'center',
        padding: 12
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.svg",
      alt: "",
      style: {
        maxHeight: '100%'
      }
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "upload",
        size: 16
      })
    }, "Upload new logo"))), /*#__PURE__*/React.createElement(Card, {
      title: "WhatsApp Integration",
      subtitle: "Reminder delivery"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: 14,
        background: 'var(--green-50)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--green-100)'
      }
    }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
      size: 22,
      color: "var(--whatsapp-dark)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-sm)'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--green-700)'
      }
    }, "Connected"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--fs-xs)'
      }
    }, "Business API \xB7 +92 300 1112233")), /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true,
      style: {
        marginLeft: 'auto'
      }
    }, "Active"))), /*#__PURE__*/React.createElement(Card, {
      title: "Payment Methods"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, ['Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cash'].map(m => /*#__PURE__*/React.createElement(Badge, {
      key: m,
      variant: "brand"
    }, m))))));
  }
  window.SCREENS = {
    dashboard: Dashboard,
    students: Students,
    fees: FeeCollection,
    reports: Reports,
    reminders: Reminders,
    receipts: Receipt,
    settings: Settings
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager/screens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager/shell.jsx
try { (() => {
/* Al Rehman Fee Manager UI Kit — app shell (Sidebar + Topbar). */
(function () {
  const {
    Avatar,
    Badge
  } = window.AlRehmanFeeManagerDesignSystem_ad9d9e;
  const Icon = window.Icon;
  const NAV = [{
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard'
  }, {
    key: 'students',
    label: 'Students',
    icon: 'users'
  }, {
    key: 'fees',
    label: 'Fee Collection',
    icon: 'wallet'
  }, {
    key: 'reports',
    label: 'Reports',
    icon: 'report'
  }, {
    key: 'reminders',
    label: 'WhatsApp Reminders',
    icon: 'phone'
  }, {
    key: 'receipts',
    label: 'Receipts',
    icon: 'receipt'
  }, {
    key: 'settings',
    label: 'Settings',
    icon: 'settings'
  }];
  function Sidebar({
    active,
    onNavigate
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 'var(--sidebar-width)',
        flex: 'none',
        background: 'var(--color-sidebar)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '20px 20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark-white.svg",
      alt: "",
      style: {
        height: 36
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: '#fff',
        fontWeight: 800,
        fontSize: 15,
        letterSpacing: '-0.01em'
      }
    }, "Al Rehman"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-on-dark-muted)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }
    }, "Fee Manager"))), /*#__PURE__*/React.createElement("nav", {
      style: {
        padding: '8px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1
      }
    }, NAV.map(n => {
      const on = active === n.key;
      return /*#__PURE__*/React.createElement("button", {
        key: n.key,
        onClick: () => onNavigate(n.key),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 12px',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          background: on ? 'var(--color-sidebar-active)' : 'transparent',
          color: on ? '#fff' : 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--fs-sm)',
          fontWeight: on ? 700 : 600,
          textAlign: 'left',
          transition: 'background var(--dur-fast), color var(--dur-fast)',
          boxShadow: on ? '0 4px 12px rgba(36,141,206,0.35)' : 'none'
        },
        onMouseEnter: e => {
          if (!on) {
            e.currentTarget.style.background = 'var(--color-sidebar-hover)';
            e.currentTarget.style.color = '#fff';
          }
        },
        onMouseLeave: e => {
          if (!on) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-on-dark-muted)';
          }
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: n.icon,
        size: 19
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          whiteSpace: 'nowrap'
        }
      }, n.label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        margin: 12,
        padding: 14,
        borderRadius: 'var(--radius-lg)',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Imran Saleem",
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: '#fff',
        fontSize: 13,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, "Imran Saleem"), /*#__PURE__*/React.createElement("div", {
      style: {
        color: 'var(--text-on-dark-muted)',
        fontSize: 11
      }
    }, "Administrator")), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto',
        color: 'var(--text-on-dark-muted)',
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "logout",
      size: 16
    })))));
  }
  function Topbar({
    title,
    subtitle,
    action
  }) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        height: 'var(--topbar-height)',
        flex: 'none',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '0 28px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--fs-h3)',
        fontWeight: 800,
        color: 'var(--text-strong)',
        letterSpacing: '-0.01em',
        margin: 0
      }
    }, title), subtitle && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '1px 0 0',
        fontSize: 'var(--fs-xs)',
        color: 'var(--text-muted)'
      }
    }, subtitle)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 38,
        padding: '0 12px',
        background: 'var(--slate-50)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        width: 240
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16,
      color: "var(--text-faint)"
    }), /*#__PURE__*/React.createElement("input", {
      placeholder: "Search\u2026",
      style: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        fontSize: 'var(--fs-sm)',
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-primary)',
        width: '100%'
      }
    })), /*#__PURE__*/React.createElement("button", {
      style: {
        position: 'relative',
        width: 38,
        height: 38,
        display: 'grid',
        placeItems: 'center',
        background: 'var(--color-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 7,
        right: 8,
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--red-500)',
        border: '1.5px solid #fff'
      }
    })), action));
  }
  Object.assign(window, {
    Sidebar,
    Topbar,
    NAV
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager_android/android-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// Android.jsx — Simplified Android (Material 3) device frame
// Status bar + top app bar + content + gesture nav + keyboard.
// Based on Figma M3 spec. No dependencies, no image assets.
// Exports (to window): AndroidDevice, AndroidStatusBar, AndroidAppBar, AndroidListItem, AndroidNavBar, AndroidKeyboard
//
// Usage — wrap your screen content in <AndroidDevice> to get the bezel, status
// bar and gesture nav (props: title, large, keyboard, dark):
//
//   <AndroidDevice title="Inbox" large>
//     ...your screen content...
//   </AndroidDevice>
//   <AndroidDevice title="Compose" keyboard>…</AndroidDevice>
/* END USAGE */

const MD_C = {
  surface: '#f4fbf8',
  surfaceVariant: '#dae5e1',
  inverseOnSurface: '#ecf2ef',
  secondaryContainer: '#cde8e1',
  primaryFixedDim: '#83d5c6',
  onSurface: '#171d1b',
  onSurfaceVar: '#49454f',
  onPrimaryContainer: '#00201c',
  primary: '#006a60',
  frameBorder: 'rgba(116,119,117,0.5)'
};

// ─────────────────────────────────────────────────────────────
// Status bar (time left, wifi/cell/battery right)
// ─────────────────────────────────────────────────────────────
function AndroidStatusBar({
  dark = false
}) {
  const c = dark ? '#fff' : MD_C.onSurface;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      position: 'relative',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 128,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 0.25,
      lineHeight: '20px',
      color: c
    }
  }, "9:30")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: 8,
      transform: 'translateX(-50%)',
      width: 24,
      height: 24,
      borderRadius: 100,
      background: '#2e2e2e'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      paddingRight: 2
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8 13.3L.67 5.97a10.37 10.37 0 0114.66 0L8 13.3z",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    style: {
      marginRight: -2
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.67 14.67V1.33L1.33 14.67h13.34z",
    fill: c
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.75",
    y: "2",
    width: "8.5",
    height: "13",
    rx: "1.5",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "5.5",
    y: "0.9",
    width: "5",
    height: "2",
    rx: "0.5",
    fill: c
  }))));
}

// ─────────────────────────────────────────────────────────────
// Top app bar (Material 3 small/medium)
// ─────────────────────────────────────────────────────────────
function AndroidAppBar({
  title = 'Title',
  large = false
}) {
  const iconDot = /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: MD_C.onSurfaceVar,
      opacity: 0.3
    }
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.surface,
      padding: '4px 4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, iconDot, !large && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 22,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title), large && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), iconDot), large && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 20px',
      fontSize: 28,
      fontWeight: 400,
      color: MD_C.onSurface,
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// List item (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidListItem({
  headline,
  supporting,
  leading
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '12px 16px',
      minHeight: 56,
      boxSizing: 'border-box',
      fontFamily: 'Roboto, system-ui, sans-serif'
    }
  }, leading && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: MD_C.primary,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: 500,
      flexShrink: 0
    }
  }, leading), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: MD_C.onSurface,
      lineHeight: '24px'
    }
  }, headline), supporting && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: MD_C.onSurfaceVar,
      lineHeight: '20px'
    }
  }, supporting)));
}

// ─────────────────────────────────────────────────────────────
// Gesture nav bar (pill)
// ─────────────────────────────────────────────────────────────
function AndroidNavBar({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 108,
      height: 4,
      borderRadius: 2,
      background: dark ? '#fff' : MD_C.onSurface,
      opacity: 0.4
    }
  }));
}

// ─────────────────────────────────────────────────────────────
// Device frame — wraps everything
// ─────────────────────────────────────────────────────────────
function AndroidDevice({
  children,
  width = 412,
  height = 892,
  dark = false,
  title,
  large = false,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 18,
      overflow: 'hidden',
      background: dark ? '#1d1b20' : MD_C.surface,
      border: `8px solid ${MD_C.frameBorder}`,
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement(AndroidStatusBar, {
    dark: dark
  }), title !== undefined && /*#__PURE__*/React.createElement(AndroidAppBar, {
    title: title,
    large: large
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(AndroidKeyboard, null), /*#__PURE__*/React.createElement(AndroidNavBar, {
    dark: dark
  }));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — Gboard (Material 3)
// ─────────────────────────────────────────────────────────────
function AndroidKeyboard() {
  let _k = 0;
  const key = (l, {
    flex = 1,
    bg = MD_C.surface,
    r = 6,
    minW,
    fs = 21
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: _k++,
    style: {
      height: 46,
      borderRadius: r,
      flex,
      minWidth: minW,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto, system-ui',
      fontSize: fs,
      color: MD_C.onPrimaryContainer
    }
  }, l);
  const row = (keys, style = {}) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      ...style
    }
  }, keys.map(l => key(l)));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: MD_C.inverseOnSurface,
      padding: '0 8px 8px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], {
    padding: '0 20px'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('', {
    bg: MD_C.surfaceVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flex: 7,
      minWidth: 274
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l))), key('', {
    bg: MD_C.surfaceVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, key('?123', {
    bg: MD_C.secondaryContainer,
    r: 100,
    minW: 58,
    fs: 14
  }), key(',', {
    bg: MD_C.surfaceVariant
  }), key('', {
    flex: 3,
    minW: 154
  }), key('.', {
    bg: MD_C.surfaceVariant
  }), key('', {
    bg: MD_C.primaryFixedDim,
    r: 100,
    minW: 58
  }))));
}
Object.assign(window, {
  AndroidDevice,
  AndroidStatusBar,
  AndroidAppBar,
  AndroidListItem,
  AndroidNavBar,
  AndroidKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager_android/android-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager_mobile/ios-frame.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// iOS.jsx — Simplified iOS 26 (Liquid Glass) device frame
// Based on the iOS 26 UI Kit + Figma status bar spec. No assets, no deps.
// Exports (to window): IOSDevice, IOSStatusBar, IOSNavBar, IOSGlassPill, IOSList, IOSListRow, IOSKeyboard
//
// Usage — wrap your screen content in <IOSDevice> to get the bezel, status bar
// and home indicator (props: title, dark, keyboard):
//
//   <IOSDevice title="Settings">
//     ...your screen content...
//   </IOSDevice>
//   <IOSDevice dark title="Search" keyboard>…</IOSDevice>
/* END USAGE */

// ─────────────────────────────────────────────────────────────
// Status bar
// ─────────────────────────────────────────────────────────────
function IOSStatusBar({
  dark = false,
  time = '9:41'
}) {
  const c = dark ? '#fff' : '#000';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 154,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '21px 24px 19px',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 20,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: '-apple-system, "SF Pro", system-ui',
      fontWeight: 590,
      fontSize: 17,
      lineHeight: '22px',
      color: c
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 22,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
      paddingTop: 1,
      paddingRight: 1
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "19",
    height: "12",
    viewBox: "0 0 19 12"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7.5",
    width: "3.2",
    height: "4.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.8",
    y: "5",
    width: "3.2",
    height: "7",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "9.6",
    y: "2.5",
    width: "3.2",
    height: "9.5",
    rx: "0.7",
    fill: c
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14.4",
    y: "0",
    width: "3.2",
    height: "12",
    rx: "0.7",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "12",
    viewBox: "0 0 17 12"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z",
    fill: c
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "10.5",
    r: "1.5",
    fill: c
  })), /*#__PURE__*/React.createElement("svg", {
    width: "27",
    height: "13",
    viewBox: "0 0 27 13"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "23",
    height: "12",
    rx: "3.5",
    stroke: c,
    strokeOpacity: "0.35",
    fill: "none"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "9",
    rx: "2",
    fill: c
  }), /*#__PURE__*/React.createElement("path", {
    d: "M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z",
    fill: c,
    fillOpacity: "0.4"
  }))));
}

// ─────────────────────────────────────────────────────────────
// Liquid glass pill — blur + tint + shine
// ─────────────────────────────────────────────────────────────
function IOSGlassPill({
  children,
  dark = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      minWidth: 44,
      borderRadius: 9999,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: dark ? '0 2px 6px rgba(0,0,0,0.35), 0 6px 16px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.07), 0 3px 10px rgba(0,0,0,0.06)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.28)' : 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 9999,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15), inset -1px -1px 1px rgba(255,255,255,0.08)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      padding: '0 4px'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Navigation bar — glass pills + large title
// ─────────────────────────────────────────────────────────────
function IOSNavBar({
  title = 'Title',
  dark = false,
  trailingIcon = true
}) {
  const muted = dark ? 'rgba(255,255,255,0.6)' : '#404040';
  const text = dark ? '#fff' : '#000';
  const pillIcon = content => /*#__PURE__*/React.createElement(IOSGlassPill, {
    dark: dark
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, content));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      paddingTop: 62,
      paddingBottom: 10,
      position: 'relative',
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px'
    }
  }, pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "20",
    viewBox: "0 0 12 20",
    fill: "none",
    style: {
      marginLeft: -1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2L2 10l8 8",
    stroke: muted,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), trailingIcon && pillIcon(/*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "6",
    viewBox: "0 0 22 6"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "3",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "3",
    r: "2.5",
    fill: muted
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "3",
    r: "2.5",
    fill: muted
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 16px',
      fontFamily: '-apple-system, system-ui',
      fontSize: 34,
      fontWeight: 700,
      lineHeight: '41px',
      color: text,
      letterSpacing: 0.4
    }
  }, title));
}

// ─────────────────────────────────────────────────────────────
// Grouped list (inset card, r:26) + row (52px)
// ─────────────────────────────────────────────────────────────
function IOSListRow({
  title,
  detail,
  icon,
  chevron = true,
  isLast = false,
  dark = false
}) {
  const text = dark ? '#fff' : '#000';
  const sec = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const ter = dark ? 'rgba(235,235,245,0.3)' : 'rgba(60,60,67,0.3)';
  const sep = dark ? 'rgba(84,84,88,0.65)' : 'rgba(60,60,67,0.12)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 52,
      padding: '0 16px',
      position: 'relative',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      letterSpacing: -0.43
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 7,
      background: icon,
      marginRight: 12,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      color: text
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sec,
      marginRight: 6
    }
  }, detail), chevron && /*#__PURE__*/React.createElement("svg", {
    width: "8",
    height: "14",
    viewBox: "0 0 8 14",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 1l6 6-6 6",
    stroke: ter,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: icon ? 58 : 16,
      height: 0.5,
      background: sep
    }
  }));
}
function IOSList({
  header,
  children,
  dark = false
}) {
  const hc = dark ? 'rgba(235,235,245,0.6)' : 'rgba(60,60,67,0.6)';
  const bg = dark ? '#1C1C1E' : '#fff';
  return /*#__PURE__*/React.createElement("div", null, header && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: '-apple-system, system-ui',
      fontSize: 13,
      color: hc,
      textTransform: 'uppercase',
      padding: '8px 36px 6px',
      letterSpacing: -0.08
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 26,
      margin: '0 16px',
      overflow: 'hidden'
    }
  }, children));
}

// ─────────────────────────────────────────────────────────────
// Device frame
// ─────────────────────────────────────────────────────────────
function IOSDevice({
  children,
  width = 402,
  height = 874,
  dark = false,
  title,
  keyboard = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      borderRadius: 48,
      overflow: 'hidden',
      position: 'relative',
      background: dark ? '#000' : '#F2F2F7',
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 126,
      height: 37,
      borderRadius: 24,
      background: '#000',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement(IOSStatusBar, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }
  }, title !== undefined && /*#__PURE__*/React.createElement(IOSNavBar, {
    title: title,
    dark: dark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto'
    }
  }, children), keyboard && /*#__PURE__*/React.createElement(IOSKeyboard, {
    dark: dark
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 60,
      height: 34,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 8,
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 139,
      height: 5,
      borderRadius: 100,
      background: dark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)'
    }
  })));
}

// ─────────────────────────────────────────────────────────────
// Keyboard — iOS 26 liquid glass
// ─────────────────────────────────────────────────────────────
function IOSKeyboard({
  dark = false
}) {
  const glyph = dark ? 'rgba(255,255,255,0.7)' : '#595959';
  const sugg = dark ? 'rgba(255,255,255,0.6)' : '#333';
  const keyBg = dark ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.85)';

  // special-key icons
  const icons = {
    shift: /*#__PURE__*/React.createElement("svg", {
      width: "19",
      height: "17",
      viewBox: "0 0 19 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9.5 1L1 9.5h4.5V16h8V9.5H18L9.5 1z",
      fill: glyph
    })),
    del: /*#__PURE__*/React.createElement("svg", {
      width: "23",
      height: "17",
      viewBox: "0 0 23 17"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M7 1h13a2 2 0 012 2v11a2 2 0 01-2 2H7l-6-7.5L7 1z",
      fill: "none",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10 5l7 7M17 5l-7 7",
      stroke: glyph,
      strokeWidth: "1.6",
      strokeLinecap: "round"
    })),
    ret: /*#__PURE__*/React.createElement("svg", {
      width: "20",
      height: "14",
      viewBox: "0 0 20 14"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 1v6H4m0 0l4-4M4 7l4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))
  };
  const key = (content, {
    w,
    flex,
    ret,
    fs = 25,
    k
  } = {}) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      height: 42,
      borderRadius: 8.5,
      flex: flex ? 1 : undefined,
      width: w,
      minWidth: 0,
      background: ret ? '#08f' : keyBg,
      boxShadow: '0 1px 0 rgba(0,0,0,0.075)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, "SF Compact", system-ui',
      fontSize: fs,
      fontWeight: 458,
      color: ret ? '#fff' : glyph
    }
  }, content);
  const row = (keys, pad = 0) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      justifyContent: 'center',
      padding: `0 ${pad}px`
    }
  }, keys.map(l => key(l, {
    flex: true,
    k: l
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 15,
      borderRadius: 27,
      overflow: 'hidden',
      padding: '11px 0 2px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: dark ? '0 -2px 20px rgba(0,0,0,0.09)' : '0 -1px 6px rgba(0,0,0,0.018), 0 -3px 20px rgba(0,0,0,0.012)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      backdropFilter: 'blur(12px) saturate(180%)',
      WebkitBackdropFilter: 'blur(12px) saturate(180%)',
      background: dark ? 'rgba(120,120,128,0.14)' : 'rgba(255,255,255,0.25)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      borderRadius: 27,
      boxShadow: dark ? 'inset 1.5px 1.5px 1px rgba(255,255,255,0.15)' : 'inset 1.5px 1.5px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4)',
      border: dark ? '0.5px solid rgba(255,255,255,0.15)' : '0.5px solid rgba(0,0,0,0.06)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      padding: '8px 22px 13px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, ['"The"', 'the', 'to'].map((w, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 25,
      background: '#ccc',
      opacity: 0.3
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: '-apple-system, system-ui',
      fontSize: 17,
      color: sugg,
      letterSpacing: -0.43,
      lineHeight: '22px'
    }
  }, w)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      padding: '0 6.5px',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative'
    }
  }, row(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']), row(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], 20), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14.25,
      alignItems: 'center'
    }
  }, key(icons.shift, {
    w: 45,
    k: 'shift'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6.5,
      flex: 1
    }
  }, ['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(l => key(l, {
    flex: true,
    k: l
  }))), key(icons.del, {
    w: 45,
    k: 'del'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, key('ABC', {
    w: 92.25,
    fs: 18,
    k: 'abc'
  }), key('', {
    flex: true,
    k: 'space'
  }), key(icons.ret, {
    w: 92.25,
    ret: true,
    k: 'ret'
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      width: '100%',
      position: 'relative'
    }
  }));
}
Object.assign(window, {
  IOSDevice,
  IOSStatusBar,
  IOSNavBar,
  IOSGlassPill,
  IOSList,
  IOSListRow,
  IOSKeyboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager_mobile/ios-frame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fee_manager_mobile/mobile.jsx
try { (() => {
/* Al Rehman Fee Manager — Mobile screens (composed into the iOS frame). */
(function () {
  const NS = window.AlRehmanFeeManagerDesignSystem_ad9d9e;
  const {
    Badge,
    Avatar,
    Button,
    ProgressBar
  } = NS;
  const {
    Icon,
    WhatsAppIcon,
    DATA,
    fmtRs,
    DonutGauge,
    CollectionTrend
  } = window;
  const STATUS_TOP = 56; // clear the status bar / dynamic island (iOS default; overridable per-platform)
  const feeBadge = s => s === 'Paid' ? /*#__PURE__*/React.createElement(Badge, {
    variant: "success",
    dot: true
  }, "Paid") : s === 'Pending' ? /*#__PURE__*/React.createElement(Badge, {
    variant: "warning",
    dot: true
  }, "Pending") : /*#__PURE__*/React.createElement(Badge, {
    variant: "danger",
    dot: true
  }, "Overdue");

  /* ---- shared chrome ---- */
  function AppHeader({
    title,
    subtitle,
    accent,
    onBack
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 'none',
        background: 'var(--navy-900)',
        color: '#fff',
        padding: `${window.MOBILE_STATUS_TOP ?? STATUS_TOP}px 18px 16px`,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, onBack ? /*#__PURE__*/React.createElement("button", {
      onClick: onBack,
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 18,
      style: {
        transform: 'scaleX(-1)'
      }
    })) : /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark-white.svg",
      alt: "",
      style: {
        height: 30
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        lineHeight: 1.1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 17,
        letterSpacing: '-0.01em'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-on-dark-muted)',
        fontWeight: 600
      }
    }, subtitle)), /*#__PURE__*/React.createElement("button", {
      style: {
        marginLeft: 'auto',
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        border: 'none',
        display: 'grid',
        placeItems: 'center',
        color: '#fff',
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 9,
        right: 10,
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: 'var(--red-500)',
        border: '1.5px solid var(--navy-900)'
      }
    }))), accent);
  }
  const Section = ({
    title,
    action,
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      margin: '0 4px 9px'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--text-strong)',
      margin: 0
    }
  }, title), action && /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontSize: 12.5,
      color: 'var(--text-link)',
      fontWeight: 600
    }
  }, action)), children);
  const Tile = ({
    children,
    style
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border-subtle)',
      borderRadius: 16,
      boxShadow: 'var(--shadow-sm)',
      padding: 16,
      ...style
    }
  }, children);
  const Scroll = ({
    children
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 14px 18px',
      background: 'var(--color-bg)'
    }
  }, children);

  /* ---- DASHBOARD ---- */
  function MDashboard() {
    const s = DATA.stats;
    const mini = [{
      label: 'Students',
      value: s.totalStudents.toLocaleString(),
      tone: 'brand',
      icon: 'users'
    }, {
      label: 'Collected',
      value: fmtRs(s.collected),
      tone: 'success',
      icon: 'wallet'
    }, {
      label: 'Pending',
      value: fmtRs(s.pending),
      tone: 'warning',
      icon: 'clock'
    }, {
      label: 'Expected',
      value: fmtRs(s.expected),
      tone: 'navy',
      icon: 'calendar'
    }];
    const tones = {
      brand: ['var(--blue-50)', 'var(--blue-600)'],
      success: ['var(--green-50)', 'var(--green-600)'],
      warning: ['var(--amber-50)', 'var(--amber-600)'],
      navy: ['var(--slate-100)', 'var(--navy-800)']
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Al Rehman",
      subtitle: "Dashboard \xB7 July 2025",
      accent: /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: 'rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: 14
        }
      }, /*#__PURE__*/React.createElement(DonutGauge, {
        value: s.rate,
        size: 78,
        stroke: 10,
        color: "#4ba0d9",
        track: "rgba(255,255,255,0.14)",
        label: ""
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: 'var(--text-on-dark-muted)',
          fontWeight: 600
        }
      }, "Collection rate"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 26,
          fontWeight: 800,
          letterSpacing: '-0.02em'
        }
      }, s.rate, "%"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: '#8fd0a8',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "trending",
        size: 13
      }), " 8.2% vs last month")))
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10,
        marginBottom: 18
      }
    }, mini.map(m => /*#__PURE__*/React.createElement(Tile, {
      key: m.label,
      style: {
        padding: 14
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 34,
        height: 34,
        borderRadius: 9,
        background: tones[m.tone][0],
        color: tones[m.tone][1],
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: m.icon,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-muted)',
        fontWeight: 600
      }
    }, m.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: 'var(--text-strong)',
        letterSpacing: '-0.01em',
        fontVariantNumeric: 'tabular-nums'
      }
    }, m.value)))), /*#__PURE__*/React.createElement(Section, {
      title: "Collection Trend"
    }, /*#__PURE__*/React.createElement(Tile, null, /*#__PURE__*/React.createElement(CollectionTrend, {
      data: DATA.monthly.slice(5),
      height: 150
    }))), /*#__PURE__*/React.createElement(Section, {
      title: "Recent Payments",
      action: "See all"
    }, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, DATA.transactions.slice(0, 4).map((t, i) => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '12px 14px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: t.student,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, t.student), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-muted)'
      }
    }, t.method, " \xB7 ", t.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        fontSize: 13.5,
        fontWeight: 700,
        color: 'var(--green-600)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtRs(t.amount))))))));
  }

  /* ---- STUDENTS ---- */
  function MStudents() {
    const [q, setQ] = React.useState('');
    const rows = DATA.students.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.cls.toLowerCase().includes(q.toLowerCase()));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Students",
      subtitle: `${DATA.students.length} shown · 1,284 total`,
      accent: /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '0 12px',
          height: 42
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 17,
        color: "rgba(255,255,255,0.6)"
      }), /*#__PURE__*/React.createElement("input", {
        value: q,
        onChange: e => setQ(e.target.value),
        placeholder: "Search students or class\u2026",
        style: {
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          color: '#fff',
          fontSize: 14,
          fontFamily: 'var(--font-sans)'
        }
      }))
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 10
      }
    }, rows.map(s => /*#__PURE__*/React.createElement(Tile, {
      key: s.id,
      style: {
        padding: 13
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: s.name,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, s.name), s.status === 'Active' ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      size: "sm",
      dot: true
    }, "Active") : /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral",
      size: "sm",
      dot: true
    }, "Inactive")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, s.cls, " \xB7 ", s.id))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 12,
        paddingTop: 12,
        borderTop: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text-faint)',
        fontWeight: 600
      }
    }, "Monthly fee"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtRs(s.fee))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, feeBadge(s.feeStatus), /*#__PURE__*/React.createElement("button", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 9,
        border: 'none',
        background: 'var(--green-50)',
        color: 'var(--whatsapp-dark)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
      size: 17
    })))))))));
  }

  /* ---- COLLECT (upload + OCR) ---- */
  function MCollect() {
    const [up, setUp] = React.useState(false);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Fee Collection",
      subtitle: "Record a payment"
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      onClick: () => setUp(true),
      style: {
        border: `2px dashed ${up ? 'var(--blue-500)' : 'var(--border-default)'}`,
        background: up ? 'var(--blue-50)' : '#fff',
        borderRadius: 16,
        padding: '30px 18px',
        textAlign: 'center',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        margin: '0 auto 12px',
        borderRadius: '50%',
        background: 'var(--blue-100)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--blue-600)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: up ? 'check' : 'scan',
      size: 26
    })), up ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontSize: 14.5
      }
    }, "jazzcash_receipt.png"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--green-600)',
        marginTop: 3,
        fontWeight: 600
      }
    }, "Uploaded \xB7 OCR scan complete")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontSize: 14.5
      }
    }, "Tap to upload screenshot"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 3
      }
    }, "Camera or gallery \xB7 we auto-detect details"))), up && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 9,
        padding: 13,
        borderRadius: 12,
        background: 'var(--blue-50)',
        border: '1px solid var(--blue-100)',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--blue-600)',
        marginTop: 1
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      size: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: 'var(--blue-800)',
        lineHeight: 1.4
      }
    }, /*#__PURE__*/React.createElement("b", null, "OCR detected:"), " TXN-3B81D2 \xB7 Rs 4,000 \xB7 11 Jul 2025 \xB7 JazzCash")), /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Student",
      value: "Usman Khan"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Transaction ID",
      value: up ? 'TXN-3B81D2' : '—',
      mono: true
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Amount",
      value: up ? '₨ 4,000' : '—'
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Fee Month",
      value: "July 2025"
    }), /*#__PURE__*/React.createElement(Field, {
      label: "Date",
      value: up ? '11 Jul 2025' : '—'
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true,
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "checkSmall",
        size: 17
      })
    }, "Confirm Payment")))));
  }
  const Field = ({
    label,
    value,
    mono
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--slate-50)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 10,
      padding: '9px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)',
      fontWeight: 600,
      marginBottom: 2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontFamily: mono ? 'var(--font-mono)' : 'inherit'
    }
  }, value));

  /* ---- REMINDERS ---- */
  function MReminders() {
    const [sent, setSent] = React.useState({});
    const allSent = () => setSent(Object.fromEntries(DATA.pending.map(p => [p.id, true])));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Reminders",
      subtitle: `${DATA.pending.length} parents to remind`,
      accent: /*#__PURE__*/React.createElement("button", {
        onClick: allSent,
        style: {
          marginTop: 14,
          width: '100%',
          height: 44,
          borderRadius: 12,
          border: 'none',
          background: 'var(--whatsapp)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 14.5,
          fontFamily: 'var(--font-sans)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8
        }
      }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
        size: 18,
        color: "#fff"
      }), " Send WhatsApp to All")
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Section, {
      title: "Pending Fees"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 10
      }
    }, DATA.pending.map(s => /*#__PURE__*/React.createElement(Tile, {
      key: s.id,
      style: {
        padding: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: s.name,
      size: "md"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--amber-600)',
        fontWeight: 600
      }
    }, fmtRs(s.fee), " pending")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto'
      }
    }, sent[s.id] ? /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Sent") : /*#__PURE__*/React.createElement("button", {
      onClick: () => setSent(p => ({
        ...p,
        [s.id]: true
      })),
      style: {
        height: 36,
        padding: '0 14px',
        borderRadius: 10,
        border: 'none',
        background: 'var(--whatsapp)',
        color: '#fff',
        fontWeight: 700,
        fontSize: 13,
        fontFamily: 'var(--font-sans)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
      size: 14,
      color: "#fff"
    }), " Remind")))))), /*#__PURE__*/React.createElement(Section, {
      title: "Reminder History"
    }, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, DATA.reminders.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '12px 14px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'var(--green-50)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--whatsapp-dark)'
      }
    }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
      size: 16
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-muted)'
      }
    }, fmtRs(r.amount), " \xB7 ", r.sent)), /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 'auto'
      }
    }, r.status === 'Failed' ? /*#__PURE__*/React.createElement(Badge, {
      variant: "danger",
      size: "sm"
    }, "Failed") : /*#__PURE__*/React.createElement(Badge, {
      variant: "neutral",
      size: "sm"
    }, r.status))))))));
  }

  /* ---- REPORTS ---- */
  function MReports({
    onBack
  }) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Reports",
      subtitle: "Analytics & exports",
      onBack: onBack,
      accent: /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 14,
          display: 'flex',
          gap: 9
        }
      }, /*#__PURE__*/React.createElement("button", {
        style: {
          flex: 1,
          height: 42,
          borderRadius: 11,
          border: 'none',
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "fileText",
        size: 16
      }), " Export PDF"), /*#__PURE__*/React.createElement("button", {
        style: {
          flex: 1,
          height: 42,
          borderRadius: 11,
          border: 'none',
          background: 'rgba(255,255,255,0.12)',
          color: '#fff',
          fontWeight: 700,
          fontSize: 13,
          fontFamily: 'var(--font-sans)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "spreadsheet",
        size: 16
      }), " Export Excel"))
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Section, {
      title: "Yearly Revenue"
    }, /*#__PURE__*/React.createElement(Tile, null, /*#__PURE__*/React.createElement(YearlyRevenue, {
      data: DATA.yearly,
      height: 170
    }))), /*#__PURE__*/React.createElement(Section, {
      title: "Top Performing Months"
    }, /*#__PURE__*/React.createElement(Tile, null, [['September', 97], ['August', 96], ['November', 95]].map(([m, v]) => /*#__PURE__*/React.createElement(MonthRow, {
      key: m,
      m: m,
      v: v,
      variant: "success"
    })))), /*#__PURE__*/React.createElement(Section, {
      title: "Lowest Collection Months"
    }, /*#__PURE__*/React.createElement(Tile, null, [['July', 82], ['June', 88], ['March', 86]].map(([m, v]) => /*#__PURE__*/React.createElement(MonthRow, {
      key: m,
      m: m,
      v: v,
      variant: "warning"
    })))), /*#__PURE__*/React.createElement(Section, {
      title: "Expected vs Received"
    }, /*#__PURE__*/React.createElement(Tile, null, /*#__PURE__*/React.createElement(ExpectedVsReceived, {
      data: DATA.monthly,
      height: 180
    })))));
  }
  const MonthRow = ({
    m,
    v,
    variant
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '7px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 74,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-secondary)'
    }
  }, m), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: v,
    variant: variant,
    size: "sm"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      textAlign: 'right',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, v, "%"));

  /* ---- RECEIPT ---- */
  function MReceipt({
    onBack
  }) {
    const RField = ({
      label,
      value,
      mono
    }) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text-muted)',
        fontWeight: 600,
        marginBottom: 2
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 600,
        color: 'var(--text-strong)',
        fontFamily: mono ? 'var(--font-mono)' : 'inherit'
      }
    }, value));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Receipt",
      subtitle: "ARA-2025-00842",
      onBack: onBack
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--navy-900)',
        padding: '16px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-horizontal-white.svg",
      alt: "Al Rehman Academy",
      style: {
        height: 34
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'right',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 800,
        fontSize: 12.5
      }
    }, "FEE RECEIPT"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontFamily: 'var(--font-mono)',
        color: 'rgba(255,255,255,0.8)'
      }
    }, "ARA-2025-00842"))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(RField, {
      label: "Student",
      value: "Ahmed Raza"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Class",
      value: "Class 9-A"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Date",
      value: "12 Jul 2025"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Fee Month",
      value: "July 2025"
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Transaction",
      value: "TXN-9F2A7C",
      mono: true
    }), /*#__PURE__*/React.createElement(RField, {
      label: "Method",
      value: "Bank Transfer"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 14px',
        background: 'var(--green-50)',
        borderRadius: 10,
        border: '1px solid var(--green-100)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: 'var(--green-700)',
        fontSize: 13.5
      }
    }, "Amount Paid"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 800,
        fontSize: 19,
        color: 'var(--green-700)',
        fontFamily: 'var(--font-mono)'
      }
    }, "\u20A8 3,500.00")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Paid \xB7 Verified")))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true,
      size: "lg",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "download",
        size: 17
      })
    }, "Download PDF"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "print",
        size: 16
      })
    }, "Print"), /*#__PURE__*/React.createElement(Button, {
      variant: "whatsapp",
      fullWidth: true,
      iconLeft: /*#__PURE__*/React.createElement(WhatsAppIcon, {
        size: 15,
        color: "#fff"
      })
    }, "Send")))));
  }

  /* ---- NOTIFICATIONS ---- */
  function MNotifications({
    onBack
  }) {
    const tone = {
      success: ['var(--green-50)', 'var(--green-600)', 'check'],
      warning: ['var(--amber-50)', 'var(--amber-600)', 'clock'],
      info: ['var(--blue-50)', 'var(--blue-600)', 'bell'],
      danger: ['var(--red-50)', 'var(--red-600)', 'alert']
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Notifications",
      subtitle: "Recent activity",
      onBack: onBack
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, DATA.notifications.map((n, i) => {
      const [bg, fg, ic] = tone[n.type];
      return /*#__PURE__*/React.createElement("div", {
        key: i,
        style: {
          display: 'flex',
          gap: 12,
          padding: '13px 14px',
          borderTop: i ? '1px solid var(--border-subtle)' : 'none'
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 34,
          height: 34,
          flex: 'none',
          borderRadius: '50%',
          background: bg,
          color: fg,
          display: 'grid',
          placeItems: 'center'
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: ic,
        size: 17
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13.5,
          fontWeight: 700,
          color: 'var(--text-strong)'
        }
      }, n.title), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12.5,
          color: 'var(--text-secondary)',
          marginTop: 1,
          lineHeight: 1.4
        }
      }, n.body), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: 'var(--text-faint)',
          marginTop: 3
        }
      }, n.time)));
    }))));
  }

  /* ---- SETTINGS ---- */
  function MSettings({
    onBack
  }) {
    const Row = ({
      icon,
      tone,
      title,
      detail
    }) => /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 14px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        flex: 'none',
        borderRadius: 9,
        background: tone[0],
        color: tone[1],
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, title), detail && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 1
      }
    }, detail)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 16,
      color: "var(--text-faint)"
    }));
    const Sep = () => /*#__PURE__*/React.createElement("div", {
      style: {
        height: 1,
        background: 'var(--border-subtle)',
        marginLeft: 60
      }
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Settings",
      subtitle: "Academy configuration",
      onBack: onBack
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 14,
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 13
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 13,
        background: 'var(--slate-50)',
        border: '1px solid var(--border-subtle)',
        display: 'grid',
        placeItems: 'center',
        padding: 8
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: "../../assets/logo-mark.svg",
      alt: "",
      style: {
        maxHeight: '100%'
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15.5,
        fontWeight: 800,
        color: 'var(--text-strong)'
      }
    }, "Al Rehman Academy"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, "admin@alrehman.edu.pk"))), /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement(Row, {
      icon: "settings",
      tone: ['var(--blue-50)', 'var(--blue-600)'],
      title: "Academy Information",
      detail: "Name, contact, address"
    }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Row, {
      icon: "image",
      tone: ['var(--slate-100)', 'var(--navy-800)'],
      title: "Logo",
      detail: "Upload academy logo"
    }), /*#__PURE__*/React.createElement(Sep, null), /*#__PURE__*/React.createElement(Row, {
      icon: "users",
      tone: ['var(--amber-50)', 'var(--amber-600)'],
      title: "User Roles & Permissions",
      detail: "3 staff accounts"
    })), /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '13px 14px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        flex: 'none',
        borderRadius: 9,
        background: 'var(--green-50)',
        color: 'var(--whatsapp-dark)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(WhatsAppIcon, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, "WhatsApp Integration"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, "+92 300 1112233")), /*#__PURE__*/React.createElement(Badge, {
      variant: "success",
      dot: true
    }, "Active"))), /*#__PURE__*/React.createElement(Section, {
      title: "Payment Methods"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8
      }
    }, ['Bank Transfer', 'JazzCash', 'EasyPaisa', 'Cash'].map(m => /*#__PURE__*/React.createElement(Badge, {
      key: m,
      variant: "brand"
    }, m))))));
  }

  /* ---- PARENT PORTAL ---- */
  function MParent({
    onBack
  }) {
    const history = [{
      month: 'July 2025',
      amount: 3500,
      date: '12 Jul 2025'
    }, {
      month: 'June 2025',
      amount: 3500,
      date: '09 Jun 2025'
    }, {
      month: 'May 2025',
      amount: 3500,
      date: '11 May 2025'
    }];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "Parent Portal",
      subtitle: "Ahmed Raza \xB7 Class 9-A",
      onBack: onBack,
      accent: /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 14,
          display: 'flex',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 13,
          padding: 13
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: 'var(--text-on-dark-muted)',
          fontWeight: 600
        }
      }, "Pending Dues"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 20,
          fontWeight: 800,
          marginTop: 2
        }
      }, "Rs 0")), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 13,
          padding: 13
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11.5,
          color: 'var(--text-on-dark-muted)',
          fontWeight: 600
        }
      }, "Next Due"), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 20,
          fontWeight: 800,
          marginTop: 2
        }
      }, "01 Aug")))
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: 13,
        borderRadius: 12,
        background: 'var(--green-50)',
        border: '1px solid var(--green-100)',
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 20,
      color: "var(--green-600)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--green-700)',
        fontWeight: 600
      }
    }, "All fees are up to date. Thank you!")), /*#__PURE__*/React.createElement(Section, {
      title: "Fee History"
    }, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, history.map((h, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        padding: '13px 14px',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        flex: 'none',
        borderRadius: 9,
        background: 'var(--green-50)',
        color: 'var(--green-600)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "receipt",
      size: 17
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, h.month), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: 'var(--text-muted)'
      }
    }, "Paid ", h.date)), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13.5,
        fontWeight: 700,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtRs(h.amount)), /*#__PURE__*/React.createElement("button", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        border: '1px solid var(--border-subtle)',
        background: '#fff',
        color: 'var(--text-muted)',
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 15
    })))))))));
  }

  /* ---- MORE MENU ---- */
  function MMore({
    onOpen
  }) {
    const items = [{
      key: 'reports',
      icon: 'report',
      tone: ['var(--blue-50)', 'var(--blue-600)'],
      title: 'Reports',
      detail: 'Analytics, PDF & Excel exports'
    }, {
      key: 'receipts',
      icon: 'receipt',
      tone: ['var(--green-50)', 'var(--green-600)'],
      title: 'Receipts',
      detail: 'Generate & share fee receipts'
    }, {
      key: 'notifications',
      icon: 'bell',
      tone: ['var(--amber-50)', 'var(--amber-600)'],
      title: 'Notifications',
      detail: 'Payments, reminders & alerts'
    }, {
      key: 'parent',
      icon: 'users',
      tone: ['#e6ddf7', '#5b3da8'],
      title: 'Parent Portal',
      detail: 'Fee history & receipts for parents'
    }, {
      key: 'settings',
      icon: 'settings',
      tone: ['var(--slate-100)', 'var(--navy-800)'],
      title: 'Settings',
      detail: 'Academy, logo, WhatsApp, roles'
    }];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppHeader, {
      title: "More",
      subtitle: "All features"
    }), /*#__PURE__*/React.createElement(Scroll, null, /*#__PURE__*/React.createElement(Tile, {
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, items.map((it, i) => /*#__PURE__*/React.createElement("button", {
      key: it.key,
      onClick: () => onOpen(it.key),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 14px',
        border: 'none',
        borderTop: i ? '1px solid var(--border-subtle)' : 'none',
        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        flex: 'none',
        borderRadius: 9,
        background: it.tone[0],
        color: it.tone[1],
        display: 'grid',
        placeItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        fontWeight: 700,
        color: 'var(--text-strong)'
      }
    }, it.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)',
        marginTop: 1
      }
    }, it.detail)), /*#__PURE__*/React.createElement(Icon, {
      name: "chevronRight",
      size: 17,
      color: "var(--text-faint)"
    }))))));
  }
  window.MOBILE_SCREENS = {
    dashboard: MDashboard,
    students: MStudents,
    collect: MCollect,
    reminders: MReminders
  };
  window.MOBILE_MORE = {
    reports: MReports,
    receipts: MReceipt,
    notifications: MNotifications,
    settings: MSettings,
    parent: MParent,
    more: MMore
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fee_manager_mobile/mobile.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

})();
