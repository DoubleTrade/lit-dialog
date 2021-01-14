import { LitElement, css, html, property, customElement } from 'lit-element';

import { CSSResult } from 'lit-element/lib/css-tag';
import { TemplateResult } from 'lit-html/lib/template-result';

@customElement('lit-dialog-title')
export default class LitDialogTitle extends LitElement {
  @property({ type: String }) title = '';

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
      .lit-dialog_title {
        font-size: 17px;
        color: black;
        margin-top: 0px;
        margin-bottom: 0px;
      }
    `;
  }

  render(): TemplateResult {
    return html`<h2 class="lit-dialog_title">${this.title}</h2> `;
  }
}
