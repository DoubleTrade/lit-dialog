import { LitElement, css, html } from 'lit-element';

class LitDialogTitle extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    }
  }

  static get styles() {
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

  constructor() {
    super();
    this.title = '';
  }

  render() {
    return html`<h2 class="lit-dialog_title"> ${this.title}</h2> `;
  }
}

window.customElements.define('lit-dialog-title', LitDialogTitle);
