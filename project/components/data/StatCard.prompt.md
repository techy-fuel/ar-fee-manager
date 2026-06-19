The hero KPI tile across the top of the dashboard — Total Students, Expected Fee, Collected, Pending, Collection %.

```jsx
<StatCard label="Collected Fee" value="Rs 3,42,000" tone="success"
  icon={<WalletIcon/>} delta="8.2%" deltaDirection="up" progress={82} />
<StatCard label="Pending Fee" value="Rs 74,500" tone="warning"
  icon={<ClockIcon/>} delta="3.1%" deltaDirection="down" />
```

`tone` tints the icon chip and default progress color. Pass `progress` (0–100) for the bottom meter — ideal for the Collection % card. Use `delta` + `deltaDirection` for the trend pill.
