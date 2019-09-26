[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@doubletrade/lit-datatable)
# lit-dialog

`lit-dialog` is a simple implementation dialog web component.


## Roadmap
- Material Design
- Publish on npm
- Add tests

## Install
```
git clone git@github.com:DoubleTrade/lit-dialog.git
```

## Launch demo
```
npm run serve
```

## Lint
```
npm run lint:javascript
```

## Simple example
```html
<lit-dialog dialogTitle="Title" open>
  <p slot="content"> This dialog is totally awesome.</p>
  <div slot="actions">
    <button name="button" @click="() => {console.log('Hello World')}"> Click Me </button>
  </div>
</lit-dialog>
```
