// eagerly import theme styles so as we can override them
//import '@vaadin/vaadin-lumo-styles/all-imports';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<custom-style>
  <style include="lumo-color lumo-typography"></style>
  <style>
html {
  --lumo-font-family: "Segoe UI", Candara, "Bitstream Vera Sans", "DejaVu Sans", "Bitstream Vera Sans", "Trebuchet MS", Verdana, "Verdana Ref", sans-serif;
  --lumo-primary-text-color: rgb(0, 113, 188);
  --lumo-primary-color-50pct: rgba(0, 113, 188, 0.5);
  --lumo-primary-color-10pct: rgba(0, 113, 188, 0.1);
  --lumo-primary-color: #0071BC;
}
body{
  background-color: #212121;   
  padding: 20px;
}

[theme~="dark"] {
  --lumo-base-color: #121212;
  --lumo-shade-5pct: rgba(53, 60, 69, 0.05);
  --lumo-shade-10pct: rgba(53, 60, 69, 0.1);
  --lumo-shade-20pct: rgba(53, 60, 69, 0.2);
  --lumo-shade-30pct: rgba(53, 60, 69, 0.3);
  --lumo-shade-40pct: rgba(53, 60, 69, 0.4);
  --lumo-shade-50pct: rgba(53, 60, 69, 0.5);
  --lumo-shade-60pct: rgba(53, 60, 69, 0.6);
  --lumo-shade-70pct: rgba(53, 60, 69, 0.7);
  --lumo-shade-80pct: rgba(53, 60, 69, 0.8);
  --lumo-shade-90pct: rgba(53, 60, 69, 0.9);
  --lumo-shade: hsl(214, 13%, 24%);
  --lumo-primary-text-color: rgb(0, 113, 188);
  --lumo-primary-color-50pct: rgba(0, 113, 188, 0.5);
  --lumo-primary-color-10pct: rgba(0, 113, 188, 0.1);
  --lumo-primary-color: #0071BC;
  --lumo-error-text-color: rgb(191, 0, 0);
  --lumo-error-color-50pct: rgba(191, 0, 0, 0.5);
  --lumo-error-color-10pct: rgba(191, 0, 0, 0.1);
  --lumo-error-color: #BF0000;
  --lumo-header-text-color: #CFD8DC;
  --lumo-primary-contrast-color: #CFD8DC;
  --lumo-tint-5pct: rgba(207, 216, 220, 0.05);
  --lumo-tint-10pct: rgba(207, 216, 220, 0.1);
  --lumo-tint-20pct: rgba(207, 216, 220, 0.2);
  --lumo-tint-30pct: rgba(207, 216, 220, 0.3);
  --lumo-tint-40pct: rgba(207, 216, 220, 0.4);
  --lumo-tint-50pct: rgba(207, 216, 220, 0.5);
  --lumo-tint-60pct: rgba(207, 216, 220, 0.6);
  --lumo-tint-70pct: rgba(207, 216, 220, 0.7);
  --lumo-tint-80pct: rgba(207, 216, 220, 0.8);
  --lumo-tint-90pct: rgba(207, 216, 220, 0.9);
  --lumo-tint: #CFD8DC;
}

  </style>
</custom-style>
<dom-module id="button-style" theme-for="vaadin-button">
  <template>
    <style>:host(:not([theme~="tertiary"])){background-image:linear-gradient(var(--lumo-tint-5pct), var(--lumo-shade-5pct));box-shadow:inset 0 0 0 1px var(--lumo-contrast-20pct);}:host(:not([theme~="tertiary"]):not([theme~="primary"]):not([theme~="error"]):not([theme~="success"])){color:var(--lumo-body-text-color);}:host([theme~="primary"]){text-shadow:0 -1px 0 var(--lumo-shade-20pct);}
    </style>
  </template>
</dom-module>

<dom-module id="text-field-style" theme-for="vaadin-text-field">
  <template>
    <style>[part="input-field"]{box-shadow:inset 0 0 0 1px var(--lumo-contrast-30pct);background-color:var(--lumo-base-color);}:host([invalid]) [part="input-field"]{box-shadow:inset 0 0 0 1px var(--lumo-error-color);}
    </style>
  </template>
</dom-module>
`;
console.log(document.head)
document.head.appendChild($_documentContainer.content);
