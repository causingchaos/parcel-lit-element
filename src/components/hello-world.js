import { html,LitElement } from 'lit-element';
import '@vaadin/vaadin-button';
//import '~/node_modules/@vaadin/vaadin-button';
// need this for v2 of parcel

class HelloWorld extends LitElement{
  render() {
    return html`
    <h1>Hello World Component</h1>
    <vaadin-button theme="primary">Default</vaadin-button>
    `;
  }
}

customElements.define('hello-world',HelloWorld);