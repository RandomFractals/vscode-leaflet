import type {RendererContext, OutputItem} from 'vscode-notebook-renderer';
import './styles.css';
import './leaflet.css';

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

  // try to get JSON data
  let jsonData: any = {};
  try {
    jsonData = output.value.json();
  }
  catch (error: any) {
    console.log('leaflet.map:data: JSON.parse error:\n', error.message);
  }

  if (jsonData.data) {
    // get JSON data from REST Book output
    jsonData = jsonData.data;
  }

  if (jsonData.features) { 
    // create leaflet map and add it to notebook cell output display
    const mapContainer: HTMLDivElement = document.createElement('div');
    mapContainer.className = 'map-container';
    output.container.appendChild(mapContainer);
    const map = leafletMap.createMap(jsonData, mapContainer); //output.container);
  }
  else {
    // create Geo JSON text output display nodes
    const pre = document.createElement('pre');
    pre.className = 'geo-json';
    const code = document.createElement('code');
    
    if (typeof jsonData !== 'string') {
      // stringify json data
      code.textContent = JSON.stringify(jsonData, null, 2);
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
