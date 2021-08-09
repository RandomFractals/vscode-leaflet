import type {
  RendererContext, 
  OutputItem
} from 'vscode-notebook-renderer';

import {OutputLoader} from './outputLoader';

import './styles.css';
import './leaflet.css';
import './markerCluster.css';

const htl = require('htl');
const leafletMap = require('./leafletMap.js');

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
  console.log(`leaflet.map:data:mimeType: ${output.mimeType}`);
  const outputLoader: OutputLoader = new OutputLoader(output.value, output.mimeType);
  let data: any = outputLoader.getData();
  if (data.features) {  // has geometry features collection
    // create leaflet map and add it to notebook cell output display
    const mapContainer: HTMLDivElement = document.createElement('div');
    mapContainer.className = 'map-container';
    output.container.appendChild(mapContainer);
    const map = leafletMap.createMap(data, mapContainer);
  }
  else {
    // create text output display nodes
    const pre = document.createElement('pre');
    pre.className = 'text-output';
    const code = document.createElement('code');
    if (typeof data !== 'string') {
      // stringify json data
      code.textContent = JSON.stringify(data, null, 2);
    }
    else {
      // show cell output text
      code.textContent = output.value.text();
    }
    pre.appendChild(code);
    output.container.appendChild(pre);
  }
}

if (module.hot) {
  module.hot.addDisposeHandler(() => {
    // cleanup or stash any state on renderer dispose
  });
}
