import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';

@customElement('lit-dialog-close-icon')
export default class LitDialogCloseIcon extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<paper-icon-button icon="close"></paper-icon-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dialog-close-icon': LitDialogCloseIcon;
  }
}
