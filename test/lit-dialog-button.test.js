import { fixture, html, expect, } from '@open-wc/testing';
import '../lit-dialog-button';

describe('lit-dialog-button', () => {
  const litDialogTemplate = html`<lit-dialog-button></lit-dialog-button>`;

  it('has by default label set to empty string', async () => {
    const el = (await fixture(litDialogTemplate));
    expect(el.label).to.equal('');
  });
  it('has a paper button', async () => {
    const el = (await fixture(html`
      <lit-dialog-button label="something"></lit-dialog-button>
    `));
    expect(el.label).to.equal('something');
    expect(el).shadowDom.to.equalSnapshot();
  });
});