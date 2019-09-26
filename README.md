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
<lit-dialog dialogTitle="Title" opened>
  <p slot="content"> This dialog is totally awesome.</p>
  <div slot="actions">
    <button name="button" @click="() => {console.log('Hello World')}"> Click Me </button>
  </div>
</lit-dialog>
```

## API

### Slots

| Name      | Description                  |
| --------- | ---------------------------- |
| `content` | Content to display in dialog |
| `actions` | Area for buttons             |

### Properties/Attributes

| Name         | Type      | Description                                      |
| ------------ | --------- | ------------------------------------------------ |
| `opened`     | `Boolean` | Open/close the dialog depending on boolean value |
| `title`      | `String`  | Title of the dialog                              |
| `closeOnEsc` | `Boolean` | Close on Pressing ESCAPE key                     |


### Methods

| Name              | Description      |
| ----------------- | ---------------- |
| `open() => void`  | Open the dialog  |
| `close() => void` | Close the dialog |

### Events

| Name             | Target       | Detail             | Description                               |
| ---------------- | ------------ | ------------------ | ----------------------------------------- |
| `opened-changed` | `lit-dialog` | `{value: Boolean}` | Fired when the dialog is opened or closed |