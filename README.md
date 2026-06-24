# Zara Challenge

Application developed as a challenge for Napptilus using Next.js and TypeScript.

The project focus on performance, maintainability, and scalability by leveraging Server-Side Rendering (SSR), a feature-based structure, and a domain-oriented architecture.

Users can browse a smartphone catalog, search products, view product details, configure variants, manage a shopping cart, and complete the checkout process.

## Stack

Next.js (App Router)-
React -
TypeScript -
Css Modules -
Vitest / Playwright -
ESLint

## Features

- SSR product catalog rendering

* Search using URL search parameters
* Product detail view with variant selection (colors and storage) with price and image variations
* Similar product section
* Shopping cart management
* Cart persistence using local storage
* Checkout
* accessibility for screen readers
* Responsive design
* Scalable architecture based on separation of responsibilities

## Architecture

The project follows a hybrid approach inspired by Clean Architecture and Feature-Based Architecture.

1. CORE: The core folder contains the business domain and is independent of frameworks, APIs, or UI implementations.
   The application depends on abstractions instead of concrete implementations.
2. FEATURES: Business functionality is grouped by domain responsibility, each feature encapsulates its own components, hooks, context, and business logic.
   This structure improves scalability and reduces coupling between unrelated functionalities. You can find this features:

- catalog
- product
- checkout

3. INFRASTRUCTURE: The infrastructure layer contains external implementations. API communication, DTOs definitions,DTO-to-domain mapping, Repository implementations

4. PRESENTATION LAYER: The presentation layer is built using Next.js App Router. Reusable UI elements are located in the shared components folder.

## Design decisions

### Server-Side Rendering

The product catalog is rendered on the server to improve:

- Initial page load
- SEO
- Perceived performance

### URL-Based Search State

Search values are stored in URL parameters, allowing:

- Shareable URLs
- Browser navigation compatibility
- Better SSR integration

### Dependency Inversion

Business logic depends on repository interfaces rather than API implementations.
This makes the code easier to test and replace.

### DTO Mapping Layer

External API responses are transformed into domain entities using dedicated mappers.
This prevents infrastructure concerns from leaking into business logic.

### Feature Isolation

Each business capability is organized into a dedicated feature module, making future maintenance and expansion simpler.

### remove duplicates

The backend may not perfect, because that it's implement a remove duplicates to show a clean products catalog

### debounce searches

User can use the search bar, but some times takes time to fully write what it's looking, because that it's delayed the search fetch

## Deployment

The challenge will be deploy on netlify a will, you can check the main production build: https://zara-challange.netlify.app

## New Features

The are some new features out of the base challenge, like manual pagination, quantity selector on Cart Items, that you can find on the newFeatures branch or https://newfeatures--zara-challange.netlify.app

## Running the project

First, instal the dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

and then you run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start searching some smartphones on the search-bar, or click someone on the catalog. Then you will can choose color and storage options for the smartphone to later add to the cart and make the checkout.

You also could add or delete many items on the cart before the checkout.

## Create building and production server

You can create the production build with:

```bash
npm run build
# or
yarn run build
# or
pnpm run build
# or
bun run build
```

and after the build, you can start the app with:

```bash
npm run start
# or
yarn run start
# or
pnpm run start
# or
bun run start
```

## Testing

The are some unit test to ensure critical functions like mapper from dtos to entities, or remove duplicates from arrays. Besides there is a end to end test for the more important flow, the checkout, it test from the init loading of the app to the pay action on the cart.

### Unit Test

You can run this test with:

```bash
npm run test
# or
yarn run test
# or
pnpm run test
# or
bun run test
```

### End-to-End Tests

Playwright is used to validate the critical user journey, you can run:

```bash
npx run playwright
# or
yarn run playwright
# or
pnpm run playwright
# or
bun run playwright
```

Created by @VLDeMenezes for Napptilus Company.
