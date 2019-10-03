import { LitElement, css } from 'lit-element';
import { html, render } from 'lit-html';

class LitDialog extends LitElement {
  static get properties() {
    return {
      opened: { type: Boolean },
      title: { type: String },
      closeOnEsc: { type: Boolean },
      html: { type: Object },
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
    const title = (this.title) ? html`<h2 class="lit-dialog_title">${this.title}</h2>` : html``;
    const htmlTemplate = (this.html) ? this.html : html`<div>NO CONTENT</div>`;
    return html`
    <style>
      :host {
        display: block;
      }
      
      #lit-dialog-overlay {
        position: absolute; 
        height: 100%; 
        width: 100%;
        left: 0px;
        top: 0px;
        z-index: 1;
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
        padding: 1rem;
        position: fixed;
      }
      .actions {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    </style>
    <div class="lit-dialog_wrapper" role="alertdialog" id="lit-dialog">
      <div class="lit-dialog_overlay" @click="${this.close}"></div>
      <div class="dialog" role="dialog">
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
