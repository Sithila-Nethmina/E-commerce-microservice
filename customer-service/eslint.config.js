import { fileURLToPath } from "url";
import { dirname } from "path";
import eslint from "@eslint/js";
import * as tseslint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  // Global Ignores (Avoid linting compiled outputs and config files)
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "eslint.config.js",
      "jest.config.js",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
);
