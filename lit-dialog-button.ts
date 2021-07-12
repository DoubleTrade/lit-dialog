import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import '@polymer/paper-button/paper-button';

@customElement('lit-dialog-button')
export default class LitDialogButton extends LitElement {
  @property({ type: String }) label = '';

  static get styles() {
    return css`
      .lit-dialog_button {
        float: right;
      }
    `;
  }

  render() {
    return html`<paper-button class="lit-dialog_button" ?raised="${true}">
      ${this.label}
    </paper-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dialog-button': LitDialogButton;
  }
}
