import { render } from './render';
import errorOverlay from 'vscode-notebook-error-overlay';
import { ActivationFunction } from 'vscode-notebook-renderer';

// fix public path for async imports to work
declare const __webpack_relative_entrypoint_to_root__: string;
declare const scriptUrl: string;

__webpack_public_path__ = 
    new URL(scriptUrl.replace(/[^/]+$/, '') + __webpack_relative_entrypoint_to_root__).toString();

export const activate: ActivationFunction = context => {
  return {
    renderCell(outputId, {element, mime, value}) {
      errorOverlay.wrap(element, () => {
        element.innerHTML = '';
        const node = document.createElement('div');
        element.appendChild(node);
        render({ container: node, mime, value, context });
      });
    },
    destroyCell(outputId) {
      // Note: outputId is the cell output being cleared, 
      // or undefined if we're clearing all outputs.
    }
  };
};
