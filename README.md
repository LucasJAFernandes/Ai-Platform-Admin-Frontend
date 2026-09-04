# AI Platform Admin — Frontend

A modern admin dashboard for managing a multi-tenant AI platform — tenants, billing, analytics, AI usage, system health and support tickets — built as a fully functional front-end demo powered by mock data.

> **Note:** this is a UI-focused project. All data comes from local mocks, so it runs out of the box with **no backend and no environment variables**.

## ✨ Features

- **Dashboard** — revenue, MRR, profit margin, online users and infrastructure KPIs with interactive charts
- **Organization** — filterable/searchable tenant list with status & health indicators, plus detailed tenant view (overview, billing, users, modules, connectors, activity)
- **Tenant creation wizard** — multi-step flow (company → plan → modules & add-ons → payment → confirmation) with Zod-validated forms
- **Billing** — subscriptions, recent invoices, alerts and revenue-by-plan breakdown
- **Analytics** — usage overview with rankings by user, project and conversation, token consumption and daily charts
- **AI Logs** — query logs with status, top agents and response-time metrics
- **System Health** — service status, incidents and alerts
- **Support** — ticket list with priorities, statuses and stats
- **Theme** — full light/dark mode across the entire app

## 🛠 Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev)
- TypeScript (strict mode)
- [Tailwind CSS 4](https://tailwindcss.com) + shadcn/ui-style component system (Radix primitives)
- Data visualization: [Recharts](https://recharts.org), [Chart.js](https://www.chartjs.org) and [MUI X Charts](https://mui.com/x/)
- [Zustand](https://zustand.docs.pmnd.rs) for state management
- [Zod](https://zod.dev) + React Hook Form for form validation

## 🚀 Getting started

Requires **Node.js 18+** and **pnpm**.

```bash
# install dependencies
pnpm install

# start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — no extra setup needed.

### Available scripts

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Start the development server         |
| `pnpm build`     | Create an optimized production build |
| `pnpm start`     | Serve the production build           |
| `pnpm lint`      | Run ESLint                           |
| `pnpm format`    | Run Prettier                         |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`)    |

## 📁 Project structure

```
src/
├── app/                  # App Router pages (dashboard routes)
├── components/
│   ├── atoms/            # Basic UI building blocks (button, card, dialog, input...)
│   ├── molecules/        # Combinations of atoms (toolbars, cards, tab bars, sidebars)
│   ├── organisms/        # Complex sections (lists, charts, modals, wizards)
│   └── templates/        # Full page layouts
├── lib/
│   ├── types/            # Centralized domain type definitions
│   ├── schemas/          # Zod validation schemas
│   ├── utils/            # Domain helpers
│   └── store/            # Client state (Zustand)
├── mocks/                # Mock data powering the demo
└── hooks/                # Reusable React hooks
```
