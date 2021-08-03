import {ExtensionContext} from 'vscode';

export function activate(context: ExtensionContext) {
  console.log(`leaflet.map: actived`);
}

export function deactivate() {
  console.log(`leaflet.map: deactivated`);
}
