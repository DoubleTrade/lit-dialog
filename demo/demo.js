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
      content: { type: String },
    };
  }

  constructor() {
    super();
    this.id = null;
    this.content = this.getRandomString();
  }

  firstUpdated() {
    this.shadowRoot.querySelector('lit-dialog').addEventListener('opened-changed', (e) => {
      const { detail } = e;
      console.info('opened-changed, detail = ', e);
    });
  }

  getRandomString() {
    return `Random Number between 0 and 100:  ${Math.floor(Math.random() * 100).toString()}`;
  }

  get dialogContentTemplate() {
    return html`
      <div>
        ${this.content}
      </div>
      `;
  }


  get dialogLongContentTemplate() {
    return html`
      <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
      `;
  }

  render() {
    const buttonTemplate = (value) => {
      const buttonTitle = 'Open Dialog';
      return html`
        <p>Click on the button below to open the dialog.</p>
        <button name="button" @click="${() => this.openDialog(value)}"> ${buttonTitle} </button>
        <p>Even if the sidebar is opened, the dialog is displayed over.</p>
      `;
    };

    return html`<div id="demo">
      <div>
        <h2> Simple Dialog (closeOnClickesc) </h2>
        ${buttonTemplate('#closeOnEsc')}
        <lit-dialog
          id="closeOnEsc"
          title="ESCAPE KEY"
          .closeOnEsc=${true}
          .html="Close by pressing escape"
          @opened-changed=${this.openedChanged.bind(this)}
        >
        </lit-dialog>
      <div>
      <div>
        <h2> Simple Dialog (closeOnClickOutside) </h2>
        ${buttonTemplate('#closeOnClickOutside')}
        <lit-dialog
          id="closeOnClickOutside"
          title="CLICK OUTSIDE"
          ?closeOnClickOutside=${true}
          .html="Close by clicking outside"
          @opened-changed=${this.openedChanged.bind(this)}
        >
        </lit-dialog>
      <div>

      <div>
        <h2> Simple Dialog (closeIcon) </h2>
        ${buttonTemplate('#closeIcon')}
        <lit-dialog
          title="title"
          id="closeIcon"
          ?closeIcon=${true}
          .html=${this.dialogContentTemplate}
          @opened-changed=${this.openedChanged.bind(this)}
        >
        </lit-dialog>
      <div>

      <div>
        <h2> Dialog (primaryAction) </h2>
        ${buttonTemplate('#primaryAction')}
        <lit-dialog
          ?closeOnEsc=${true}
          ?closeOnClickOutside=${true}
          id="primaryAction"
          .html=${this.dialogContentTemplate}
          ?primaryAction=${true}
          ?secondaryAction=${true}
          primaryActionLabel="Change content"
          @primary-action-clicked=${this.onPrimaryActionClicked.bind(this)}
          @secondary-action-clicked=${this.onSecondaryActionClicked.bind(this)}
          @opened-changed=${this.openedChanged.bind(this)}
        >
        </lit-dialog>
      <div>

      <div>
        <h2> Dialog (very long content) </h2>
        ${buttonTemplate('#longContent')}
        <lit-dialog
          ?closeOnEsc=${true}
          ?closeOnClickOutside=${true}
          id="longContent"
          .html=${this.dialogLongContentTemplate}
          @opened-changed=${this.openedChanged.bind(this)}
        >
        </lit-dialog>
      <div>

    </div>`;
  }

  openedChanged({ detail }) {
    console.log('openedChanged', detail);
    const { value } = detail;
    if (value) {
      this.id = null;
    }
  }

  onPrimaryActionClicked() {
    console.log('Primary Action pressed');
    this.content = this.getRandomString();
  }

  onSecondaryActionClicked() {
    console.log('Secondary Action pressed');
    this.shadowRoot.querySelector(this.id).close();
  }

  openDialog(id) {
    this.id = id;
    this.shadowRoot.querySelector(id).open()
  }
}

window.customElements.define('lit-dialog-demo', LitDialogDemo);
