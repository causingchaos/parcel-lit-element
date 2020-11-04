import name from './js/multipleFiles.js';

console.log("Hello Again", name);
console.log(process.env.NODE_ENV);
import './components/hello-world.js';
//import './js/theme-selector.js'
//import './styles/global-styles.js'
import { Router } from '@vaadin/router';

//import '@vaadin/vaadin-lumo-styles/all-imports'

// Initalize App Router (Vaadin Router)
window.addEventListener('load', () => {
  initRouter();
})

function initRouter() {
  const router = new Router(document.querySelector('main'));
  router.setRoutes([
    {
      path: '/',
      component: 'hello-world'
    }
  ])
}
