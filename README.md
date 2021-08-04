# vscode-leaflet
VSCode Map View and Notebook Cell Output Renderer with Leaflet

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
