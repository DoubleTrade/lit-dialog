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
          ?closeOnEsc="${true}"
          .html=".html="Close by pressing escape"
        >
        </lit-dialog>
      <div>
      <div>
        <h2> Simple Dialog (closeOnClickOutside) </h2>
        ${buttonTemplate('#closeOnClickOutside')}
        <lit-dialog
          id="closeOnClickOutside"
          title="CLICK OUTSIDE"
          ?closeOnClickOutside="${true}"
          .html="Close by clicking outside"
        >
        </lit-dialog>
      <div>

      <div>
        <h2> Simple Dialog (closeIcon) </h2>
        ${buttonTemplate('#closeIcon')}
        <lit-dialog
          title="title"
          id="closeIcon"
          ?closeIcon="${true}"
          .html="${this.dialogContentTemplate}"
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
          .html="${this.dialogContentTemplate}"
          ?primaryAction="${true}"
          ?secondaryAction="${true}"
          primaryActionLabel="Change content"
          @primary-action-clicked="${() => { this.onPrimaryActionClicked() }}"
        >
        </lit-dialog>
      <div>

    </div>`;
  }

  onPrimaryActionClicked() {
    console.log('Primary Action pressed');
    this.content = this.getRandomString();
  }

  openDialog(id) {
    this.shadowRoot.querySelector(id).open()
  }
}

window.customElements.define('lit-dialog-demo', LitDialogDemo);
