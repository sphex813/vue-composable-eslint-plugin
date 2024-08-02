# eslint-plugin-composable-plugin

Plugin that adds a rule to allow defining Vue composables without a return type.

## Overview

This ESLint plugin provides a rule that extends the functionality of the `@typescript-eslint/explicit-function-return-type` rule. It allows defining Vue composables without specifying an explicit return type, with one key difference: it excludes functions that start with the 'use' keyword.

## Rule Details

This rule uses all the options available from the extended rule, which can be found [here](https://typescript-eslint.io/rules/explicit-function-return-type). The main functionality is similar, with the exception that functions starting with 'use' are excluded from this rule.

## Options

```ts
type Options = [
  {
    /** Whether to allow arrow functions that start with the `void` keyword. */
    allowConciseArrowFunctionExpressionsStartingWithVoid?: boolean;
    /** Whether to ignore arrow functions immediately returning a `as const` value. */
    allowDirectConstAssertionInArrowFunctions?: boolean;
    /** Whether to ignore function expressions (functions which are not part of a declaration). */
    allowExpressions?: boolean;
    /** Whether to ignore functions that don't have generic type parameters. */
    allowFunctionsWithoutTypeParameters?: boolean;
    /** Whether to ignore functions immediately returning another function expression. */
    allowHigherOrderFunctions?: boolean;
    /** Whether to ignore immediately invoked function expressions (IIFEs). */
    allowIIFEs?: boolean;
    /** Whether to ignore type annotations on the variable of function expressions. */
    allowTypedFunctionExpressions?: boolean;
    /** An array of function/method names that will not have their arguments or return values checked. */
    allowedNames?: string[];
  },
];

const defaultOptions: Options = [
  {
    allowExpressions: false,
    allowTypedFunctionExpressions: true,
    allowHigherOrderFunctions: true,
    allowDirectConstAssertionInArrowFunctions: true,
    allowConciseArrowFunctionExpressionsStartingWithVoid: false,
    allowFunctionsWithoutTypeParameters: false,
    allowedNames: [],
    allowIIFEs: false,
  },
];
```

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-composable-plugin`:

```sh
npm install eslint-plugin-composable-plugin --save-dev
```

## Usage

Add `composable-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "composable-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "composable-plugin/no-return-type": 'error'
    }
}
```

## Rules

<!-- begin auto-generated rules list -->

| Name                                           | Description                                                                                                             |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| [no-return-type](docs/rules/no-return-type.md) | This rule enforces that functions have an explicit return type annotation unless the function starts with "use" keyword |

<!-- end auto-generated rules list -->


