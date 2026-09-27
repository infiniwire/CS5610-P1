import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "docs/**"],
  },
  {
    files: ["js/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
  },
  {
    files: ["eslint.config.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
  },
];
