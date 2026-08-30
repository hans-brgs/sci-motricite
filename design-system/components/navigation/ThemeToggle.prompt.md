Header theme switch. Set `data-theme="dark"` on the root in the handler.

```jsx
<ThemeToggle theme={t} onChange={(next) => { setT(next); document.documentElement.dataset.theme = next; }} />
```
