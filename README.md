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

2. Create a `.env` file based on the provided example and add your Groq API key:

   ```bash
   cp .env.example .env
   # edit .env and set VITE_GROQ_API_KEY
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open <http://localhost:5173> in your browser.

## Using the App

1. Select a business from the dropdown.
2. (Optional) Enter the name of the staff member who helped you.
3. Copy one of the suggested review templates. The preview will highlight the staff name.
4. Click **Open Review Box** to launch Google Maps.
5. Paste the review, add a rating and submit.

## Template Persistence

Custom templates are saved in your browser's `localStorage`. They are loaded when the app starts and automatically updated whenever templates are added, removed, or generated, so your changes persist across sessions.

Staff names are not stored anywhere—they exist only for your current session and are automatically woven into the review text in a natural way when provided.

## Additional Scripts

Create a production build:

```bash
npm run build
```

Run ESLint:

```bash
npm run lint
```
