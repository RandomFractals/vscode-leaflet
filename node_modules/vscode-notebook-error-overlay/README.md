# vscode-notebook-error-overlay

This provides a Notebook-aware error overlay, somewhat like that which `create-react-app` provides. This is used in our [renderer starter](https://github.com/microsoft/vscode-notebook-renderer-starter).

### Usage

First, install it:

```
npm i --save-dev vscode-notebook-error-overlay
```

Then in your notebook's render function:

```ts
import errorOverlay from 'vscode-notebook-error-overlay';

function renderOutput(domNode) {
  // When you render in an element, install the overlay in it:
  errorOverlay.install(domNode);

  renderMyOutput(domNode); // then render your output
}
```

You can alternatively install and render in a wrapped function, which has the advantage of displaying any errors synchronously thrown from the render() function:

```ts
import errorOverlay from 'vscode-notebook-error-overlay';

const renderOutput = domNode => errorOverlay.wrap(domNode, () => {
  renderMyOutput(domNode);
});
```

If any build errors happen when running from the `webpack-dev-server`, an appropriate error message will be shown wherever the overlay is installed.
