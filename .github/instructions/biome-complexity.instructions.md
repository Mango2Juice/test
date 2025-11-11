# Biome Complexity Linter Instructions

| Rule name                                                                             | Description                                                                                     |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [noAdjacentSpacesInRegex](/linter/rules/no-adjacent-spaces-in-regex)                  | Disallow unclear usage of consecutive space characters in regular expression literals           |
| [noArguments](/linter/rules/no-arguments)                                             | Disallow the use of `arguments`.                                                                |
| [noBannedTypes](/linter/rules/no-banned-types)                                        | Disallow primitive type aliases and misleading types.                                           |
| [noCommaOperator](/linter/rules/no-comma-operator)                                    | Disallow comma operator.                                                                        |
| [noEmptyTypeParameters](/linter/rules/no-empty-type-parameters)                       | Disallow empty type parameters in type aliases and interfaces.                                  |
| [noExtraBooleanCast](/linter/rules/no-extra-boolean-cast)                             | Disallow unnecessary boolean casts.                                                             |
| [noFlatMapIdentity](/linter/rules/no-flat-map-identity)                               | Disallow unnecessary callback on `flatMap`.                                                     |
| [noStaticOnlyClass](/linter/rules/no-static-only-class)                               | Disallow classes with only static members.                                                      |
| [noThisInStatic](/linter/rules/no-this-in-static)                                     | Disallow `this` and `super` in `static` contexts.                                               |
| [noUselessCatch](/linter/rules/no-useless-catch)                                      | Disallow unnecessary `catch` clauses.                                                           |
| [noUselessConstructor](/linter/rules/no-useless-constructor)                          | Disallow unnecessary constructors.                                                              |
| [noUselessContinue](/linter/rules/no-useless-continue)                                | Avoid using unnecessary `continue`.                                                             |
| [noUselessEmptyExport](/linter/rules/no-useless-empty-export)                         | Disallow empty exports that don't change anything.                                              |
| [noUselessEscapeInRegex](/linter/rules/no-useless-escape-in-regex)                    | Disallow unnecessary escape sequences in regular expressions.                                   |
| [noUselessFragments](/linter/rules/no-useless-fragments)                              | Disallow unnecessary fragments.                                                                 |
| [noUselessLabel](/linter/rules/no-useless-label)                                      | Disallow unnecessary labels.                                                                    |
| [noUselessLoneBlockStatements](/linter/rules/no-useless-lone-block-statements)        | Disallow unnecessary nested block statements.                                                   |
| [noUselessRename](/linter/rules/no-useless-rename)                                    | Disallow renaming imports, exports, or destructuring to the same name.                          |
| [noUselessStringRaw](/linter/rules/no-useless-string-raw)                             | Disallow unnecessary `String.raw()` without escape sequences.                                   |
| [noUselessSwitchCase](/linter/rules/no-useless-switch-case)                           | Disallow useless `case` clauses in `switch` statements.                                         |
| [noUselessTernary](/linter/rules/no-useless-ternary)                                  | Disallow ternary operators when simpler alternatives exist.                                     |
| [noUselessThisAlias](/linter/rules/no-useless-this-alias)                             | Disallow useless `this` aliasing.                                                               |
| [noUselessTypeConstraint](/linter/rules/no-useless-type-constraint)                   | Disallow using `any` or `unknown` as type constraints.                                          |
| [noUselessUndefinedInitialization](/linter/rules/no-useless-undefined-initialization) | Disallow initializing variables to `undefined`.                                                 |
| [useArrowFunction](/linter/rules/use-arrow-function)                                  | Prefer arrow functions over function expressions.                                               |
| [useDateNow](/linter/rules/use-date-now)                                              | Use `Date.now()` to get the number of milliseconds since Unix Epoch.                            |
| [useFlatMap](/linter/rules/use-flat-map)                                              | Prefer `.flatMap()` over `map().flat()`.                                                        |
| [useIndexOf](/linter/rules/use-index-of)                                              | Prefer `indexOf`/`lastIndexOf` instead of `findIndex`/`findLastIndex` when searching for index. |
| [useLiteralKeys](/linter/rules/use-literal-keys)                                      | Enforce literal property access over computed property access.                                  |
| [useNumericLiterals](/linter/rules/use-numeric-literals)                              | Prefer numeric literals over `parseInt()` or `Number.parseInt()`.                               |
| [useOptionalChain](/linter/rules/use-optional-chain)                                  | Prefer concise optional chaining over chained logical expressions.                              |
| [useRegexLiterals](/linter/rules/use-regex-literals)                                  | Enforce regex literals instead of the `RegExp` constructor where possible.                      |
| [useSimpleNumberKeys](/linter/rules/use-simple-number-keys)                           | Disallow non-base-10 or underscored number literal property names.                              |

---
