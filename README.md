# Playwright Automation Framework

![Playwright Tests](https://github.com/LAKSHMIPATHI9790/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)

End-to-end **UI** and **API** test automation framework built with **Playwright** and **JavaScript**.

| Layer | Application under test |
|---|---|
| UI | [Sauce Demo](https://www.saucedemo.com), a demo e-commerce store |
| API | [Restful Booker](https://restful-booker.herokuapp.com), a hotel booking REST API |

## Features

- **Page Object Model**: locators and actions live in `pages/`, tests stay readable.
- **Custom fixtures**: tests receive page objects (`loginPage`, `cartPage`, ...) directly.
- **Login once, reuse the session**: a setup project logs in and saves the session, so UI tests skip the login screen.
- **Data-driven tests**: invalid logins and checkout validation run from data tables in `test-data/`.
- **API testing**: create, read, update, partial update and delete bookings, token authentication and negative cases.
- **Debugging on failure**: screenshots, videos and Playwright traces are kept for failed tests.
- **Reports**: HTML report plus JUnit XML.
- **CI/CD**: GitHub Actions runs UI and API suites in parallel on every push, pull request and daily.
- **Tags**: run quick checks with `@smoke`.

## Project structure

```
├── .github/workflows/playwright.yml   # CI pipeline
├── fixtures/test-fixtures.js          # custom fixtures that provide page objects
├── pages/                             # Page Object Model
│   ├── components/Header.js
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── test-data/                         # users, products and booking data
├── tests/
│   ├── auth.setup.js                  # logs in once and saves the session
│   ├── ui/                            # login, inventory, cart, checkout
│   └── api/                           # booking API
├── utils/BookingApi.js                # API client
└── playwright.config.js
```

## Test coverage

| Suite | Scenarios |
|---|---|
| Login | valid login, locked out user, wrong password, empty fields, logout |
| Inventory | product count, sort by name (A–Z, Z–A), sort by price (low–high, high–low) |
| Cart | add and remove products, cart badge, cart contents |
| Checkout | full order with subtotal, tax and total checks; required field validation |
| Booking API | create, get, search, PUT, PATCH, DELETE, invalid token, bad credentials |

## Getting started

Requirements: Node.js 18 or later.

```bash
git clone https://github.com/LAKSHMIPATHI9790/playwright-automation-framework.git
cd playwright-automation-framework
npm ci
npx playwright install chromium
```

## Running tests

```bash
npm test               # all tests
npm run test:ui        # UI tests only
npm run test:api       # API tests only
npm run test:smoke     # only tests tagged @smoke
npm run test:headed    # UI tests with the browser visible
npm run report         # open the last HTML report
npx playwright test --ui   # Playwright UI mode for debugging
```

## Tech stack

Playwright · JavaScript (Node.js) · GitHub Actions · HTML and JUnit reports
