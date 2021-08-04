import type {ActivationFunction, OutputItem} from 'vscode-notebook-renderer';
import errorOverlay from 'vscode-notebook-error-overlay';
import {render} from './renderer';

export const activate: ActivationFunction = context => {
  return {
    renderOutputItem(outputItem: OutputItem, element: HTMLElement) {
      errorOverlay.wrap(element, () => {
        const cellOutputContainer: HTMLDivElement = document.createElement('div');
        cellOutputContainer.className = 'leaflet-map';
        element.appendChild(cellOutputContainer);
        render({
          container: cellOutputContainer,
          mimeType: outputItem.mime,
          value: outputItem,
          context
        });
      });
    },
    disposeOutputItem(outputId: string) {
      // Note: outputId is the cell output being cleared, 
      // or undefined if we're clearing all outputs.
    }
  };
};
