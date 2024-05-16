# SystelabVirtualKeyboard (THIS IS AN ALPHA VERSION)

Systelab Virtual Keyboard is a on-screen keyboard focused on touch devices.

## Using the directive

Before use the directive you have to import the module into your application.

```typescript
NgModule({
  imports: [
    ...,
    SystelabVirtualKeyboardModule,
  ]
})
```

Then the virtual keyboard can be enabled for inputs or textareas. To enable it the attribute *vkEnabled* can be used into the desire HTML element. It can be binding dynamically in the same way *[vkEnabled]="vkEnabledVariable"*

```html
<input class="input" type="number" placeholder="Numeric input default layout" vkEnabled vkFixedBottom [vkConfig]="vkConfig">
```

## Directive options

The default behaviour can be overrided trought some attributes:

* vkEnabled: enable the virtual keyboard for the element
* vkFixedBottom: fix the virtual keyboard to the bottom of the page
* vkConfig: configuration object

### Configuration object

The configuration params are describe into the interface *SystelabVirtualKeyboardConfig*

* layout: usually the virtual keyboard select the layout between *default* or *numeric* depending on the input type. But with the config object you can override this behaviour and force the desired layout. The available layouts are described in the enum *SystelabVirtualKeyboardLayouts*

