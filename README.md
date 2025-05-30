# 🎭 Playwright Template Structured

A scalable end-to-end testing template using [Playwright](https://playwright.dev/) designed for **both UI and API testing** with reusable, layered architecture and strong type support.

---

## 📁 Project Structure

### 📌 Core Layer (`src/core`)

Contains the foundational logic and shared functionalities.

- **api/**

  - **data/** – Houses static data and constants used for API request headers or default values.
  - **endpoints/** – Group API services by feature, service, or domain. Each function wraps a request (get, post, etc.) with default headers and types, so you don’t repeat boilerplate.
  - **factories/** – Factory functions that return structured API data objects, supporting override.
  - **helpers/** – Chain logic or multiple endpoint calls to prepare test data. Use for login, setup flows, or transforming inputs before calling endpoints.
  - **types/** – TypeScript definitions for input/output payloads of API endpoints.
  - **utils/** – Small utility functions for API testing.

- **shared/**

  - **data/** – Reusable constants shared across API and UI.
  - **utils/** – Generic utility functions not tied to API or UI (e.g. timers, generators).

- **UI/**

  - **data/** – Static or mock data for UI tests (e.g. predefined user inputs or states).
  - **factories/** – Functions to generate default UI entities (e.g. users, forms) with override support.
  - **helpers/** – Functional helpers for UI actions or flows that abstract away logic.
  - **modules/** – Module Object Model for reusable UI components or forms. Like Page Objects, but for parts of a page reused in multiple places.
  - **pages/** – Page Object Model for full pages. Contains element selectors and actions scoped to a single UI screen.
  - **types/** – TypeScript types for UI data structures.
  - **utils/** – Utilities for advanced UI interactions.

---

### 📌 Configuration (`config/`)

Contains configuration files.

---

### 📌 Tests (`test/`)

Test cases grouped by type:

- **ui/** – UI tests.
- **api/** – API tests.
- **visual/** – Visual regression tests.

---

## 🧾 Naming Conventions

| Element               | Convention   | Example           |
| --------------------- | ------------ | ----------------- |
| Folder & File Names   | `kebab-case` | `user-factory.ts` |
| Classes, Enums, Types | `PascalCase` | `UserFactory`     |
| Functions, Variables  | `camelCase`  | `generateUser()`  |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Load Environment Variables

using .envrc, create .env from it

### 3. Start ReportPortal

Start services locally using Docker:

```bash
docker compose -f ./docker/docker-compose.yml up -d
```

Default Access

URL: `http://localhost:8080`

Project: `default_personal`

Default User: `default\1q2w3e`

Administrator: `superadmin\erebus`

Update these credentials in `docker/docker-compose.yml` if needed.

### 4. Setup Accounts

Generate initial users before testing:

```bash
pnpm setup-account
```

### 5. Run Tests

- **UI tests only:**

```bash
pnpm test:ui
```

- **API tests only:**

```bash
pnpm test:api
```

- **Interactive Test UI:**

```bash
pnpm test:api
```

- **Repeat a test 30 times (stress test):**

```bash
pnpm test-30
```

- **Generate Index Files:**

```bash
pnpm run generate:index
```

This creates `index.ts` files for convenient imports.

- **Generate OpenAPI Types:**

```bash
pnpm run generate:openapi
```

This generates types from OpenAPI schemas into `./src/core/api/types/pet-store-type.ts`.

---

## 🧪 CI/CD: Scalable Parallel Test Execution

This project is equipped with a scalable and modular **GitHub Actions workflow** to run tests efficiently and reliably across environments.

### 🔧 Features:

- **Parallel test execution** using matrix strategy across shards and browsers.
- **Shared setup job** (`test-setup`) to generate data/state reused by all test shards.
- **Dynamic browser selection** (`webkit`, `firefox`, `chrome`) based on PR or manual trigger.
- **Tag-based test targeting** (`@shard1`, `@smokeTest`, etc.).
- **Cross-browser and distributed run support**.
- **Integration with ReportPortal**, including:
  - Unique launch UUID per shard.
  - Automatic UUID collection and merged launch via API.

### 📁 Workflow Files:

- `runner.yml`: Main orchestrator. Dispatches setup and test shards.
- `shard.yml`: Reusable called workflow. Executes tests per browser/shard.
- `test-complete`: Merges ReportPortal launches using stored UUIDs.

This setup enables fast feedback loops, distributed execution, and centralized reporting for large-scale automation.

---

## 🧪 Pre-commit Hooks

Using `husky` for:

- Preventing `.only` in tests.
- Generating `index.ts` files automatically.
- Running `lint-staged`.

Activate hooks:

```bash
pnpm prepare
```

---

## 📄 License

MIT © Tri Hoang
