# no-return-type
This ESLint rule enforces that functions have an explicit return type annotation unless the function name starts with the "use" keyword.

## Rule Details

The aim of this rule is to ensure that all functions have explicit return type annotations, promoting type safety and readability. However, functions whose names start with "use" are exempt from this requirement, aligning with common patterns in hooks or utility functions in frameworks like React.

## Rule Options

This rule inherits options from the `@typescript-eslint/explicit-function-return-type` rule. Here are the available options:

- **allowConciseArrowFunctionExpressionsStartingWithVoid**: boolean - Whether to allow arrow functions that start with the `void` keyword. Defaults to `false`.
- **allowDirectConstAssertionInArrowFunctions**: boolean - Whether to ignore arrow functions immediately returning a `as const` value. Defaults to `true`.
- **allowExpressions**: boolean - Whether to ignore function expressions (functions which are not part of a declaration). Defaults to `false`.
- **allowFunctionsWithoutTypeParameters**: boolean - Whether to ignore functions that don't have generic type parameters. Defaults to `false`.
- **allowHigherOrderFunctions**: boolean - Whether to ignore functions immediately returning another function expression. Defaults to `true`.
- **allowIIFEs**: boolean - Whether to ignore immediately invoked function expressions (IIFEs). Defaults to `false`.
- **allowTypedFunctionExpressions**: boolean - Whether to ignore type annotations on the variable of function expressions. Defaults to `true`.
- **allowedNames**: string[] - An array of function/method names that will not have their arguments or return values checked. Defaults to `[]`.

## Usage

To use this rule, add it to your ESLint configuration:

### Installation

First, ensure you have the required dependencies:

```bash
npm install --save-dev @typescript-eslint/utils @typescript-eslint/eslint-plugin

### Configuration

Add the rule to your ESLint configuration file:

```json
{
  "rules": {
    "composable-plugin/no-return-type": ["error", {
      "allowExpressions": false,
      "allowTypedFunctionExpressions": false,
      "allowHigherOrderFunctions": false,
      "allowDirectConstAssertionInArrowFunctions": false
    }]
  }
}
```

## Example

### Incorrect

```typescript
function fetchData() {
  return 'data';
}

const getData = () => {
  return 'data';
};
```

### Correct

```typescript
function fetchData(): string {
  return 'data';
}

const getData = (): string => {
  return 'data';
};

// Functions starting with "use" are exempt
function useData() {
  return 'data';
}

const useFetch = () => {
  return 'data';
};
```