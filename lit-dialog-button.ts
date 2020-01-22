import {
  LitElement, css, html, property,
} from 'lit-element';
import '@polymer/paper-button/paper-button';

import { CSSResult } from 'lit-element/lib/css-tag';
import { TemplateResult } from 'lit-html/lib/template-result';

class LitDialogButton extends LitElement {
  @property({ type: String }) label = '';

  static get styles(): CSSResult {
    return css`
      .lit-dialog_button {
        float: right;
      }`;
  }

  render(): TemplateResult {
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
