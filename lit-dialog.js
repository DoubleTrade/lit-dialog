import { LitElement, css } from 'lit-element';
import { html, render } from 'lit-html';

import './lit-dialog-title';
import './lit-dialog-close-icon';
import './lit-dialog-button';

class LitDialog extends LitElement {
  static get properties() {
    return {
      /**
       * opened (Boolean) [false] - Open/close the dialog depending on value (default to false)
       * */
      opened: {
        type: Boolean,
        hasChanged(newVal, oldVal) {
          return (oldVal === false && newVal === true) || (oldVal === true && newVal === false);
        }
      },
      /**
       * title (String) - Title of the dialog
       * */
      title: { type: String },
      /**
       * closeOnEsc (Boolean) - Close on Pressing ESCAPE key  (default to false)
       * */
      closeOnEsc: { type: Boolean },
      /**
       * closeOnClickOutside (Boolean) - Close on Clicking outside  (default to false)
       * */
      closeOnClickOutside: { type: Boolean },
      /**
       * closeIcon (Boolean) - Display a close icon (default to false)
       * */
      closeIcon: { type: Boolean },
      /**
       * html (0bject) - Content to display, you can put a String, or a TemplateResult, if a string is supplied, returned
       * */
      html: {
        type: Object,
        converter: (value) => {
          if (typeof value !== 'object') {
            return html`${value}`
          }
        },
      },
      primaryAction: { type: Boolean },
      primaryActionLabel: { type: String },
      secondaryAction: { type: Boolean },
      secondaryActionLabel: { type: String },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.closeOnEsc = false;
    this.closeIcon = false;
    this.closeOnClickOutside = false;
    this.title = '';
    this.watchEscapeKey = this.watchEscapeKey.bind(this);
    this.html = null;

    this.primaryAction = false;
    this.primaryActionLabel = 'Ok';

    this.secondaryAction = false;
    this.secondaryActionLabel = 'Cancel';
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
    if (!document.querySelector('#lit-dialog-overlay')) {
      this.createDialogOverlayDiv();
    }
    render(this.dialogTemplate(), document.querySelector('#lit-dialog-overlay'));
  }

  dialogTemplate() {
    let header = null;
    if (this.title || this.closeIcon) {
      header = html`
      <style>
        .lit-dialog_header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-direction: row;
          overflow: hidden;
          padding: 15px;
          margin-bottom: 20px;
          border-bottom: 1px solid #e0e0e0;
        }
      </style>
      <div class="lit-dialog_header">
        ${(this.title) ? html`<lit-dialog-title title="${this.title}"></lit-dialog-title>` : null}
        ${(this.closeIcon) ? html`<lit-dialog-close-icon @tap=${this.close.bind(this)}></lit-dialog-close-icon>` : null}
      </div>
    `;
    }

    let footer = null;
    if (this.primaryAction || this.secondaryAction) {
      footer = html`
        <style>
          .lit-dialog_footer {
            position: relative;
            bottom: 0px;
            right: 0px;
            margin-bottom: 10px;
            margin-right: 10px;
            display: block;
            overflow: hidden;
          }
        </style>
        <div class="lit-dialog_footer">
          ${(this.primaryAction) ? html`<lit-dialog-button label="${this.primaryActionLabel}" @click="${this.handlePrimaryAction.bind(this)}">` : null}
          ${(this.secondaryAction) ? html`<lit-dialog-button label="${this.secondaryActionLabel}" @click="${this.handleSecondaryAction.bind(this)}">` : null}
        </div>
      `;
    }

    const htmlTemplate = (this.html) ? html`
      <style>
        .lit-dialog_content {
          display: block;
          overflow: hidden;
        }
      </style>
      <div class="lit-dialog_content">
        ${this.html}
      </div>` : null;

    return html`
    <style>
      :host {
        display: block;
      }

      .lit-dialog {
        align-items: center;
        display: flex;
        flex-direction: column;
        margin: auto;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .lit-dialog_overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }

      .lit-dialog_wrapper {
        overflow: auto;
        border-radius: 4px;
        max-width: 90%;
        max-height: 90%;
        background: rgb(255, 255, 255);
        position: fixed;
        box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.5);
      }
    </style>
    <div class="lit-dialog">
      <div class="lit-dialog_overlay" @click="${() => this.watchClickOutside()}"></div>
      <div class="lit-dialog_wrapper">
        ${header}
        ${htmlTemplate}
        ${footer}
      </div>
    </div>
    `;
  }

  handlePrimaryAction(e) {
    this.dispatchEvent(new CustomEvent('primary-action-clicked'));
  }

  handleSecondaryAction(e) {
    this.dispatchEvent(new CustomEvent('secondary-action-clicked'));
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
    if (document.querySelector('#lit-dialog-overlay')) {
      document.body.removeChild(document.querySelector('#lit-dialog-overlay'));
    }
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

  watchClickOutside() {
    if (this.closeOnClickOutside) {
      this.close();
    }
  }
}

window.customElements.define('lit-dialog', LitDialog);
