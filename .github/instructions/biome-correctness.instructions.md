# Biome Correctness Linter Instructions

| Rule name                                                                        | Description                                                           |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [noConstAssign](/linter/rules/no-const-assign)                                   | Prevent `const` variables from being re-assigned.                     |
| [noConstantCondition](/linter/rules/no-constant-condition)                       | Disallow constant expressions in conditions.                          |
| [noConstantMathMinMaxClamp](/linter/rules/no-constant-math-min-max-clamp)        | Disallow using `Math.min` or `Math.max` when the result is constant.  |
| [noConstructorReturn](/linter/rules/no-constructor-return)                       | Disallow returning a value from a `constructor`.                      |
| [noEmptyCharacterClassInRegex](/linter/rules/no-empty-character-class-in-regex)  | Disallow empty character classes in regular expressions.              |
| [noEmptyPattern](/linter/rules/no-empty-pattern)                                 | Disallow empty destructuring patterns.                                |
| [noGlobalObjectCalls](/linter/rules/no-global-object-calls)                      | Disallow calling global object properties as functions.               |
| [noInnerDeclarations](/linter/rules/no-inner-declarations)                       | Disallow `function` and `var` declarations outside their block scope. |
| [noInvalidBuiltinInstantiation](/linter/rules/no-invalid-builtin-instantiation)  | Ensure built-in objects are correctly instantiated.                   |
| [noInvalidConstructorSuper](/linter/rules/no-invalid-constructor-super)          | Prevent incorrect or missing `super()` in derived classes.            |
| [noInvalidUseBeforeDeclaration](/linter/rules/no-invalid-use-before-declaration) | Disallow using variables or parameters before declaration.            |
| [noNonoctalDecimalEscape](/linter/rules/no-nonoctal-decimal-escape)              | Disallow `\8` and `\9` escape sequences in strings.                   |
| [noPrecisionLoss](/linter/rules/no-precision-loss)                               | Disallow number literals that lose precision.                         |
| [noSelfAssign](/linter/rules/no-self-assign)                                     | Disallow assignments where both sides are identical.                  |
| [noSetterReturn](/linter/rules/no-setter-return)                                 | Disallow returning values from setters.                               |
| [noStringCaseMismatch](/linter/rules/no-string-case-mismatch)                    | Disallow string comparisons with mismatched casing.                   |
| [noSwitchDeclarations](/linter/rules/no-switch-declarations)                     | Disallow lexical declarations inside `switch` clauses.                |
| [noUnreachable](/linter/rules/no-unreachable)                                    | Disallow unreachable code.                                            |
| [noUnreachableSuper](/linter/rules/no-unreachable-super)                         | Ensure `super()` is called exactly once before using `this`.          |
| [noUnsafeFinally](/linter/rules/no-unsafe-finally)                               | Disallow control flow statements in `finally` blocks.                 |
| [noUnsafeOptionalChaining](/linter/rules/no-unsafe-optional-chaining)            | Disallow unsafe usage of optional chaining.                           |
| [noUnusedFunctionParameters](/linter/rules/no-unused-function-parameters)        | Disallow unused function parameters.                                  |
| [noUnusedImports](/linter/rules/no-unused-imports)                               | Disallow unused imports.                                              |
| [noUnusedLabels](/linter/rules/no-unused-labels)                                 | Disallow unused labels.                                               |
| [noUnusedPrivateClassMembers](/linter/rules/no-unused-private-class-members)     | Disallow unused private class members.                                |
| [noUnusedVariables](/linter/rules/no-unused-variables)                           | Disallow unused variables.                                            |
| [noVoidElementsWithChildren](/linter/rules/no-void-elements-with-children)       | Disallow children in void (self-closing) elements.                    |
| [noVoidTypeReturn](/linter/rules/no-void-type-return)                            | Disallow returning values from functions typed `void`.                |
| [useIsNan](/linter/rules/use-is-nan)                                             | Require `isNaN()` when checking for `NaN`.                            |
| [useParseIntRadix](/linter/rules/use-parse-int-radix)                            | Require specifying radix in `parseInt()`.                             |
| [useValidForDirection](/linter/rules/use-valid-for-direction)                    | Ensure `for` loops update the counter in the correct direction.       |
| [useValidTypeof](/linter/rules/use-valid-typeof)                                 | Ensure `typeof` comparisons use valid values.                         |
| [useYield](/linter/rules/use-yield)                                              | Require `yield` inside generator functions.                           |
