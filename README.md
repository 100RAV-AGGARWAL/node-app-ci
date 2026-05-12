## About

This project was created with [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript), converted to native Node.js ESM, and trimmed to a server-only API project.

The generated HTML/static UI has been removed. Swagger/OpenAPI documentation is available from the API server.

## Requirements

- Node.js 20+
- npm

## First-time setup

```bash
npm install
```

`npm install` also runs the `prepare` script, which installs the Husky pre-commit hook.

## Available Scripts

### `npm run dev`

Run the API server in development mode with hot reloading.

- API server: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api-docs.json`
- Health check: `http://localhost:3000/health`

### `npm test`

Run unit tests with [Vitest](https://vitest.dev/guide/).

### `npm run lint`

Check for linting errors.

### `npm run lint:fix`

Automatically fix linting issues where possible.

### `npm run format`

Format project files with Prettier.

### `npm run format:check`

Check whether project files are formatted correctly.

### `npm run type-check`

Check for TypeScript errors without emitting files.

### `npm run build`

Build the server for production.

### `npm start`

Run the production build. Run `npm run build` first.

## Pre-commit Hook

This project uses Husky and lint-staged.

Before each commit, staged files are automatically processed:

- TypeScript files: `eslint --fix` and `prettier --write`
- Config/docs files: `prettier --write`

## API-only Changes

Removed the generated UI assets and related tooling:

- `src/public/`
- `src/views/`
- BrowserSync config and scripts
- static file serving from Express
- `/users` HTML page route

The root route now returns a JSON status object with the Swagger docs path.

## ESM Notes

- `package.json` uses `"type": "module"`.
- TypeScript uses `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`.
- Local imports include `.js` extensions, which TypeScript maps to `.ts` during development and emits as valid ESM imports in `dist/`.
- CommonJS-only runtime hooks such as `module-alias/register` were removed from the start command.
