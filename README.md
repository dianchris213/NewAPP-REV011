# Catatan Keuangan — Mini App

A mobile-first personal finance mini app built with TanStack Start, React, TypeScript, and Tailwind CSS. All data is kept locally (localStorage), so the app runs without a backend.

## Features

### Transactions
- **Add Transaction bottom sheet** (`src/components/AddTransactionSheet.tsx`)
  - Income / expense switch with per-type categories
  - Strict validation: amount > 0 (max 1,000,000,000,000), category, date, short note (max 80 chars)
  - **Account selection**: every transaction is saved to a specific wallet account and adjusts that account's balance (expenses are blocked when the account balance is insufficient)
  - Optimistic insert with a pending state, focus trap and `Esc` to close
- **All Transactions bottom sheet** (`src/components/AllTransactionsSheet.tsx`)
  - Filters by month, week, type, category, and keyword search
  - Reset filters, plus a "current month" shortcut from the bottom navigation
- **Transaction list** (`src/components/TransactionList.tsx`) with inline edit and delete

### Wallet (`/wallet`)
- Combined balance across all accounts
- Account types: Cash, Bank, and E-Wallet with a provider sub-menu (BCA, Mandiri, GoPay, OVO, …)
- **Add account** bottom sheet with validated name (2–30 chars) and starting balance
- **Top Up** bottom sheet: add funds to any account with an optional funding source
- **Transfer** bottom sheet: move money between accounts with balance checks
- **Wallet activity feed** filterable by Top Up / Transfer / All

### Settings (`/settings`)
- **Language toggle (ID / EN)** backed by the global store; the whole settings screen is translated
- **Push notifications** toggle
- **App Lock / Biometric** toggle placeholder with explicit on/off states and a preview note
- Dark/light theme and cloud sync toggles
- **Local file avatar upload** from the profile sheet in the top bar (image is read locally as a data URL — nothing is uploaded to a server)
- Sign out and destructive account actions

### Other
- Analytics overview (`/analytics`)
- Telegram / Google style mock login (`/login`, `/signup`)
- Accessible bottom sheets: `role="dialog"`, `aria-modal`, focus trap, `Esc` to close, and body-level portals so sheets always sit above the bottom navigation

## State

`src/lib/app-store.tsx` holds a single React context store with user, transactions, wallets, wallet activity, settings, language, and transaction filters. Everything is persisted to `localStorage` (`tmab-state-v1`) with debounced writes.

## Development

```sh
npm i
npm run dev
```

## Built with

- TanStack Start (TanStack Router)
- TypeScript
- React
- Tailwind CSS
- sonner (toasts)
