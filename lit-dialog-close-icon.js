import { LitElement, css, html } from 'lit-element';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';

class LitDialogCloseIcon extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }`;
  }

  render() {
    return html`<paper-icon-button icon="close"></paper-icon-button>`;
  }
}

window.customElements.define('lit-dialog-close-icon', LitDialogCloseIcon);
