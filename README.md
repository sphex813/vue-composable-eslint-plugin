# eslint-plugin-composable-plugin

Plugin that adds rule to allow define Vue composables without return type

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
        "composable-plugin/rule-name": 2
    }
}
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                           | Description                                                                                                             | 🔧 |
| :--------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :- |
| [no-return-type](docs/rules/no-return-type.md) | This rule enforces that functions have an explicit return type annotation unless the function starts with 'use' keyword | 🔧 |

<!-- end auto-generated rules list -->


