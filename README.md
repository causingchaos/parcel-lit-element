**Base config for LitElement (WebComponents)**
Note: This is ONLY for front end code, goal is to create a lightweight base project package.
Note*: DOES NOT SUPPORT IE or OLD EDGE

*Packager*:
Parcel no-config bundler (https://parceljs.org/getting_started.html)

*Framework*
Webcomponents - LitElement (https://lit-element.polymer-project.org/)
Note: This uses the shadow dom, and web component standard(s)

* WebComponents (shadow dom compatiable) *
Vaadin-components (https://vaadin.com/components)
UI5 components (https://sap.github.io/ui5-webcomponents/)  TO BE ADDED
Elix components (https://component.kitchen/elix) TO BE ADDED

*Styles*
Since styles from other components can't penetrate the shadowDOM of other components, a global theme for base colors needs to be defined, i.e. Vaadin lumo base theme.
Vaadin lumo base theme (https://vaadin.com/docs/themes/lumo/lumo-overview.html)
CSS templates (LitElement) defined in .JS files.

*Router*
vaadin-router (https://vaadin.com/router)

State management
Mobx v5  (https://mobx.js.org/README.html) -- TO BE ADDED

Validation
Joi -- (https://joi.dev/) -- TO BE ADDED

Component management utility
Storybook (https://storybook.js.org/)  -- TO BE ADDED

Code Base
99% Javascript ES6+
1% HTML
CSS JS templated (LitElement built in)

**Getting Started
[] npm install
[] npm run dev     - dev server on http://localhost:1234
[] npm run build   - build script with parcel (bundle package into build folder)

***
*stretch goals*
[] Add server.js, and add new script npm run build:server -- build project with parcel, then run nodeJS server on port 8080.
[] Add typescript clone of this base config
