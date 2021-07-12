import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('lit-dialog-title')
export default class LitDialogTitle extends LitElement {
  @property({ type: String }) title = '';

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .lit-dialog_title {
        font-size: 17px;
        color: var(--lit-dialog-color, black);
        margin-top: 0px;
        margin-bottom: 0px;
      }
    `;
  }

  render() {
    return html`<h2 class="lit-dialog_title">${this.title}</h2> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dialog-title': LitDialogTitle;
  }
}
