import { LitElement, html, css } from 'lit-element';

class LitDialog extends LitElement {
  static get styles() {
    const mainStyle = css`
    :host {
      display: block;
    }
    .lit-dialog_wrapper {
      align-items: center;
      display: flex;
      justify-content: center;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .lit-dialog_overlay {
      background: rgba(0, 0, 0, 0.8);
      height: 100%;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .lit-dialog_title {
      color: black;
    }
    .dialog {
      flex-direction: column;
      background: #ffffff;
      max-width: 600px;
      padding: 1rem;
      position: fixed;
    }
    p ::slotted(*) {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }`;
    return [mainStyle];
  }

  static get properties() {
    return {
      open: { type: Boolean },
      dialogTitle: { type: String },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.dialogTitle = '';
    this.watchEscapeKey = this.watchEscapeKey.bind(this);
  }

  render() {
    let dialogTitle = html``;

    if (this.dialogTitle) {
      dialogTitle = html`<h2 class="lit-dialog_title">${this.dialogTitle}</h2>`;
    }

    return html`${this.open ? html`
      <div class="lit-dialog_wrapper" role="alertdialog">
        <div class="lit-dialog_overlay" @click="${this.close}"></div>
        <div class="dialog" role="dialog">
          ${dialogTitle}
          <slot name="content"></slot>
          <p>
            <slot name="actions"></slot>
          </p>
        </div>
      </div>
      ` : null}
    `;
  }

  updated(properties) {
    if (properties.has('open')) {
      if (this.open) {
        this.setEventListeners();
      } else {
        this.removeEventListeners();
      }
    }
  }

  setEventListeners() {
    document.addEventListener('keydown', this.watchEscapeKey);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.watchEscapeKey);
  }

  close() {
    this.open = false;
    const closeEvent = new CustomEvent('dialog-closed', {
      detail: {
        message: this.open,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(closeEvent);
  }

  watchEscapeKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

window.customElements.define('lit-dialog', LitDialog);
