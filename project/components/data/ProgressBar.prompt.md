Collection / completion meter — fee collection %, target progress, per-class breakdowns.

```jsx
<ProgressBar value={82} variant="success" showLabel label="Collection rate" />
<ProgressBar value={3400} max={5000} variant="brand" size="sm" />
```

Color by meaning: `success` for healthy collection, `warning` mid, `danger` low. `showLabel` prints the percentage; `label` adds a left caption.
