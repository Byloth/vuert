# AlertHandler

## Props

### `is`

An HTML tag or a Vue component that will be used to wrap and render the actual Alert that will be shown.  

In the future, this property could be dropped in favor to using a [Renderless Component](https://vuejs.org/guide/components/slots.html#renderless-components).

- **`type`**: `string` | `Component`
- **`required`**: `false`
- **`default`**: `"div"`

### `duration`

The duration of eventual animations set on the Alert to show.

Expressed in milliseconds.

- **`type`**: `number` | `{ enter: number, leave: number }`
- **`required`**: `false`
- **`default`**: `200`

### `filter`

It's a filter function that receive the emitted alert.  
It should define the rules to understand if the subscribed alert can handle the alert to show it properly.

If the `filter` function returns `true`, the alert will be handled by that `AlertHandler` instance.  
It will be passed to the next `AlertHandler` subscribed, otherwise.

- **`type`**: `(options: AlertOptions<unknown>) => boolean`
- **`required`**: `false`
- **`default`**: `() => true`

## Rendered slots

This Component has only one `slot` and it should contains the actual alert to be rendered, when emitted.
It provides a context to this slot with some properties to be used by the extending Component.

### `alert`

### `isOpen`

### `resolve`

### `reject`

## Emitted events

### `opening`

Emitted when the `AlertHandler` component starts to show the actual alert.  
When this event is fired, the opening animation has started. 

At this point, the `alert` object from the context change its value from `undefined` to the actual value.  
Also, the value `isOpen` from the context change its value from `false` to `true`.

### `opened`

Emitted when the `AlertHandler` component ends to show the actual alert.  
When this event is fired, the opening animation has finished. 

### `closing`

Emitted when the `AlertHandler` component starts to hide the actual alert.  
When this event is fired, the closing animation has started.

At this point, the value `isOpen` from the context change its value from `true` to `false`.

### `closed`

Emitted when the `AlertHandler` component ends to hide the actual alert.  
When this event is fired, the closing animation has finished. 

At this point, the `alert` object from the context change its value from the actual value to `undefined`.
