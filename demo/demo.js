import { LitElement, html, css } from 'lit-element';

import '../lit-dialog';

class LitDialogDemo extends LitElement {
  static get styles() {
    const mainStyle = css`
      :host {
        display: block;
      }
    `;
    return [mainStyle];
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
    this.addEventListener('dialog-closed', (e) => {
      const { detail } = e;
      console.warn(detail);
      console.warn(detail.message);
      this.opened = detail.message;
    });
  }

  render() {
    return html`<div id="demo">
      ${this.buttonTemplate}
      <lit-dialog dialogTitle="Title" ?open="${this.opened}">
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
    this.opened = !this.opened;
  }
}

window.customElements.define('lit-dialog-demo', LitDialogDemo);
