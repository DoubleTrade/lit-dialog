import { LitElement, css, html, property, customElement } from 'lit-element';
import '@polymer/paper-button/paper-button';

import { CSSResult } from 'lit-element/lib/css-tag';
import { TemplateResult } from 'lit-html/lib/template-result';

@customElement('lit-dialog-button')
export default class LitDialogButton extends LitElement {
  @property({ type: String }) label = '';

  static get styles(): CSSResult {
    return css`
      .lit-dialog_button {
        float: right;
      }
    `;
  }

  render(): TemplateResult {
    return html` <paper-button class="lit-dialog_button" ?raised="${true}">
      ${this.label}
    </paper-button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dialog-button': LitDialogButton;
  }
}
