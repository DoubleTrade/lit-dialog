import { fixture, html, expect } from '@open-wc/testing';
import '../lit-dialog-title';

describe('lit-dialog-title', () => {
  it('has by default title set to an empty string and nothing is rendered', async () => {
    const el = (await fixture("<lit-dialog-title></lit-dialog-title>"));
    expect(el.title).to.equal('');
    expect(el).shadowDom.to.equalSnapshot(`<h2 class="lit-dialog_title"></h2>`);
  });

  it('has an h2 if title is supplied', async () => {
    const el = (await fixture(html`
      <lit-dialog-title title="something"></lit-dialog-title>
    `));
    expect(el.title).to.equal('something');
    expect(el).shadowDom.to.equalSnapshot();
  });
});