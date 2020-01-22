import {
  LitElement, css, html, property,
} from 'lit-element';

import { CSSResult } from 'lit-element/lib/css-tag';
import { TemplateResult } from 'lit-html/lib/template-result';

class LitDialogTitle extends LitElement {
  @property({ type: String }) title = '';

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
      .lit-dialog_title {
        font - size: 17px;
        color: black;
        margin-top: 0px;
        margin-bottom: 0px;
      }
    `;
  }

  render(): TemplateResult {
    return html`<h2 class="lit-dialog_title"> ${this.title}</h2> `;
  }
}

window.customElements.define('lit-dialog-title', LitDialogTitle);
