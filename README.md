// File: README.md

<p align="center">
  <img src="https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg" alt="Zod Logo" width="120" />
</p>

# zod-prime

<p align="center">
  <b>Type-safe, production-grade Zod schema utilities for modern TypeScript apps.</b><br>
  <a href="https://www.npmjs.com/package/zod-prime"><img src="https://img.shields.io/npm/v/zod-prime.svg?style=flat-square" alt="npm version"></a>
  <a href="https://github.com/Sufo10/zod-prime/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Sufo10/zod-prime?style=flat-square" alt="MIT License"></a>
</p>

`zod-prime` supercharges your Zod schemas with deep partial/required, recursive omit/pick, error flattening, cross-field validation, JSON Schema conversion, and more. All utilities are fully type-safe and ready for production.

## ✨ Features

- **`deepPartial`** – Make any Zod schema deeply optional (all fields optional, recursively)
- **`deepRequired`** – Make any Zod schema deeply required (all fields required, recursively)
- **`deepOmit`** – Deeply omit keys from any Zod schema (type-safe, recursive)
- **`deepPick`** – Deeply pick only certain keys from any Zod schema (type-safe, recursive)
- **`mergeSchemas`** – Deeply merge two Zod object schemas
- **`zodToJsonSchema`** – Convert a Zod schema to JSON Schema (for OpenAPI, docs, etc)
- **`zodInferType`** – Infer TypeScript type from a Zod schema (for DX)
- **`zodDefault`** – Set a default value for any Zod schema, even deeply
- **`emailPasswordSchema`** – Flexible, secure email-password schema generator
- **`flattenErrors`** – Simplify Zod errors into readable form (for UI, logs, etc)
- **`refineObject`** – Add cross-field validation to Zod objects (e.g. password confirmation)
- **`smartEnum`** – Create safe enums from string arrays (type-safe, autocompletion)

## 📦 Installation

```bash
npm install zod-prime zod
```

> **Peer dependency:** You must have `zod` installed in your project.

## 🚀 Quick Start

```ts
import {
  deepPartial,
  deepRequired,
  deepOmit,
  deepPick,
  mergeSchemas,
  zodToJsonSchema,
  zodInferType,
  zodDefault,
  emailPasswordSchema,
  flattenErrors,
  refineObject,
  smartEnum,
} from 'zod-prime';
import { z } from 'zod';

// Example: Deep Partial
const schema = z.object({ user: z.object({ name: z.string(), age: z.number() }) });
const partial = deepPartial(schema);
// All fields are now optional, deeply

// Example: Deep Omit
const omitted = deepOmit(schema, ['age']);

// Example: Merge Schemas
const merged = mergeSchemas(z.object({ foo: z.string() }), z.object({ bar: z.number() }));

// Example: Smart Enum
const Color = smartEnum(['red', 'green', 'blue'] as const);

// Example: Email/Password Schema
const loginSchema = emailPasswordSchema({ minPasswordLength: 10, requireSpecialChar: true });

// Example: Flatten Zod Errors
// flattenErrors(zodError) => [{ path, message }]
```

---

## 🧠 Usage & API

### Deep Partial

```ts
import { deepPartial } from 'zod-prime';
import { z } from 'zod';
const schema = z.object({ user: z.object({ name: z.string(), age: z.number() }) });
const partial = deepPartial(schema);
// All fields are now optional, deeply
```

### Deep Required

```ts
import { deepRequired } from 'zod-prime';
// Makes all fields required, deeply
```

### Deep Omit

```ts
import { deepOmit } from 'zod-prime';
const schema = z.object({ a: z.string(), b: z.object({ c: z.number(), d: z.string() }) });
const omitted = deepOmit(schema, ['b']);
// Removes 'b' everywhere in the schema
```

### Deep Pick

```ts
import { deepPick } from 'zod-prime';
const schema = z.object({ a: z.string(), b: z.object({ c: z.number(), d: z.string() }) });
const picked = deepPick(schema, ['a', 'c']);
// Keeps only 'a' and 'c' everywhere in the schema
```

### Merge Schemas

```ts
import { mergeSchemas } from 'zod-prime';
const a = z.object({ foo: z.string() });
const b = z.object({ bar: z.number() });
const merged = mergeSchemas(a, b);
// merged: { foo: string, bar: number }
```

### Zod to JSON Schema

```ts
import { zodToJsonSchema } from 'zod-prime';
const schema = z.object({ foo: z.string() });
const jsonSchema = zodToJsonSchema(schema);
// { type: 'object', properties: { foo: { type: 'string' } } }
```

### zodInferType

```ts
import { z } from 'zod';
import type { zodInferType } from 'zod-prime';
const schema = z.object({ foo: z.string() });
type T = zodInferType<typeof schema>; // { foo: string }
```

### zodDefault

```ts
import { zodDefault } from 'zod-prime';
const schema = zodDefault(z.string(), 'hello');
schema.parse(undefined); // 'hello'
```

### Deep Required

```ts
import { deepRequired } from 'zod-prime';
// Makes all fields required, deeply
```

### Email Password Schema

```ts
import { emailPasswordSchema } from 'zod-prime';

const schema = emailPasswordSchema({ minPasswordLength: 10, requireSpecialChar: true });
```

### Flatten Errors

```ts
import { flattenErrors } from 'zod-prime';
// Converts ZodError to array of { path, message }
```

### Refine Object

```ts
import { refineObject } from 'zod-prime';

const schema = refineObject(
  z.object({ password: z.string(), confirm: z.string() }),
  (data) => data.password === data.confirm,
  'Passwords must match'
);
```

### Smart Enum

```ts
import { smartEnum } from 'zod-prime';

const Color = smartEnum(['red', 'green', 'blue'] as const);
```

## 🧪 Testing & Development

```bash
npm run test
```

## 🔧 Build & Type Checking

```bash
npm run build
```

## 🧹 Lint & Format

```bash
npm run lint
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!<br>
Please open an issue or PR on [GitHub](https://github.com/Sufo10/zod-prime).

## 📄 License

MIT

---

---

<p align="center">
  <i>Built with ❤️ using <a href="https://github.com/colinhacks/zod">Zod</a> by developers for developers.</i>
</p>
