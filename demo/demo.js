import { LitElement, html, css } from 'lit-element';

import '../lit-dialog';

class LitDialogDemo extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      opened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.opened = false;
  }

  firstUpdated() {
    this.shadowRoot.querySelector('lit-dialog').addEventListener('opened-changed', (e) => {
      const { detail } = e;
      this.opened = detail.value;
    });
  }

  render() {
    return html`<div id="demo">
      ${this.buttonTemplate}
      <lit-dialog title="Title" ?closeOnEsc="${true}">
        <p slot="content"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div slot="actions">
          ${this.buttonTemplate}
        </div>
      </lit-dialog>
    </div>`;
  }

  get buttonTemplate() {
    const buttonTitle = (this.opened) ? 'Hide Dialog' : 'Display Dialog';
    return html`<button name="button" @click="${this.switchDialogStatus}"> ${buttonTitle} </button>`;
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
