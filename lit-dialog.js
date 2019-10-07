import { LitElement, css } from 'lit-element';
import { html, render } from 'lit-html';

import '@polymer/paper-button/paper-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/paper-icon-button/paper-icon-button';

class LitDialog extends LitElement {
  static get properties() {
    return {
      /**
       * opened (Boolean) [false] - Open/close the dialog depending on value (default to false)
       * */
      opened: { type: Boolean },
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
    render(this.dialogTemplate(), document.querySelector('#lit-dialog-overlay'));
  }

  dialogTemplate() {
    const closeIcon = (this.closeIcon) ? html`
      <style>
        paper-icon-button {
          float: right;
        }
      </style>
      <paper-icon-button icon="close" @tap=${this.close.bind(this)}=></paper-icon-button>
    ` : null;

    const title = (this.title) ? html`
      <style>
        .lit-dialog_title {
          float: left;
          font-size: 17px;
          color: black;
        }
      </style>
      <h2 class="lit-dialog_title">${this.title}</h2>
    ` : null;

    const header = html`
      <style>
          .lit-dialog_header {
          display: block;
          overflow: hidden;
          padding: 15px;
          margin-bottom: 20px;
          border-bottom: 1px solid #e0e0e0;
        }
        .lit-dialog_header:empty {
          display none;
        }
      </style>
      <div class="lit-dialog_header">
        ${title}
        ${closeIcon}
      <div>
    `;

    const actionButtons = (label, clickHandler) => html`
      <style>
        .lit-dialog_buttons {
          float: right;
        }
      </style>
      <paper-button
        class="lit-dialog_buttons"
        ?raised="${true}"
        @click="${(e) => clickHandler(e)}"
      >
        ${label}
      </paper-button>
    `;

    const footer = html`
      <style>
        .lit-dialog_footer {
          position: absolute;
          bottom: 0px;
          right: 0px;
          margin-bottom: 10px;
          margin-right: 10px;
          display: block
          overflow: hidden;
        }
        .lit-dialog_footer:empty {
          display none;
        }
      </style>
      <div class="lit-dialog_footer">
          ${(this.primaryAction) ? actionButtons(this.primaryActionLabel, () => this.handlePrimaryAction()) : null}
          ${(this.secondaryAction) ? actionButtons(this.secondaryActionLabel, () => this.handleSecondaryAction()) : null}
      </div>
    `;

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
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .lit-dialog_overlay {
        background: rgba(0, 0, 0, 0.5);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }

      .lit-dialog_wrapper {
        border-radius: 4px;
        min-width: 33%;
        min-height: 25%;
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
        ${(this.title || this.closeIcon) ? header : null}
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
