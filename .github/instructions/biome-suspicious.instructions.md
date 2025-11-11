# Biome Suspicious Linter Instructions

| Rule name                                                                           | Description                                                    |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [noApproximativeNumericConstant](/linter/rules/no-approximative-numeric-constant)   | Use standard constants instead of approximated literals.       |
| [noAssignInExpressions](/linter/rules/no-assign-in-expressions)                     | Disallow assignments in expressions.                           |
| [noAsyncPromiseExecutor](/linter/rules/no-async-promise-executor)                   | Disallows using an async function as a Promise executor.       |
| [noCatchAssign](/linter/rules/no-catch-assign)                                      | Disallow reassigning exceptions in catch clauses.              |
| [noClassAssign](/linter/rules/no-class-assign)                                      | Disallow reassigning class members.                            |
| [noCommentText](/linter/rules/no-comment-text)                                      | Prevent comments from being inserted as text nodes.            |
| [noCompareNegZero](/linter/rules/no-compare-neg-zero)                               | Disallow comparing against `-0`.                               |
| [noConfusingLabels](/linter/rules/no-confusing-labels)                              | Disallow labeled statements that are not loops.                |
| [noConfusingVoidType](/linter/rules/no-confusing-void-type)                         | Disallow `void` type outside of generic or return types.       |
| [noConstEnum](/linter/rules/no-const-enum)                                          | Disallow TypeScript `const enum`.                              |
| [noControlCharactersInRegex](/linter/rules/no-control-characters-in-regex)          | Prevent control characters in regex literals.                  |
| [noDebugger](/linter/rules/no-debugger)                                             | Disallow the use of `debugger`.                                |
| [noDocumentCookie](/linter/rules/no-document-cookie)                                | Disallow direct assignments to `document.cookie`.              |
| [noDoubleEquals](/linter/rules/no-double-equals)                                    | Require the use of `===` and `!==`.                            |
| [noDuplicateCase](/linter/rules/no-duplicate-case)                                  | Disallow duplicate case labels.                                |
| [noDuplicateClassMembers](/linter/rules/no-duplicate-class-members)                 | Disallow duplicate class members.                              |
| [noDuplicateElseIf](/linter/rules/no-duplicate-else-if)                             | Disallow duplicate conditions in `if-else-if` chains.          |
| [noDuplicateJsxProps](/linter/rules/no-duplicate-jsx-props)                         | Prevent JSX props from being assigned multiple times.          |
| [noDuplicateObjectKeys](/linter/rules/no-duplicate-object-keys)                     | Disallow duplicate keys inside objects.                        |
| [noDuplicateParameters](/linter/rules/no-duplicate-parameters)                      | Disallow duplicate function parameter names.                   |
| [noEmptyInterface](/linter/rules/no-empty-interface)                                | Disallow declaration of empty interfaces.                      |
| [noExplicitAny](/linter/rules/no-explicit-any)                                      | Disallow the `any` type usage.                                 |
| [noExtraNonNullAssertion](/linter/rules/no-extra-non-null-assertion)                | Prevent misuse of non-null assertion operator (`!`).           |
| [noFallthroughSwitchClause](/linter/rules/no-fallthrough-switch-clause)             | Disallow fallthrough in `switch` clauses.                      |
| [noFunctionAssign](/linter/rules/no-function-assign)                                | Disallow reassigning function declarations.                    |
| [noGlobalAssign](/linter/rules/no-global-assign)                                    | Disallow assigning to read-only global variables.              |
| [noGlobalIsFinite](/linter/rules/no-global-is-finite)                               | Use `Number.isFinite` instead of global `isFinite`.            |
| [noGlobalIsNan](/linter/rules/no-global-is-nan)                                     | Use `Number.isNaN` instead of global `isNaN`.                  |
| [noImplicitAnyLet](/linter/rules/no-implicit-any-let)                               | Disallow implicit `any` in variable declarations.              |
| [noImportAssign](/linter/rules/no-import-assign)                                    | Disallow assigning to imported bindings.                       |
| [noIrregularWhitespace](/linter/rules/no-irregular-whitespace)                      | Disallow irregular whitespace characters.                      |
| [noLabelVar](/linter/rules/no-label-var)                                            | Disallow labels that share a name with a variable.             |
| [noMisleadingCharacterClass](/linter/rules/no-misleading-character-class)           | Disallow confusing character classes in regex.                 |
| [noMisleadingInstantiator](/linter/rules/no-misleading-instantiator)                | Enforce proper use of `new` and `constructor`.                 |
| [noMisrefactoredShorthandAssign](/linter/rules/no-misrefactored-shorthand-assign)   | Disallow shorthand assign when variable appears on both sides. |
| [noNonNullAssertedOptionalChain](/linter/rules/no-non-null-asserted-optional-chain) | Disallow non-null assertions after optional chaining.          |
| [noOctalEscape](/linter/rules/no-octal-escape)                                      | Disallow octal escape sequences in strings.                    |
| [noPrototypeBuiltins](/linter/rules/no-prototype-builtins)                          | Disallow direct use of `Object.prototype` built-ins.           |
| [noRedeclare](/linter/rules/no-redeclare)                                           | Disallow variable, function, or class redeclaration.           |
| [noRedundantUseStrict](/linter/rules/no-redundant-use-strict)                       | Disallow redundant `"use strict"`.                             |
| [noSelfCompare](/linter/rules/no-self-compare)                                      | Disallow self-comparison expressions.                          |
| [noShadowRestrictedNames](/linter/rules/no-shadow-restricted-names)                 | Disallow shadowing of restricted names.                        |
| [noSparseArray](/linter/rules/no-sparse-array)                                      | Disallow sparse arrays (arrays with holes).                    |
| [noSuspiciousSemicolonInJsx](/linter/rules/no-suspicious-semicolon-in-jsx)          | Detect suspicious semicolons in JSX elements.                  |
| [noTemplateCurlyInString](/linter/rules/no-template-curly-in-string)                | Disallow template literal placeholders in normal strings.      |
| [noThenProperty](/linter/rules/no-then-property)                                    | Disallow use of `.then` property.                              |
| [noTsIgnore](/linter/rules/no-ts-ignore)                                            | Disallow the `@ts-ignore` directive.                           |
| [noUnsafeDeclarationMerging](/linter/rules/no-unsafe-declaration-merging)           | Disallow unsafe interface-class declaration merging.           |
| [noUnsafeNegation](/linter/rules/no-unsafe-negation)                                | Disallow unsafe negation patterns.                             |
| [noUselessEscapeInString](/linter/rules/no-useless-escape-in-string)                | Disallow unnecessary escape characters in strings.             |
| [noUselessRegexBackrefs](/linter/rules/no-useless-regex-backrefs)                   | Disallow useless regex backreferences.                         |
| [noWith](/linter/rules/no-with)                                                     | Disallow `with` statements.                                    |
| [useAdjacentOverloadSignatures](/linter/rules/use-adjacent-overload-signatures)     | Require adjacent overload signatures.                          |
| [useDefaultSwitchClauseLast](/linter/rules/use-default-switch-clause-last)          | Require `default` clause to be last in `switch`.               |
| [useGetterReturn](/linter/rules/use-getter-return)                                  | Enforce getters to always return a value.                      |
| [useGoogleFontDisplay](/linter/rules/use-google-font-display)                       | Enforce proper `display` with Google Fonts.                    |
| [useIsArray](/linter/rules/use-is-array)                                            | Use `Array.isArray()` instead of `instanceof Array`.           |
| [useIterableCallbackReturn](/linter/rules/use-iterable-callback-return)             | Enforce consistent return values in iterable callbacks.        |
| [useNamespaceKeyword](/linter/rules/use-namespace-keyword)                          | Require `namespace` keyword instead of `module`.               |
| [useDefaultSwitchClauseLast](/linter/rules/use-default-switch-clause-last)          | Enforce default clause last in switch statements.              |
