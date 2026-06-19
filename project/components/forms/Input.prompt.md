Standard text field for all forms — student details, search, settings, login.

```jsx
<Input label="Monthly Fee" placeholder="3000" iconLeft={<RupeeIcon/>} />
<Input placeholder="Search students…" iconLeft={<SearchIcon/>} />
<Input label="Transaction ID" error="Already recorded" />
```

Pass `iconLeft` for a search/currency glyph. `error` turns the field red and replaces `hint`. Sizes `sm`/`md`/`lg`. Defaults to full width.
