import { LitElement, css, html } from 'lit-element';
import '@polymer/paper-button/paper-button';

class LitDialogButton extends LitElement {
  static get properties() {
    return {
      label: { type: String },
    }
  }

  static get styles() {
    return css`
      .lit-dialog_button {
        float: right;
      }`;
  }

  constructor() {
    super();
    this.label = '';
  }

  render() {
    return html`
      <paper-button
        class="lit-dialog_button"
        ?raised="${true}"
      >
        ${this.label}
      </paper-button>`;
  }
}

window.customElements.define('lit-dialog-button', LitDialogButton);

