**Base config for LitElement (WebComponents)**
</br>
Note: This is ONLY for front end code, goal is to create a lightweight base project package.
</br>
Note*: DOES NOT SUPPORT IE or OLD EDGE
</br>

*Packager*:
</br>
[x] Parcel no-config bundler (https://parceljs.org/getting_started.html)
</br>

*Framework*
</br>
[x] Webcomponents - LitElement (https://lit-element.polymer-project.org/)
</br>
Note: This uses the shadow dom, and web component standard(s)
</br>

*WebComponents (shadow dom compatiable)*
</br>
[x] Vaadin-components (https://vaadin.com/components)
</br>
[] UI5 components (https://sap.github.io/ui5-webcomponents/)  TO BE ADDED
</br>
[] Elix components (https://component.kitchen/elix) TO BE ADDED
</br>

*Styles*
</br>
Since styles from other components can't penetrate the shadowDOM of other components, a global theme for base colors needs to be defined, i.e. Vaadin lumo base theme.
</br>
[x] Vaadin lumo base theme (https://vaadin.com/docs/themes/lumo/lumo-overview.html)
</br>
[x] CSS templates (LitElement) defined in .JS files.
</br>

*Router*
</br>
[x] vaadin-router (https://vaadin.com/router)
</br>

*State management*
</br>
[] Mobx v5  (https://mobx.js.org/README.html) -- TO BE ADDED
</br>

*Form/API call Validation*
</br>
[] Joi -- (https://joi.dev/) -- TO BE ADDED
</br>

*Component management utility*
</br>
[] Storybook (https://storybook.js.org/)  -- TO BE ADDED
</br>

*Code Base*
</br>
[x] 99% Javascript ES6+
</br>
[x] 1% HTML
</br>
[x] CSS JS templated (LitElement built in)
</br>

**Getting Started
</br>
$npm install
</br>
$npm run dev     - dev server on http://localhost:1234
</br>
$npm run build   - build script with parcel (bundle package into build folder)
</br>
$npm run build:server  - runs server using http-server (run build first) https://www.npmjs.com/package/http-server
***

*stretch goals*
</br>
[x] Add server.js, and add new script npm run build:server -- build project with parcel, then run nodeJS server on port 8080.
</br>
[] Create typescript clone of this base config (parcel-lit-element-ts)
</br>
