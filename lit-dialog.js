import { LitElement, css } from 'lit-element';
import { html, render } from 'lit-html';

class LitDialog extends LitElement {
  static get properties() {
    return {
      opened: { type: Boolean },
      title: { type: String },
      closeOnEsc: { type: Boolean },
      html: {
        type: Object,
        converter: (value) => {
          if (typeof value !== 'object') {
            return html`${value}`
          }
        },
      }
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.closeOnEsc = true;
    this.title = '';
    this.watchEscapeKey = this.watchEscapeKey.bind(this);
    this.html = '';
  }

  updated(properties) {
    // When 'opened' prop is updated, set/remove event listeners depending on opened state
    // And fire custom events (still depending on opened state
    if (properties.has('opened')) {
      if (this.opened) {
        this.addDialog();
      } else {
        this.removeDialog();
      }
      this.sendCustomEvent();
    }
    if (properties.has('html')) {
      this.updateDialogContent();
    }
  }

  updateDialogContent() {
    if (!this.opened) {
      return;
    }
    render(this.dialogTemplate(), document.querySelector('#lit-dialog-overlay'));
  }

  dialogTemplate() {
    const title = (this.title) ? html`
      <style>
        .lit-dialog_header {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 15px;
          margin-bottom: 20px;
          border-bottom: 1px solid #e0e0e0;
        }

        .lit-dialog_title {
          font-size: 17px;
          margin: 0;
          color: black;
        }
      </style>
      <div class="lit-dialog_header">
        <h2 class="lit-dialog_title">${this.title}</h2>
      </div>
    ` : html``;
    console.warn('render: ', this.html);
    const htmlTemplate = (this.html) ? this.html : html``;
    return html`
    <style>
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
        background: rgba(0, 0, 0, 0.5);
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        margin: 0;
      }

      .lit-dialog_content {
        min-width: 300px;
        min-height: 150px;
        background: rgb(255, 255, 255);
        position: fixed;
        box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.5);
      }
    </style>
    <div class="lit-dialog_wrapper">
      <div class="lit-dialog_overlay" @click="${this.close}"></div>
      <div class="lit-dialog_content">
        ${title}
        ${htmlTemplate}
      </div>
    </div>
    `;
  }

  createDialogOverlayDiv() {
    const overlay = document.createElement('div');
    overlay.setAttribute('id', 'lit-dialog-overlay');
    return document.body.appendChild(overlay);
  }

  addDialog() {
    this.setEventListeners();
    this.createDialogOverlayDiv();
    this.updateDialogContent();
  }

  removeDialog() {
    this.removeEventListeners();
    if (!document.querySelector('#lit-dialog-overlay')) {
      return
    }
    document.body.removeChild(document.querySelector('#lit-dialog-overlay'))
  }

  setEventListeners() {
    document.addEventListener('keydown', this.watchEscapeKey);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.watchEscapeKey);
  }

  sendCustomEvent() {
    const event = new CustomEvent('opened-changed', {
      detail: {
        value: this.opened,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * Close the Dialog
   */
  close() {
    this.opened = false;
  }

  /**
   * Open the Dialog
   */
  open() {
    this.opened = true;
  }

  /**
   * Pressing the ESC key will close the dialog
   */
  watchEscapeKey(event) {
    if (event.key === 'Escape' && this.closeOnEsc) {
      this.close();
    }
  }
}

window.customElements.define('lit-dialog', LitDialog);
