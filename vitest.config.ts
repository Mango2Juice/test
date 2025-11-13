/// <reference types="vitest/config" />
/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    css: false // You can switch this to true if you need CSS parsing
    ,
    coverage: {
      provider: 'v8', // or 'istanbul'
      enabled: true,
      include: ['src/**/*.{ts,tsx}']
    },
    projects: [{
      extends: true,
      plugins: [],
      test: {}
    }]
  }
});
