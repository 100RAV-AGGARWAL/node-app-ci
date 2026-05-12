import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['dotenv/config', './tests/support/agent.ts'],
    isolate: true,
    env: {
      DOTENV_CONFIG_PATH: 'config/.env.test',
    },
  },
});

export default config;
