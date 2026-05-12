## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript) and has been converted to native Node.js ESM.

## Requirements

- Node.js 20+
- npm

## Available Scripts

### `npm run clean-install`

Remove the existing `node_modules/` folder and `package-lock.json`, then reinstall all library modules.

### `npm run dev`

Run the server in development with hot reloading and browser refresh.

- API server: `http://localhost:3000`
- BrowserSync proxy: `http://localhost:3001`

### `npm test`

Run unit tests with [Vitest](https://vitest.dev/guide/).

### `npm run lint`

Check for linting errors.

### `npm run build`

Build the project for production.

### `npm start`

Run the production build. Run `npm run build` first.

### `npm run type-check`

Check for TypeScript errors.

## ESM Notes

- `package.json` uses `"type": "module"`.
- TypeScript uses `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`.
- Local imports include `.js` extensions, which TypeScript maps to `.ts` during development and emits as valid ESM imports in `dist/`.
- CommonJS-only runtime hooks such as `module-alias/register` were removed from the start command.
