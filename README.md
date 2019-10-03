# lit-dialog

`lit-dialog` is a simple dialog web component.


## Roadmap
- Material Design
- Publish on npm
- Add tests

## Install
For dev purpose:
```
git clone git@github.com:DoubleTrade/lit-dialog.git
```
For user purpose:
```
npm install @doubleTrade/lit-dialog
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
<lit-dialog title="Title" opened .html="This is a message">
</lit-dialog>
```


```html
<lit-dialog opened .html="">
</lit-dialog>
```

## API

### Properties/Attributes

| Name         | Type      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| `opened`     | `Boolean` | Open/close the dialog depending on boolean value |
| `title`      | `String`  | Title of the dialog                              |
| `html`       | `Object`  | Content to display, you can put a String, or a full HTML template |
| `closeOnEsc` | `Boolean` | Close on Pressing ESCAPE key  (default to true)                   |


### Methods

| Name              | Description      |
| ----------------- | ---------------- |
| `open() => void`  | Open the dialog  |
| `close() => void` | Close the dialog |

### Events

| Name             | Target       | Detail             | Description                               |
| ---------------- | ------------ | ------------------ | ----------------------------------------- |
| `opened-changed` | `lit-dialog` | `{value: Boolean}` | Fired when the dialog is opened or closed |