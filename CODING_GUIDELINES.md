# Coding guidelines

If you plan on contributing to systelab-virtual-keyboard, please start reading the code conventions at https://github.com/systelab/systelab-angular-doc.

We will check each of them during the review process, but knowing about them ahead of time will reduce the number of iterations.

## General guidelines

- No hard-coded text anywhere.
- Ensure your components are accessible.
- Always write components for full customizability, then add shortcuts to it. Writing the other way, limited features which you extend later, leads to blocking issues that users can't work around.

## SCSS styles

- No hard-coded colors, always use the existing helpers and variables.
- Always respect our baseline for vertical rhythm.

## HTML templates

- Any text displayed to the user should be projected, never received from inputs or attributes. This always allows better customizability, and prevents blocking issues (or even security issues)if said text can contain HTML tags or interpolation.

## Typescript code

- The general convention for selectors is `systelab-[component-name]` in kebab case (e.g. `systelab-virtual-keyboard`).
- All of the components, directives, inputs and outputs in the showcase must use the Showcase prefix to avoid conflicts with other components and directives. The general convention for selectors is showcase-[component-name] in kebab case (e.g. showcase-combobox).
- No HTTP requests. Handling them ourselves makes our user's unit tests very hard to write, 
and it also forces their server to conform to our object format.
- Full unit testing coverage.
- Provide inputs for all states and outputs for all internal or end-user actions.
- Do not manipulate HTML elements directly.
