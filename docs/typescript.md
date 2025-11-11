# TypeScript Guidelines

This document defines the coding conventions and best practices for using TypeScript in this project.
It explains the **how** at the language level. For the **why**, see [Clean Code Principles](./clean-code.md).

---

## Sync runtime validation with TypeScript types

When you add or change literal unions or domain-level types (for example, a `Frequency` union used by medication data), make sure the corresponding runtime validation schema is updated as well. In this project runtime validation uses Zod; relevant schemas live under `src/lib/quick-reference-database/validation/schemas.ts`. Keep TypeScript types and Zod schemas in sync to avoid surprising runtime rejections.


## Cross-References

* **Consistency** → see *Consistent Code* in Clean Code Principles.
* **Clarity & Intent** → see *Intentional Code*.
* **Immutability & Modularity** → see *Adaptable Code*.
* **Security & Safety** → see *Responsible Code*.

---

## Plain Objects vs Classes

Prefer plain objects with TypeScript `type`/`interface` definitions over classes.

**Why:**

* Seamless React/Next.js integration (serialization, server components).
* Reduced boilerplate, simpler reasoning.
* Encourages immutability.

```ts
// ❌ Bad
class User {
  constructor(public name: string, public age: number) {}
}

// ✅ Good
type User = {
  readonly name: string
  readonly age: number
}
```

---

## ES Module Syntax

Use **`import` / `export`** exclusively.

```ts
// ❌ Bad
const util = require('./util')

// ✅ Good
import { util } from './util'
```

---

## Type-Only Imports

Use `import type` for types/interfaces to avoid runtime code generation.

```ts
// ❌ Bad
import { MyType } from './types'

// ✅ Good
import type { MyType } from './types'
```

---

## `any` vs `unknown`

Avoid `any`. Use `unknown` with narrowing instead.

```ts
// ❌ Bad
function process(value: any) {
  console.log(value.toUpperCase()) // runtime crash possible
}

// ✅ Good
function process(value: unknown) {
  if (typeof value === 'string') console.log(value.toUpperCase())
}
```

---

## Readonly and Immutability

Mark props and collections as `readonly`.

```ts
// ❌ Bad
type Props = { items: string[] }
props.items.push('extra')

// ✅ Good
type Props = { readonly items: readonly string[] }
```

---

## Type Narrowing

Use narrowing tools like `in`, `typeof`, `instanceof`, or discriminated unions.

```ts
// ❌ Bad
function getArea(shape: any) {
  if (shape.kind === 'circle') return shape.radius * shape.radius
}

// ✅ Good
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; sideLength: number }

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle': return Math.PI * shape.radius ** 2
    case 'square': return shape.sideLength ** 2
  }
}
```

---

## Array Operators

Prefer functional methods over imperative loops.

```ts
// ❌ Bad
const names: string[] = []
for (let i = 0; i < users.length; i++) {
  names.push(users[i].name)
}

// ✅ Good
const names = users.map(u => u.name)
```

---

## Type vs Interface

* Use **`type`** for unions or primitives.
* Use **`interface`** when extension is needed.

```ts
// ❌ Bad
interface Status { state: 'idle' | 'loading' | 'success' }

// ✅ Good
type Status = 'idle' | 'loading' | 'success'
```

---

## Enums vs Union Literals

Prefer unions over enums unless runtime mapping is required.

```ts
// ❌ Bad
enum Status { Idle, Loading, Success }

// ✅ Good
type Status = 'idle' | 'loading' | 'success'
```

---

## Avoid Non-Null Assertions

Avoid `!`. Use guards instead.

```ts
// ❌ Bad
console.log(user!.name)

// ✅ Good
if (user) console.log(user.name)
```

---

## Function Typing

Explicit return types for public APIs.

```ts
// ❌ Bad
export function sum(a: number, b: number) {
  return a + b
}

// ✅ Good
export function sum(a: number, b: number): number {
  return a + b
}
```

---

## Naming Conventions

* **Types/Interfaces**: `PascalCase`
* **Variables/Functions**: `camelCase`
* **Constants**: `UPPER_CASE`

```ts
// ❌ Bad
const MAXsize = 10
interface userProps {}

// ✅ Good
const MAX_SIZE = 10
interface UserProps {}
```

---

## Generics

Name generics descriptively.

```ts
// ❌ Bad
function wrap<X>(value: X): X[] {
  return [value]
}

// ✅ Good
function wrap<TValue>(value: TValue): TValue[] {
  return [value]
}
```

---

## Utility Types

Use built-in utility types when possible.

```ts
// ❌ Bad
type PartialUser = {
  name?: string
  age?: number
}

// ✅ Good
type User = { name: string; age: number }
type PartialUser = Partial<User>
```

---

## Error Handling

Type caught errors as `unknown`. Narrow before usage.

```ts
// ❌ Bad
try {
  throw 'fail'
} catch (err) {
  console.error(err.message) // unsafe
}

// ✅ Good
try {
  throw new Error('fail')
} catch (err: unknown) {
  if (err instanceof Error) console.error(err.message)
}
```

---

