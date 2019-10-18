import { fixture, html, expect, oneEvent } from '@open-wc/testing';
import '../lit-dialog';

describe('lit-dialog', () => {
  describe('properties', () => {
    const litDialogTemplate = html`<lit-dialog></lit-dialog>`;

    it('has by default opened set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.opened).to.be.false;
    });
    it('has by default closeOnEsc set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.closeOnEsc).to.be.false;
    });
    it('has by default closeOnClickOutside set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.closeOnClickOutside).to.be.false;
    });
    it('has by default closeIcon set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.closeIcon).to.be.false;
    });
    it('has by default primaryAction set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.primaryAction).to.false;
    });
    it('has by default primaryActionLabel set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.primaryActionLabel).to.equal('Ok');
    });
    it('has by default secondaryAction set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.secondaryAction).to.be.false;
    });
    it('has by default secondaryActionLabel set to false', async () => {
      const el = (await fixture(litDialogTemplate));
      expect(el.secondaryActionLabel).to.equal('Cancel');
    });
  });

  describe('events', () => {
    it('send opened-changed event after open', async () => {
      const el = await fixture(html`<lit-dialog></lit-dialog>`);
      expect(el.opened).to.be.false;

      setTimeout(() => el.open());

      const { detail } = await oneEvent(el, 'opened-changed');

      expect(el.opened).to.be.true;
    });

    it('send opened-changed event after close', async () => {
      const el = await fixture(html`<lit-dialog .opened="${true}"></lit-dialog>`);
      expect(el.opened).to.be.true;

      setTimeout(() => el.close());

      const { detail } = await oneEvent(el, 'opened-changed');

      expect(el.opened).to.be.false;
    });
  });
});

