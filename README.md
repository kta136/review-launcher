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

## Template Persistence

Custom templates are saved in your browser's `localStorage`. They are loaded when the app starts and automatically updated whenever templates are added, removed, or generated, so your changes persist across sessions.

## Additional Scripts

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```
