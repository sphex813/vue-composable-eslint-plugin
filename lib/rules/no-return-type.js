/**
 * @fileoverview This rule enforces that functions do have an explicit return type annotation unless the function starts with use keyword
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'layout', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "This rule enforces that functions do have an explicit return type annotation unless the function starts with use keyword",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {missingReturnType: "Function '{{name}}' must have an explicit return type annotation."},
  },

  create(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    /**
     * Check if the function has an explicit return type
     * @param {ASTNode} node - The function node to check
     * @returns {boolean} True if the function has an explicit return type, false otherwise
     */
    function hasExplicitReturnType(node) {
      if (node.returnType) {
        return true;
      }
      if (node.parent.type === 'VariableDeclarator' && node.parent.id.typeAnnotation) {
        return true;
      }
      if (node.parent.type === 'Property' && node.parent.value.typeAnnotation) {
        return true;
      }
      return false;
    }

    /**
     * Check if the function name starts with "use"
     * @param {string} name - The function name to check
     * @returns {boolean} True if the function name starts with "use", false otherwise
     */
    function startsWithUseKeyword(name) {
      return name.startsWith('use');
    }

    /**
     * Report if a function does not have an explicit return type
     * @param {ASTNode} node - The function node to report
     */
    function reportMissingReturnType(node) {
      context.report({
        node,
        messageId: 'missingReturnType',
        data: {
          name: node.id ? node.id.name : 'Anonymous function',
        },
      });
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      FunctionDeclaration(node) {
        if (!startsWithUseKeyword(node.id.name) && !hasExplicitReturnType(node)) {
          reportMissingReturnType(node);
        }
      },
      FunctionExpression(node) {
        if (node.id && !startsWithUseKeyword(node.id.name) && !hasExplicitReturnType(node)) {
          reportMissingReturnType(node);
        }
      },
      ArrowFunctionExpression(node) {
        if (node.parent.type === 'VariableDeclarator' && !startsWithUseKeyword(node.parent.id.name) && !hasExplicitReturnType(node)) {
          reportMissingReturnType(node);
        }
      },
    };
  },
};
