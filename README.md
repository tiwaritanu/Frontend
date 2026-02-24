# Ecommerce Product Listing & Cart System

A production-ready ecommerce frontend built with **React + Vite** that supports product browsing, search, pagination, and a full cart workflow with local persistence.

## Project Overview

This application fetches products from the DummyJSON API and provides an end-to-end cart experience:

- Browse products with stock-aware actions
- Search by product title using debounced input
- Navigate products using reusable client-side pagination
- Manage cart quantities with stock safety checks
- Persist cart data in LocalStorage across page refreshes
- Simulate checkout with validation and cart reset

## Tech Stack

- **React (Vite)** for app architecture and fast development workflow
- **Functional Components + Hooks** for modular UI logic
- **Context API** for global cart state
- **Tailwind CSS** for responsive, professional UI styling
- **Fetch API** for network calls
- **LocalStorage** for cart persistence

## Setup Instructions

### 1) Install dependencies

```bash
npm install
```

### 2) Run development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Folder Structure

```text
src/
 ├── components/
 │    ├── ProductCard.jsx
 │    ├── CartItem.jsx
 │    ├── Navbar.jsx
 │    ├── Pagination.jsx
 │    ├── Loader.jsx
 │    └── ErrorState.jsx
 │
 ├── pages/
 │    └── ProductPage.jsx
 │
 ├── context/
 │    └── CartContext.jsx
 │
 ├── hooks/
 │    ├── useDebounce.js
 │    └── useLocalStorage.js
 │
 ├── services/
 │    └── api.js
 │
 ├── utils/
 │    └── calculateTotal.js
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

## Feature List

- Product list fetched from `https://dummyjson.com/products`
- Loading spinner and API error state with retry
- Search with 300ms debounce
- No-results UI for empty filter results
- Reusable pagination (10 items per page)
- Add to cart and stock-aware quantity controls
- Prevent quantities from exceeding stock or dropping below 1
- Cart item removal
- Cart total value and navbar cart badge
- Checkout simulation with success alert and cart clear
- LocalStorage persistence and rehydration on refresh
- Toast notifications for key cart actions (bonus)

## Edge Case Handling

- **Out of stock products** are clearly labeled and cannot be added.
- **Quantity > stock** is prevented during add and increment actions.
- **Quantity < 1** is prevented with defensive `Math.max` logic.
- **Empty cart** shows dedicated empty-state messaging.
- **API failure** surfaces user-friendly error and retry.
- **Defensive checks** handle invalid payloads and localStorage parse issues.

## Screenshots

> Add screenshots here after running the app locally.

- `![Product Listing](./docs/screenshots/product-listing.png)`
- `![Cart](./docs/screenshots/cart.png)`

## Deployment Instructions

This project is ready for static deployment on platforms like **Vercel**, **Netlify**, or **Cloudflare Pages**.

1. Run production build:
   ```bash
   npm run build
   ```
2. Deploy the generated `dist/` folder.
3. Configure build settings (if needed):
   - Build command: `npm run build`
   - Output directory: `dist`
