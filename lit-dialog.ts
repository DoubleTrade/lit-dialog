import {
  LitElement,
  property,
  PropertyValues,
  customElement,
} from 'lit-element';
import { html, render } from 'lit-html';

import { TemplateResult } from 'lit-html/lib/template-result';

import './lit-dialog-title';
import './lit-dialog-close-icon';
import './lit-dialog-button';

@customElement('lit-dialog')
export default class LitDialog extends LitElement {
  /**
   * opened (Boolean) [false] - Open/close the dialog depending on value (default to false)
   * */
  @property({
    type: Boolean,
    hasChanged(newVal, oldVal) {
      return (
        (oldVal === false && newVal === true) ||
        (oldVal === true && newVal === false)
      );
    },
  })
  opened = false;

  @property({ type: String }) title = '';

  @property({ type: Boolean }) closeOnEsc = false;

  @property({ type: Boolean }) closeOnClickOutside = false;

  @property({ type: Boolean }) closeIcon = false;

  @property({
    type: Object,
    converter: (value): TemplateResult | null => {
      if (typeof value !== 'object') {
        return html`${value}`;
      }
      return null;
    },
  })
  html: TemplateResult | null = null;

  @property({ type: Boolean }) primaryAction = false;

  @property({ type: String }) primaryActionLabel = 'Ok';

  @property({ type: Boolean }) secondaryAction = false;

  @property({ type: String }) secondaryActionLabel = 'Cancel';

  updated(properties: PropertyValues): void {
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

  private updateDialogContent(): void {
    if (!this.opened) {
      return;
    }
    let overlay = document.querySelector('#lit-dialog-overlay');
    if (!overlay) {
      overlay = this.createDialogOverlayDiv();
    }

    render(this.dialogTemplate(), overlay);
  }

  dialogTemplate(): TemplateResult {
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
          ${this.title
            ? html`<lit-dialog-title title="${this.title}"></lit-dialog-title>`
            : null}
          ${this.closeIcon
            ? html`<lit-dialog-close-icon
                @tap=${this.close.bind(this)}
              ></lit-dialog-close-icon>`
            : null}
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
          ${this.primaryAction
            ? html`<lit-dialog-button
                label="${this.primaryActionLabel}"
                @click="${this.handlePrimaryAction.bind(this)}"
              ></lit-dialog-button>`
            : null}
          ${this.secondaryAction
            ? html`<lit-dialog-button
                label="${this.secondaryActionLabel}"
                @click="${this.handleSecondaryAction.bind(this)}"
              ></lit-dialog-button>`
            : null}
        </div>
      `;
    }

    const htmlTemplate = this.html
      ? html` <style>
            .lit-dialog_content {
              display: block;
              overflow: hidden;
            }
          </style>
          <div class="lit-dialog_content">${this.html}</div>`
      : null;

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
          background-color: var(--lit-dialog-background-color);
          overflow: auto;
          border-radius: 4px;
          max-width: 90%;
          max-height: 90%;
          background: transparent;
          position: fixed;
          box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.5);
        }
      </style>
      <div class="lit-dialog">
        <div
          class="lit-dialog_overlay"
          @click="${() => this.watchClickOutside()}"
        ></div>
        <div class="lit-dialog_wrapper">
          ${header} ${htmlTemplate} ${footer}
        </div>
      </div>
    `;
  }

  private handlePrimaryAction(): void {
    this.dispatchEvent(new CustomEvent('primary-action-clicked'));
  }

  private handleSecondaryAction(): void {
    this.dispatchEvent(new CustomEvent('secondary-action-clicked'));
  }

  private createDialogOverlayDiv(): HTMLElement {
    const id = 'lit-dialog-overlay';
    let overlayDiv: HTMLElement | null = document.getElementById(id);
    if (overlayDiv) {
      return overlayDiv;
    }
    overlayDiv = document.createElement('div');
    overlayDiv.setAttribute('id', id);
    return document.body.appendChild(overlayDiv);
  }

  private addDialog(): void {
    this.setEventListeners();
    this.createDialogOverlayDiv();
    this.updateDialogContent();
  }

  private removeDialog(): void {
    this.removeEventListeners();
    const overlay = document.querySelector('#lit-dialog-overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }

  private setEventListeners(): void {
    document.addEventListener('keydown', this.watchEscapeKey.bind(this));
  }

  private removeEventListeners(): void {
    document.removeEventListener('keydown', this.watchEscapeKey.bind(this));
  }

  private sendCustomEvent(): boolean {
    const event = new CustomEvent('opened-changed', {
      detail: {
        value: this.opened,
      },
    });
    return this.dispatchEvent(event);
  }

  /**
   * Close the Dialog
   */
  close(): void {
    this.opened = false;
  }

  /**
   * Open the Dialog
   */
  open(): void {
    this.opened = true;
  }

  /**
   * Pressing the ESC key will close the dialog
   */
  private watchEscapeKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.closeOnEsc) {
      this.close();
    }
  }

  private watchClickOutside(): void {
    if (this.closeOnClickOutside) {
      this.close();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'lit-dialog': LitDialog;
  }
}
