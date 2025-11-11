# Biome Accessibility Linter Instructions

1. **[noAccessKey](/linter/rules/no-access-key)**
   Enforce that the `accessKey` attribute is not used on any HTML element.

2. **[noAriaHiddenOnFocusable](/linter/rules/no-aria-hidden-on-focusable)**
   Enforce that `aria-hidden="true"` is not set on focusable elements.

3. **[noAriaUnsupportedElements](/linter/rules/no-aria-unsupported-elements)**
   Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.

4. **[noAutofocus](/linter/rules/no-autofocus)**
   Enforce that `autoFocus` prop is not used on elements.

5. **[noDistractingElements](/linter/rules/no-distracting-elements)**
   Enforce that no distracting elements are used.

6. **[noHeaderScope](/linter/rules/no-header-scope)**
   The `scope` prop should be used only on `<th>` elements.

7. **[noInteractiveElementToNoninteractiveRole](/linter/rules/no-interactive-element-to-noninteractive-role)**
   Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.

8. **[noLabelWithoutControl](/linter/rules/no-label-without-control)**
   Enforce that a `<label>` element or component has a text label and an associated input.

9. **[noNoninteractiveElementToInteractiveRole](/linter/rules/no-noninteractive-element-to-interactive-role)**
   Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements.

10. **[noNoninteractiveTabindex](/linter/rules/no-noninteractive-tabindex)**
    Enforce that `tabIndex` is not assigned to non-interactive HTML elements.

11. **[noPositiveTabindex](/linter/rules/no-positive-tabindex)**
    Prevent the usage of positive integers on `tabIndex`.

12. **[noRedundantAlt](/linter/rules/no-redundant-alt)**
    Enforce that `img` alt text does not contain redundant words like "image" or "photo".

13. **[noRedundantRoles](/linter/rules/no-redundant-roles)**
    Prevent assigning explicit roles that duplicate implicit roles.

14. **[noStaticElementInteractions](/linter/rules/no-static-element-interactions)**
    Enforce that static elements with click handlers use valid roles.

15. **[noSvgWithoutTitle](/linter/rules/no-svg-without-title)**
    Require a `<title>` element inside every `<svg>`.

16. **[useAltText](/linter/rules/use-alt-text)**
    Require meaningful alt text for elements needing alternative text.

17. **[useAnchorContent](/linter/rules/use-anchor-content)**
    Ensure that `<a>` elements have accessible, meaningful content.

18. **[useAriaActivedescendantWithTabindex](/linter/rules/use-aria-activedescendant-with-tabindex)**
    Require `tabIndex` for non-interactive elements using `aria-activedescendant`.

19. **[useAriaPropsForRole](/linter/rules/use-aria-props-for-role)**
    Ensure that elements with ARIA roles include all required ARIA attributes.

20. **[useAriaPropsSupportedByRole](/linter/rules/use-aria-props-supported-by-role)**
    Enforce that ARIA properties are valid for the element’s supported roles.

21. **[useButtonType](/linter/rules/use-button-type)**
    Require the `type` attribute on `<button>` elements.

22. **[useFocusableInteractive](/linter/rules/use-focusable-interactive)**
    Ensure interactive roles with handlers are focusable.

23. **[useHeadingContent](/linter/rules/use-heading-content)**
    Require heading elements (`<h1>`–`<h6>`) to have accessible content.

24. **[useHtmlLang](/linter/rules/use-html-lang)**
    Require the `<html>` element to have a `lang` attribute.

25. **[useIframeTitle](/linter/rules/use-iframe-title)**
    Require the `title` attribute on `<iframe>` elements.

26. **[useKeyWithClickEvents](/linter/rules/use-key-with-click-events)**
    Require keyboard event handlers (`onKeyUp`, `onKeyDown`, etc.) with `onClick`.

27. **[useKeyWithMouseEvents](/linter/rules/use-key-with-mouse-events)**
    Require `onFocus`/`onBlur` alongside `onMouseOver`/`onMouseOut`.

28. **[useMediaCaption](/linter/rules/use-media-caption)**
    Enforce that `<audio>` and `<video>` elements include captions.

29. **[useSemanticElements](/linter/rules/use-semantic-elements)**
    Suggest semantic HTML elements instead of generic elements with `role` attributes.

30. **[useValidAnchor](/linter/rules/use-valid-anchor)**
    Enforce that `<a>` elements are valid and navigable.

31. **[useValidAriaProps](/linter/rules/use-valid-aria-props)**
    Ensure that all `aria-*` properties are valid.

32. **[useValidAriaRole](/linter/rules/use-valid-aria-role)**
    Ensure that ARIA roles are valid and non-abstract.

33. **[useValidAriaValues](/linter/rules/use-valid-aria-values)**
    Enforce valid ARIA state and property values.

34. **[useValidAutocomplete](/linter/rules/use-valid-autocomplete)**
    Require valid values for the `autocomplete` attribute on inputs.

35. **[useValidLang](/linter/rules/use-valid-lang)**
    Ensure that the `lang` attribute uses valid ISO codes.

---
