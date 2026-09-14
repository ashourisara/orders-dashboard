# Orders Dashboard

A single-page orders dashboard built with React, TypeScript, Vite, and Mantine. It shows a paginated, searchable, sortable, filterable table of mock orders, with a details modal and Persian (Jalali) date formatting.

The project is a reference for clean frontend architecture: polymorphic components, hook-driven state, config-based columns, and responsive design, all kept inside a single realistic dashboard.

---

## Features

- Paginated table with 10 orders per page and controlled pagination
- Debounced search by order ID or customer name (300ms)
- Status filter for Pending, Processing, Completed, and Cancelled
- Sorting by price (high to low), date (newest to oldest), and customer (A to Z) with a direction toggle
- Details modal that opens from the eye icon on any row
- Jalali date formatting via dayjs and jalali-plugin-dayjs
- Color-coded status badges
- Responsive layout for mobile, tablet, and desktop
- Dedicated loading and error states

---

## Tech Stack

| Layer        | Technology                    |
| ------------ | ----------------------------- |
| UI framework | React 18+                     |
| Language     | TypeScript                    |
| Build tool   | Vite                          |
| UI library   | Mantine v7+                   |
| Data table   | mantine-datatable             |
| Dates        | dayjs and jalali-plugin-dayjs |
| Icons        | @tabler/icons-react           |

Links:

- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Vite: https://vitejs.dev
- Mantine: https://mantine.dev
- mantine-datatable: https://icflorescu.github.io/mantine-datatable
- dayjs: https://dayjs.gitea.io
- jalali-plugin-dayjs: https://www.npmjs.com/package/jalali-plugin-dayjs
- Tabler Icons: https://tabler.io/icons

---

## Getting Started

Requirements: Node.js 18 or newer, and npm (or yarn / pnpm).

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR-USERNAME/orders-dashboard.git
cd orders-dashboard
npm install
```

Run the dev server:

```bash
npm run dev
```

Open http://localhost:5173 in the browser. The app reloads on file changes.

Build for production:

```bash
npm run build
npm run preview
```

`npm run build` produces a static bundle in `dist/`, and `npm run preview` serves it locally.

---

## Project Structure

```
src/
├── components/
│   ├── Modal/OrderDetailsModal.tsx       Generic DetailsModal plus an Order specialization
│   ├── Search/SearchBar.tsx              Debounced text input
│   ├── Table/
│   │   ├── OrdersTable.tsx               Generic table with pagination and row actions
│   │   ├── TableFooterInfo.tsx           "Showing X to Y of Z" summary
│   │   └── TableToolbar.tsx              Search, filter, and sort controls
│   └── ui/state/
│       ├── LoadingState.tsx
│       └── ErrorState.tsx
├── constants/orders.ts                   Columns, sort options, status colors, detail fields
├── hooks/
│   ├── orders.ts                         useOrders (fetch) and useFilteredOrders (derive)
│   ├── pagination.ts                     usePagination
│   ├── sort.ts                           useSort
│   ├── useOrdersTable.ts                 Composite hook that wires everything together
│   └── useMediaQuery.ts                  Breakpoint helpers
├── types/order.ts                        Order, OrderStatus, SortOption, TableColumn, DetailField
├── utils/date.ts                         formatToJalali
├── App.tsx                               Orchestrator, pure composition
└── main.tsx                              Entry point with MantineProvider and dayjs setup
```

---

## How It Works

1. Data loading. `useOrders` fetches `public/orders.json` on mount. `LoadingState` renders while pending, and `ErrorState` shows the error message if the fetch fails.

2. Filter, sort, and search. `useFilteredOrders` is a memoized derivation over the full list, the debounced search string, the status filter, and the active sort option with its direction. Sorting runs after filtering and always copies the array first, so React state is never mutated.

3. Pagination. `usePagination` slices the processed list into pages of 10. It resets the page back to 1 whenever any filter or sort key changes, so you never land on an empty page.

4. Composition in App. `App.tsx` calls `useOrdersTable()` once and gets everything the view needs. It renders four components (toolbar, table, footer info, modal) and holds a single local state for the selected order. There is no logic left in App.tsx.

5. Table rendering. `OrdersTable<T>` is generic over any entity that has an `id`. Columns come from `ORDER_COLUMNS` in `constants/orders.ts`, already shaped as `DataTableColumn<Order>[]` so no adapter is needed. Two behaviors are injected as props: `renderBadge` swaps the status column for a StatusBadge, and `renderRowAction` adds a final column with the eye icon. Columns marked `hideOnMobile: true` drop on small screens.

6. Details modal. Clicking the eye icon sets `selectedOrder` in App, which opens `OrderDetailsModal`. That component composes the generic `DetailsModal<T>` and passes it an Order-specific header and footer. The body is a grid of label and value pairs from `ORDER_DETAIL_FIELDS`.

7. Jalali dates. The date column's render calls `formatToJalali(r.date)`, which uses dayjs extended with jalali-plugin-dayjs to convert an ISO date string to the Persian calendar. Sorting still uses the raw ISO string, so chronological order is preserved.

---

## Mock Data

Orders load from `public/orders.json` at runtime. Each record looks like this:

```json
{
  "id": "ORD-001",
  "customer": "Alice Johnson",
  "email": "alice@example.com",
  "product": "Wireless Headphones",
  "items": 2,
  "price": 89.99,
  "status": "Completed",
  "date": "2025-01-15"
}
```

Field reference:

| Field    | Type   | Notes                                                                        |
| -------- | ------ | ---------------------------------------------------------------------------- |
| id       | string | Format ORD-NNN                                                               |
| customer | string | Full name                                                                    |
| email    | string | Customer contact                                                             |
| product  | string | Product name                                                                 |
| items    | number | Quantity of items in the order, note the field is called items, not quantity |
| price    | number | Unit price in USD                                                            |
| status   | string | One of Pending, Processing, Completed, Cancelled                             |
| date     | string | ISO YYYY-MM-DD in the Gregorian calendar                                     |

To use your own data, replace the file with the same shape. No code changes are required.

---

## Architecture and Design Decisions

For the reasoning behind the folder structure, config-driven columns, generic components, and how the project would evolve at scale with 100k+ orders, see [DECISIONS.md](./DECISIONS.md).

---

## Testing the UI

Open DevTools and toggle the device toolbar.

Mobile up to 768px: stacked toolbar, fullscreen modal, horizontal table scroll, with the items and date columns hidden.

Tablet between 768px and 1024px: toolbar wraps and most columns remain visible.

Desktop above 1024px: inline toolbar, all columns, centered modal.

Try these interactions:

1. Search for `ORD-01` to see only ORD-010 through ORD-019.
2. Filter status to Cancelled and notice that search and filter compose.
3. Sort by Price descending, then click the direction toggle to flip it.
4. Click the eye icon to open the modal with all fields and a color-coded status badge.
5. Resize the window and watch the toolbar reflow and columns collapse.

---

## Scripts

| Command         | Description                                        |
| --------------- | -------------------------------------------------- |
| npm run dev     | Start the Vite dev server with hot reload          |
| npm run build   | Type-check and produce a production bundle in dist |
| npm run preview | Serve the production build locally                 |
| npm run lint    | Run ESLint if configured                           |

---

## License

MIT. Free to use, modify, and distribute.

---

## Acknowledgements

Thanks to Mantine for the component library, mantine-datatable for the table, Tabler Icons for the icon set, and jalali-plugin-dayjs for Jalali date support.
