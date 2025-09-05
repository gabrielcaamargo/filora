import json from "@eslint/json";
import { defineConfig } from "eslint/config";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  { ignores: ["**/*.js", "**/*.cjs", "**/*.mjs"] },
  {
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": "warn",
      "import/order": [
        "error",
        {
          groups: ["external", "builtin", "internal", "parent", "sibling"],
          pathGroups: [
            {
              pattern: "react+(|-native)",
              group: "external",
              position: "before",
            },
            {
              pattern: "@+(routes|screens|components|hooks|theme)",
              group: "internal",
              position: "before",
            },
            {
              pattern: "./",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react+(|-native)"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
]);
