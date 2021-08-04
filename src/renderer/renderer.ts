import type {RendererContext, OutputItem} from 'vscode-notebook-renderer';
import * as styles from './styles.css';

/**
 * Notebook cell output render info.
 */
 interface IRenderInfo {
  container: HTMLElement;
  mimeType: string;
  value: OutputItem;
  context: RendererContext<unknown>;
}

/**
 * Renders notebook cell output.
 * @param output Notebook cell output info to render.
 */
 export function render(output: IRenderInfo) {
  const pre = document.createElement('pre');
  pre.className = 'json';
  const code = document.createElement('code');
  code.textContent = `mime type: ${output.mimeType}\n\n${JSON.stringify(output.value, null, 2)}`;
  pre.appendChild(code);
  output.container.appendChild(pre);
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // cleanup or stash any state on renderer dispose
  });
}
