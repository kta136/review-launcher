# Review Launcher

Review Launcher is a lightweight web app that helps customers quickly post Google reviews for supported businesses. Choose a business, copy a pre-written review template, and open the review form in just a couple of clicks.

## Prerequisites

- Node.js 18+
- npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open <http://localhost:5173> in your browser.

## Using the App

1. Select a business from the dropdown.
2. Copy one of the suggested review templates.
3. Click **Open Review Box** to launch Google Maps.
4. Paste the review, add a rating and submit.

## Additional Scripts

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```

## Styling Utilities

Common Tailwind combinations are defined in `src/index.css` for reuse:

- `.card` – white card with padding, rounded corners and drop shadow.
- `.btn` – base button with flex layout, spacing and transitions.
- `.btn-primary` – green button variant.
- `.btn-secondary` – gray button variant.

Use these classes in JSX to keep markup concise, e.g. `<div className="card">` or `<button className="btn btn-primary">`.
