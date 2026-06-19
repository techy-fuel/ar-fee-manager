Primary action control — use for any clickable command; reach for `whatsapp` variant in the reminder module and `danger` for destructive actions.

```jsx
<Button variant="primary" iconLeft={<PlusIcon/>}>Add Student</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="whatsapp" iconLeft={<WhatsAppIcon/>}>Send Reminder</Button>
```

Variants: `primary` (brand blue, default CTA), `secondary` (white, bordered), `ghost` (toolbar/inline), `subtle` (tinted blue), `danger` (delete), `whatsapp` (green reminder send). Sizes: `sm` / `md` / `lg`. Pass `loading` for an inline spinner, `fullWidth` for forms, `iconLeft` / `iconRight` for Lucide icons.
