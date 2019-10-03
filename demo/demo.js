import { LitElement, html, css } from 'lit-element';

import '../lit-dialog';

class LitDialogDemo extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin-left:250px;
      }
    `;
  }

  static get properties() {
    return {
      opened: { type: Boolean },
      content: { type: String },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.content = Math.random();
  }

  firstUpdated() {
    this.shadowRoot.querySelector('lit-dialog').addEventListener('opened-changed', (e) => {
      const { detail } = e;
      this.opened = detail.value;
    });
  }

  get dialogContentTemplate() {
    return html`
      <div>
        ${this.content}
      </div>
      <button name="button" @click="${() => this.content = Math.random(0)}">Change Content</button>
      `;
  }

  render() {
    return html`<div id="demo">
      ${this.buttonTemplate}
      <lit-dialog 
        title="Title" 
        ?closeOnEsc="${true}" 
        .html="${this.dialogContentTemplate}"
      >
      </lit-dialog>
    </div>`;
  }

  get buttonTemplate() {
    const buttonTitle = (this.opened) ? 'Hide Dialog' : 'Display Dialog';
    return html`
      <p>Click on the button below to open the dialog.</p>
      <button name="button" @click="${this.switchDialogStatus}"> ${buttonTitle} </button>
      <p>Even if the sidebar is opened, the dialog is displayed over.</p>
    `;
  }

  switchDialogStatus() {
    if (this.opened) {
      this.shadowRoot.querySelector('lit-dialog').close()
    } else {
      this.shadowRoot.querySelector('lit-dialog').open()
    }
    this.opened = !this.opened;
  }
}

window.customElements.define('lit-dialog-demo', LitDialogDemo);
