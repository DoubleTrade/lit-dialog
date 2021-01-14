import { LitElement, css, html, customElement } from 'lit-element';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';

import { CSSResult } from 'lit-element/lib/css-tag';
import { TemplateResult } from 'lit-html/lib/template-result';

@customElement('lit-dialog-close-icon')
export default class LitDialogCloseIcon extends LitElement {
  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render(): TemplateResult {
    return html`<paper-icon-button icon="close"></paper-icon-button>`;
  }
}
