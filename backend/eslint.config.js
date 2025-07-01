// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,

  {
    ignores: ["node_modules", "dist"],
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
];
