# lit-dialog

`lit-dialog` is a simple dialog web component.


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
| `closeOnEsc` | `Boolean` | Close on Pressing ESCAPE key  (default to false)                   |
| `closeOnClickOutside` | `Boolean` | Close on Clicking Outside the dialog  (default to false)                   |
| `closeIcon` | `Boolean` | add a close Icon (default to false)                   |
| `primaryAction` | `Boolean` | Display a button  (default to false)              |
| `primaryActionLabel` | `String` | Label of primary action (default to 'Ok')                   |
| `secondaryAction` | `Boolean` | Display a second button  (default to false)              |
| `secondaryActionLabel` | `String` | Label of primary action (default to 'Cancel')                   |

### Methods

| Name              | Description      |
| ----------------- | ---------------- |
| `open() => void`  | Open the dialog  |
| `close() => void` | Close the dialog |

### Events

| Name             | Target       | Detail             | Description                               |
| ---------------- | ------------ | ------------------ | ----------------------------------------- |
| `opened-changed` | `lit-dialog` | `{value: Boolean}` | Fired when the dialog is opened or closed |
| `primary-action-clicked` | `lit-dialog` |  | Fired when the primary action is clicked |
| `secondary-action-clicked` | `lit-dialog` |  | Fired when the secondary action is clicked |
