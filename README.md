# vscode-leaflet

[![Apache-2.0 License](https://img.shields.io/badge/license-Apache2-brightgreen.svg)](http://opensource.org/licenses/Apache-2.0)
<a href='https://ko-fi.com/dataPixy' target='_blank' title='support: https://ko-fi.com/dataPixy'>
  <img height='24' style='border:0px;height:20px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' alt='https://ko-fi.com/dataPixy' />
</a>

<h1 align="center">
  <img width="600" height="159" src="docs/images/leaflet-logo.png" />
  <img width="128" height="128" src="resources/icons/leaflet-map.png" />
  <br />
  Leaflet Map 🗺️ for Notebook 📓 cell ⌗ data outputs
</h1>

See [Geo Data Viewer](https://github.com/RandomFractals/vscode-data-preview) 🗺️ vscode extension for advanced [Geo Data Analytics](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.geo-data-viewer) with [kepler.gl](https://kepler.gl/).

## Leaflet Map 🗺️ Renderer

Leaflet Map 🗺️ Notebook 📓 cell ⌗ output renderer uses [Leaflet](https://leafletjs.com) JavaScript library for interactive preview of Geo datasets loaded in [VSCode Notebooks](https://code.visualstudio.com/api/extension-guides/notebook) 📚.

![Leaflet Map 🗺️ Renderer](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-renderer.png?raw=true 
 "Leaflet Map 🗺️ Renderer")

# Features

View [`GeoJSON`](https://www.rfc-editor.org/rfc/rfc7946.html) Notebook 📓 cell ⌗ data output in plain text:

![Leaflet Map 🗺️ GeoJSON](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-geojson.png?raw=true 
 "Leaflet Map 🗺️ GeoJSON")

# 🗺️ Examples

Install and use [Data Table 🈸 for Notebooks 📚](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)  built-in [Notebook 📓 Examples](https://github.com/RandomFractals/vscode-data-table#-examples) to view Leaflet Map 🗺️ with provided sample [Geo datasets](https://github.com/RandomFractals/vscode-data-table/tree/main/data) in that extension. You can access those built-in Notebook 📓 Examples via `Data Table: Notebook Examples` command from `View -> Command Palette...`

![Data Table 🈸 Notebook Examples](https://github.com/RandomFractals/vscode-data-table/blob/main/docs/images/data-table-notebook-examples.png?raw=true 
 "Data Table 🈸 Notebook Examples")

# Recommended Extensions

Recommended extensions for working with Interactive Notebooks 📚 data 🈸 charts 📈 and geo 🗺️ data formats in [VSCode](https://code.visualstudio.com/):

| Extension | Description |
| --- | --- |
| [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) | Notebook extension for running REST queries |
| [TypeScript Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) | TypeScript with [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) Notebooks 📚 |
| [.NET Interactive Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) | .NET Interactive [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) Notebooks 📚 |
| [Pyolite](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyolite) 🐍 | [Pyodide](https://pyodide.org) 🐍 kernel for [JupyterLite](https://github.com/jtpio/jupyterlite) Notebooks 📚 |
| [Observable JS](https://marketplace.visualstudio.com/items?itemName=GordonSmith.observable-js) | Observable JS compiler with [Observable](https://observablehq.com/@observablehq/observable-for-jupyter-users?collection=@observablehq/observable-for-jupyter-users) `js` and `md` code outline and previews. |
| [JS Notebook 📓 Inspector 🕵️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.js-notebook-inspector) | Provides Interactive Preview of [Observable JS Notebooks](https://observablehq.com/documentation#notebook-fundamentals) 📚, Notebook 📓 nodes ⎇ & cells ⌗ source code |
| [Data Preivew 🈸](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-preview) | Data Preview 🈸 extension for importing 📤 viewing 🔎 slicing 🔪 dicing 🎲 charting 📊 & exporting 📥 large JSON array/config, YAML, Apache Arrow, Avro & Excel data files |
| [Geo Data Viewer 🗺️](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.geo-data-viewer) | [kepler.gl](https://kepler.gl) Geo Data Analytics tool to gen. some snazzy 🗺️s  w/0 `Py` 🐍 `pyWidgets` ⚙️ `pandas` 🐼 or `react` ⚛️ |
| [Vega Viewer 📈](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-vega-viewer) | Provides Interactive Preview of Vega & Vega-Lite maps 🗺️ & graphs 📈 |
| [DeltaXML XPath Notebook 📓](https://marketplace.visualstudio.com/items?itemName=deltaxml.xpath-notebook) | XPath 3.1 Notebook for Visual Studio Code |
| [Data Table 🈸](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)| Data Table 🈸 for Notebook 📓 cell ⌗ data outputs |

# Dev Log

See [#LeafletMapView 🗺️ tag on Twitter](https://twitter.com/hashtag/LeafletMapView?src=hashtag_click&f=live) for the latest and greatest updates on this vscode extension and what's in store next.

# Dev Build

```bash
$ git clone https://github.com/RandomFractals/vscode-leaflet
$ cd vscode-leaflet
$ npm install
$ npm run compile
$ code .
```
`F5` to launch Leaflet Map 🗺️ extension vscode debug session.

||

```bash
vscode-leaflet>vsce package
```
to generate `VSIX` Leaflet Map 🗺️ extension package with [vsce](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#vsce) from our latest for local dev install in vscode.

# Contributions

Any and all test, code or feedback contributions are welcome. 

Open an [issue](https://github.com/RandomFractals/vscode-leaflet/issues) or create a pull request to make this Leaflet Map 🗺️ vscode extension work better for all.

# Backers

<a href='https://ko-fi.com/dataPixy' target='_blank'>
  <img height='36' style='border:0px;height:36px;' border='0'
    src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' 
    alt='support me on ko-fi.com' />
</a>
