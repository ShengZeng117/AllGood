## Coding standard

#####CSS

- Use soft-tabs with a two space indent.
- Use double quotes.
- Use shorthand notation where possible.
- Put spaces after : in property declarations.
- Put spaces before { in rule declarations.
- Use hex color codes #000 unless using rgba().
- Always provide fallback properties for older browsers.
- Use one line per property declaration.
- Always follow a rule with one line of whitespace.
- Always quote url() and @import() contents.
- Do not indent blocks.
- All ids, classes and attributes must be lowercase with hyphens used for separation.
- Comments should be used liberally to explain anything that may be unclear at first glance, especially IE workarounds or hacks.
- Try keep all selectors loosely grouped into modules where possible and avoid having too many selectors in one declaration to make them easy to override.

#####HTML

- All HTML documents must use two spaces for indentation and there should be no trailing whitespace. 
- HTML5 syntax must be used and all attributes must use double quotes around attributes.
- All documents must be using the HTML5 doctype and the html element should have a "lang" attribute. 
- The head should also at a minimum include "viewport" and "charset" meta tags.
- Form fields must always include a label element with a "for" attribute matching the "id" on the input.
- Each input should have an "id" that is unique to the page. It does not have to match the "name" attribute.
- Classes should ideally only be used as styling hooks.

#####JavaScript

- Two spaces must be used for indentation at all times.
- Single quotes should be used everywhere unless writing JSON or the string contains them.
- One var statement must be used per variable assignment.
- All properties, functions and methods must use lowercase camelCase.
- Single line comments should be used for all inline comments that do not form part of the documentation.
- All JavaScript should pass JSHint before being committed.
- The documentation should provide enough information to show the reader what the method does, arguments it accepts and a general example of usage.