# Biome Suspicious Linter Instructions

1. **noApproximativeNumericConstant**: Use standard constants instead of approximated literals.
2. **noAssignInExpressions**: Disallow assignments in expressions.
3. **noAsyncPromiseExecutor**: Disallows using an async function as a Promise executor.
4. **noCatchAssign**: Disallow reassigning exceptions in catch clauses.
5. **noClassAssign**: Disallow reassigning class members.
6. **noCommentText**: Prevent comments from being inserted as text nodes.
7. **noCompareNegZero**: Disallow comparing against `-0`.
8. **noConfusingLabels**: Disallow labeled statements that are not loops.
9. **noConfusingVoidType**: Disallow `void` type outside of generic or return types.
10. **noConstEnum**: Disallow TypeScript `const enum`.
11. **noControlCharactersInRegex**: Prevent control characters in regex literals.
12. **noDebugger**: Disallow the use of `debugger`.
13. **noDocumentCookie**: Disallow direct assignments to `document.cookie`.
14. **noDoubleEquals**: Require the use of `===` and `!==`.
15. **noDuplicateCase**: Disallow duplicate case labels.
16. **noDuplicateClassMembers**: Disallow duplicate class members.
17. **noDuplicateElseIf**: Disallow duplicate conditions in `if-else-if` chains.
18. **noDuplicateJsxProps**: Prevent JSX props from being assigned multiple times.
19. **noDuplicateObjectKeys**: Disallow duplicate keys inside objects.
20. **noDuplicateParameters**: Disallow duplicate function parameter names.
21. **noEmptyInterface**: Disallow declaration of empty interfaces.
22. **noExplicitAny**: Disallow the `any` type usage.
23. **noExtraNonNullAssertion**: Prevent misuse of non-null assertion operator (`!`).
24. **noFallthroughSwitchClause**: Disallow fallthrough in `switch` clauses.
25. **noFunctionAssign**: Disallow reassigning function declarations.
26. **noGlobalAssign**: Disallow assigning to read-only global variables.
27. **noGlobalIsFinite**: Use `Number.isFinite` instead of global `isFinite`.
28. **noGlobalIsNan**: Use `Number.isNaN` instead of global `isNaN`.
29. **noImplicitAnyLet**: Disallow implicit `any` in variable declarations.
30. **noImportAssign**: Disallow assigning to imported bindings.
31. **noIrregularWhitespace**: Disallow irregular whitespace characters.
32. **noLabelVar**: Disallow labels that share a name with a variable.
33. **noMisleadingCharacterClass**: Disallow confusing character classes in regex.
34. **noMisleadingInstantiator**: Enforce proper use of `new` and `constructor`.
35. **noMisrefactoredShorthandAssign**: Disallow shorthand assign when variable appears on both sides.
36. **noNonNullAssertedOptionalChain**: Disallow non-null assertions after optional chaining.
37. **noOctalEscape**: Disallow octal escape sequences in strings.
38. **noPrototypeBuiltins**: Disallow direct use of `Object.prototype` built-ins.
39. **noRedeclare**: Disallow variable, function, or class redeclaration.
40. **noRedundantUseStrict**: Disallow redundant `"use strict"`.
41. **noSelfCompare**: Disallow self-comparison expressions.
42. **noShadowRestrictedNames**: Disallow shadowing of restricted names.
43. **noSparseArray**: Disallow sparse arrays (arrays with holes).
44. **noSuspiciousSemicolonInJsx**: Detect suspicious semicolons in JSX elements.
45. **noTemplateCurlyInString**: Disallow template literal placeholders in normal strings.
46. **noThenProperty**: Disallow use of `.then` property.
47. **noTsIgnore**: Disallow the `@ts-ignore` directive.
48. **noUnsafeDeclarationMerging**: Disallow unsafe interface-class declaration merging.
49. **noUnsafeNegation**: Disallow unsafe negation patterns.
50. **noUselessEscapeInString**: Disallow unnecessary escape characters in strings.
51. **noUselessRegexBackrefs**: Disallow useless regex backreferences.
52. **noWith**: Disallow `with` statements.
53. **useAdjacentOverloadSignatures**: Require adjacent overload signatures.
54. **useDefaultSwitchClauseLast**: Require `default` clause to be last in `switch`.
55. **useGetterReturn**: Enforce getters to always return a value.
56. **useGoogleFontDisplay**: Enforce proper `display` with Google Fonts.
57. **useIsArray**: Use `Array.isArray()` instead of `instanceof Array`.
58. **useIterableCallbackReturn**: Enforce consistent return values in iterable callbacks.
59. **useNamespaceKeyword**: Require `namespace` keyword instead of `module`.
60. **useDefaultSwitchClauseLast**: Enforce default clause last in switch statements.
