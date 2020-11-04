import { html,LitElement } from 'lit-element';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field/vaadin-email-field';
//import '~/node_modules/@vaadin/vaadin-button';
// need this for v2 of parcel

class HelloWorld extends LitElement{
  render() {
    return html`
    <div>
    <h1>Hello World Component</h1>
    <vaadin-button 
      theme="primary"
    >Test</vaadin-button>
    <vaadin-email-field
      error-message="Enter a valid email address"
    >Hello</vaadin-email-field>
    <vaadin-text-field>Hello</vaadin-text-field>
    <h1>Welcome to Parcel Base config for LitElement</h1>
    <vaadin-button theme="primary"
      @click=${ () => {
        this.changeTheme();
      }}
    >Theme</vaadin-button>
    </div>
    `;
  }

  changeTheme(){
    var host = this.shadowRoot.host
    var documentNode = host.getRootNode();
    var htmlNode = documentNode.querySelector('main');
    let theme = htmlNode.getAttribute("theme");
    if (theme === "dark"){
      console.log("yes the theme is dark")
      htmlNode.setAttribute("theme", "light");
    }
    if (theme === "light"){
      console.log("yes the theme is light")
      htmlNode.setAttribute("theme", "dark");
    }
  }
}

customElements.define('hello-world',HelloWorld);