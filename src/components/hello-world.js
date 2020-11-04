import { html,LitElement } from 'lit-element';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-email-field';
//import '~/node_modules/@vaadin/vaadin-button';
// need this for v2 of parcel

class HelloWorld extends LitElement{
  render() {
    return html`
    <div theme="dark">
    <h1>Hello World Component</h1>
    <vaadin-button theme="primary">Test</vaadin-button>
    <vaadin-email-field>Hello</vaadin-email-field>
    <vaadin-text-field>Hello</vaadin-text-field>
    <h1>Welcome to Parcel Base config for LitElement</h1>
    </div>
    `;
  }
}

customElements.define('hello-world',HelloWorld);