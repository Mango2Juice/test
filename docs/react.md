# React Guidelines

This document defines the coding conventions and best practices for using React (with Next.js) in this project.
It explains the **how** at the framework level. For the **why**, see [Clean Code Principles](./clean-code.md).

---

## Cross-References

* **Consistency in Components** → see *Consistent Code*.
* **Pure & Intentional Rendering** → see *Intentional Code*.
* **Composition & Reusability** → see *Adaptable Code*.
* **Error Handling & Ethics** → see *Responsible Code*.

---

## Server Components by Default

* **Default to Server Components**: Better performance, less JavaScript sent to the client.
* **Use `'use client'`** only when:

  * Hooks are needed (`useState`, `useEffect`, `useReducer`).
  * Browser-only APIs (e.g. `localStorage`).
  * Event handlers (clicks, form inputs).

```tsx
// ❌ Bad — unnecessary client component
'use client'
export function Header() {
  return <h1>Hello</h1>
}

// ✅ Good — server component
export function Header() {
  return <h1>Hello</h1>
}
```

---

## Functional Components & Hooks

* **Never use class components.**
* **Hooks for state/effects:** `useState`, `useReducer`, `useEffect`, custom hooks.

```tsx
// ❌ Bad
class Counter extends React.Component<{ initial: number }, { count: number }> {
  state = { count: this.props.initial }
  render() {
    return <button>{this.state.count}</button>
  }
}

// ✅ Good
'use client'
export function Counter({ initial }: { initial: number }) {
  const [count, setCount] = useState(initial)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

---

## Data Fetching

* **In Server Components:** Fetch directly (no hooks needed).
* **In Client Components:** Use TanStack Query (`useQuery`) for fetching, caching, syncing.

```tsx
// ✅ Server Component
export default async function Page() {
  const data = await fetch('https://api.example.com/posts').then(r => r.json())
  return <Posts posts={data} />
}
```

---

## State Management

* **One-way data flow:** Props first, Context for shared state.
* **Never mutate state.** Always update immutably.

```tsx
// ❌ Bad
items.push(newItem)
setItems(items)

// ✅ Good
setItems(prev => [...prev, newItem])
```

---

## Next.js Specifics

* Use `<Image>` from `next/image` for optimization.
* Use **Server Actions** for mutations instead of writing extra API routes.
* Handle errors via `error.js` at the route segment level.

```tsx
// ✅ Server Action
'use server'
export async function savePost(data: FormData) {
  await db.post.create({ title: data.get('title') })
}
```

---

## Pure Components & `useEffect`

* **Render must be pure:** No side effects in the render body.
* **Side effects:** Only inside `useEffect` or event handlers.
* **Always list all dependencies.**
* **Cleanup properly.**

```tsx
// ❌ Bad — async directly in useEffect
useEffect(() => {
  const data = await fetchData()
  setData(data)
}, [])

// ✅ Good
useEffect(() => {
  async function load() {
    const data = await fetchData()
    setData(data)
  }
  load()
}, [fetchData])
```

---

## Rules of Hooks

* Call hooks only at the **top level** of a component or another hook.
* Never inside loops, conditions, or nested functions.

```tsx
// ❌ Bad
if (enabled) {
  const [count, setCount] = useState(0)
}

// ✅ Good
const [count, setCount] = useState(0)
```

---

## Refs

* Use `useRef` only for DOM nodes, non-reactive values, or third-party libs.
* Never store state in refs.

```tsx
// ❌ Bad
const countRef = useRef(0)
countRef.current++ // app state hidden from React

// ✅ Good
const inputRef = useRef<HTMLInputElement>(null)
<input ref={inputRef} />
```

---

## Composition & Small Components

* Break UI into small, reusable components.
* Extract repeated logic into **custom hooks**.

```tsx
// ❌ Bad — one giant form component
function CheckoutForm() { /* 500 lines */ }

// ✅ Good — composed components
function CheckoutForm() {
  return (
    <>
      <ShippingSection />
      <PaymentSection />
      <ConfirmButton />
    </>
  )
}
```

---

## Concurrency-Safe Code

* Assume React may render multiple times.
* Use functional updates to avoid race conditions.
* Always clean up subscriptions.

```tsx
// ✅ Good
setCount(c => c + 1)
```

---

## Data Fetching Optimization

* **Parallelize** fetches, avoid waterfalls.
* Use Suspense for loading states.

```tsx
// ✅ Good — parallel fetching
const [posts, comments] = await Promise.all([
  fetchPosts(),
  fetchComments(),
])
```

---

## Compiler-Aware Code

* Don’t sprinkle `useMemo`/`useCallback` everywhere.
* Write clean, simple components and let the React Compiler optimize.

```tsx
// ❌ Bad
const memoizedValue = useMemo(() => compute(value), [value])

// ✅ Good
const result = compute(value) // let compiler decide
```

---

## UX Best Practices

* Use skeletons instead of spinners.
* Show partial data when possible.
* Use `error.js` and error boundaries for graceful fallback.

---

## Style

* Use **kebab-case** for flags: `my-flag`, not `my_flag`.
* Comments only if high-value. Prefer self-documenting code.

---
