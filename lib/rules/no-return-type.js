const { ESLintUtils } = require('@typescript-eslint/utils');
const baseRule = require('@typescript-eslint/eslint-plugin').rules['explicit-function-return-type'];

module.exports = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`)({
  name: 'no-return-type',
  meta: {
    type: 'problem',
    docs: {
      description: 'This rule enforces that functions have an explicit return type annotation unless the function starts with "use" keyword',
      recommended: false,
    },
    schema: baseRule.meta.schema,
    messages: baseRule.meta.messages,
  },
  defaultOptions: baseRule.defaultOptions,
  create(context) {
    const originalRuleListener = baseRule.create(context);

    function shouldSkip(node) {
      if (node.id && node.id.name.startsWith('use')) {
        return true;
      }
      if (node.parent && node.parent.id && node.parent.id.name.startsWith('use')) {
        return true;
      }
      return node.parent && node.parent.type === 'VariableDeclarator' && node.parent.id && node.parent.id.name.startsWith('use');
    }

    function wrapListener(listener) {
      return function(node) {
        if (shouldSkip(node)) {
          return;
        }
        listener(node);
      };
    }

    const wrappedListeners = {};
    for (const [key, listener] of Object.entries(originalRuleListener)) {
      wrappedListeners[key] = wrapListener(listener);
    }

    return wrappedListeners;
  },
});
