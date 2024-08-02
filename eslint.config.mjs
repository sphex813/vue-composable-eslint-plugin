import pluginJs from "@eslint/js";
import pluginNode from "eslint-plugin-n";
import eslintPlugin from "eslint-plugin-eslint-plugin";
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
    pluginJs.configs.recommended,
    ...pluginNode.configs["flat/mixed-esm-and-cjs"],
    eslintPlugin.configs["flat/recommended"],
    {
        files: ["**/*.ts", "**/*.tsx"], // Apply these settings to TypeScript files
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            'no-return-type': 'error',
        },
    },
];
