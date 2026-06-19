Dropdown for constrained choices — class, fee month, payment method, status filter.

```jsx
<Select label="Fee Month" placeholder="Select month"
  options={['January','February','March']} />
<Select label="Class" options={[{value:'7a',label:'Class 7-A'},{value:'7b',label:'Class 7-B'}]} />
```

Accepts plain strings or `{value,label}` objects. Same label/hint/error/size API as `Input`.
