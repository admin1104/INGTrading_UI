
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';

class Stockview extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
       
      </div>
    `;
  }
}

window.customElements.define('stock-view', Stockview);
