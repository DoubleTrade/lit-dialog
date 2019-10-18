import { fixture, html, expect } from '@open-wc/testing';
import '../lit-dialog-close-icon';

describe('lit-dialog-close-icon', () => {
  it('return a paper button', async () => {
    const el = (await fixture("<lit-dialog-close-icon></lit-dialog-close-icon>"));
    expect(el).shadowDom.to.equalSnapshot();
  });
});