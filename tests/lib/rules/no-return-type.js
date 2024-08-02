"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-return-type");
const { RuleTester } = require("eslint");
const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  languageOptions: {
    parser: typescriptParser,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
  },
});

ruleTester.run("no-return-type", rule, {
  valid: [
    "var useArrowFn = () => { return 'test'; };",
    "const showDropdown: () => string = () => { return 'asdf' };",
    "const showDropdown: () => void = () => {};",
    "node.addEventListener('click', () => {});",
    "node.addEventListener('click', function () {});",
    "const foo = arr.map(i => i * i);",
    `const remapList = (getIsSelectable?: GetIsSelectable) =>
      (list: ApiDtoElement[], state?: ListState<ListElementReference>): ListElementReference[] =>
        list.map((it) => {
          const { uid, ...dto } = it;
          return {
            uid,
            selected: state?.selectAll || false,
            selectable: getIsSelectable ? getIsSelectable(it) : true,
            ...dto,
          };
        });`,
    {
      code: `const rawStore = {
        isSet: (key: ConfigProperty) => key in state.properties && state.properties[key] !== null
      };`,
      options: [{ allowExpressions: true }],
    },
  ],

  invalid: [
    {
      code: "var arrowFn = () => 'test';",
      errors: [{ messageId: "missingReturnType", type: "ArrowFunctionExpression" }],
    },
    {
      code: "function test() {}",
      errors: [{ messageId: "missingReturnType", type: "FunctionDeclaration" }],
    },
    {
      code: "const fn = () => {};",
      errors: [{ messageId: "missingReturnType", type: "ArrowFunctionExpression" }],
    },
    {
      code: "export default () => {};",
      errors: [{ messageId: "missingReturnType", type: "ArrowFunctionExpression" }],
    },
  ],
});
