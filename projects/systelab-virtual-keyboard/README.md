# SystelabVirtualKeyboard

Systelab Virtual Keyboard is a on-screen keyboard focused on touch devices.

## Using the directive

Before use the directive you have to import the module into your application.

```typescript
NgModule({
  imports: [
    ...,
    SystelabVirtualKeyboardModule.forRoot(config),
  ]
})
```

Where config is an object with type *SystelabVirtualKeyboard.Config*. See [Config](src/lib/systelab-virtual-keyboard.public.ts) for details

Then the virtual keyboard can be enabled for inputs or textareas. To enable it the attribute *vkEnabled* can be used into the desire HTML element. It can be binding dynamically in the same way *[vkEnabled]="vkEnabledVariable"*

```html
<input class="input" type="number" placeholder="Numeric input default layout" vkEnabled vkFixedBottom [vkConfig]="vkConfig">
```

## Directive options

The default behaviour can be changed through some attributes:

| Name      |              Type              | Default | Description |
|-----------|:------------------------------:|:-------:| ----------- |
| vkEnabled |            boolean             | true | Enable the virtual keyboard for the element. If the property exists, the default value is true; if not, is false
| vkFixedBottom |             booles             | true | Fix the virtual keyboard to the bottom of the page. If the property exists, the default value is true; if not, is false
| vkConfig | SystelabVirtualKeyboard.Config | | Configuration object that overrides some default behaviours. See [Config](src/lib/systelab-virtual-keyboard.public.ts) for details

### Configuration object

The configuration params are describe into the interface [Config](src/lib/systelab-virtual-keyboard.public.ts)

| Name      | Type | Default | Description |
|-----------|:----:|:-------:| ----------- |
| layout |  SystelabVirtualKeyboardLayouts | | Usually the virtual keyboard select the layout between *default* or *numeric* depending on the input type. But with the config object you can override this behaviour and force the desired layout. The available layouts are described in the enum *SystelabVirtualKeyboardLayouts*
| inputMethod | SystelabVirtualKeyboardInputMethods | | The method detected for the keyboard to click or touch the keys
| showButton | boolean | false | Show or hide the button for showing the keyboard
| showOnMouseClick | boolean | false | Shows virtual keyboard upon mouse click on input field
| numericCloseOnEnter | boolean | false | Close virtual keyboard on numeric layouts upon a *enter* action

### Styling variables

| Name  | Default | Description                               |
|-----------|:----:|-------------------------------------------|
| --systelab-virtual-keyboard-font-family | 'SF Mono', 'Menlo', 'Consolas', 'Courier New', monospace | Font family fonts to use                  
| --systelab-virtual-keyboard-background-color | #B2B2B2 | Background of the keyboard                
| --systelab-virtual-keyboard-button-color | #E5E5E5 | Normal button background color            
| --systelab-virtual-keyboard-button-font-color | #000000 | Normal button font color                  
| --systelab-virtual-keyboard-active-special-button-color | #4D4D4D | Special buttons activation background color
| --systelab-virtual-keyboard-active-special-button-font-color | #FFFFFF | Special buttons activation font color     
