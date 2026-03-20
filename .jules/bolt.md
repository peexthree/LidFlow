## 2026-03-20 - [Fix useMediaQuery performance with useSyncExternalStore]
**Learning:** Found a common performance anti-pattern in React codebase: `useMediaQuery` creating layout thrashing and unnecessary re-renders via `useState` + `useEffect` combo.
**Action:** Next time you see `window.matchMedia` subscriptions inside `useEffect`, refactor it to `useSyncExternalStore` to batch updates and prevent double re-renders on mount.
