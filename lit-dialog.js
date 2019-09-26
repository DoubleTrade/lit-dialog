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
    .actions {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }`;
    return [mainStyle];
  }

  static get properties() {
    return {
      opened: { type: Boolean },
      title: { type: String },
      closeOnEsc: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.title = '';
    this.watchEscapeKey = this.watchEscapeKey.bind(this);
  }

  render() {
    const title = (this.title) ? html`<h2 class="lit-dialog_title">${this.title}</h2>` : html``;
    return html`${this.opened ? html`
      <div class="lit-dialog_wrapper" role="alertdialog">
        <div class="lit-dialog_overlay" @click="${this.close}"></div>
        <div class="dialog" role="dialog">
          ${title}
          <slot name="content"></slot>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
      ` : null}
    `;
  }

  updated(properties) {
    // When 'opened' prop is updated, set/remove event listeners depending on opened state
    // And fire custom events (still depending on opened state
    if (properties.has('opened')) {
      if (this.opened) {
        this.setEventListeners();
      } else {
        this.removeEventListeners();
      }
      this.sendCustomEvent();
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
}

window.customElements.define('lit-dialog', LitDialog);
