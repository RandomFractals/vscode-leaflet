# vscode-leaflet

[![Apache-2.0 License](https://img.shields.io/badge/license-Apache2-brightgreen.svg)](http://opensource.org/licenses/Apache-2.0)
[![Version](https://vsmarketplacebadge.apphb.com/version-short/RandomFractalsInc.vscode-leaflet.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-leaflet)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/RandomFractalsInc.vscode-leaflet.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-leaflet)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/RandomFractalsInc.vscode-leaflet.svg?color=orange)](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-leaflet)
<a href='https://ko-fi.com/dataPixy' target='_blank' title='support: https://ko-fi.com/dataPixy'>
  <img height='24' style='border:0px;height:20px;' src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' alt='https://ko-fi.com/dataPixy' />
</a>

<h1 align="center">
  <img width="600" height="159" src="docs/images/leaflet-logo.png" />
  <img width="128" height="128" src="resources/icons/map.png" />
  <br />
  Leaflet Map 🗺️ for Notebook 📓 cell ⌗ data outputs
</h1>

See [Geo Data Viewer](https://github.com/RandomFractals/geo-data-viewer) 🗺️ vscode extension for advanced [Geo Data Analytics](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.geo-data-viewer) with [kepler.gl](https://kepler.gl/)

## Leaflet Map 🗺️ Renderer

Leaflet Map 🗺️ Notebook 📓 cell ⌗ output renderer uses [Leaflet](https://leafletjs.com) 🌿 JavaScript library for interactive preview of Geo datasets loaded in [VSCode Notebooks](https://code.visualstudio.com/api/extension-guides/notebook) 📚

![Leaflet Map 🗺️ Renderer](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-renderer.png?raw=true 
 "Leaflet Map 🗺️ Renderer")

![World Countries in Leaflet Map 🗺️ Renderer](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-world-countries-restbook.png?raw=true 
 "World Countries in Leaflet Map 🗺️ Renderer")

![World Rivers in Leaflet Map 🗺️ Renderer](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-world-rivers-restbook.png?raw=true 
 "World Rivers in Leaflet Map 🗺️ Renderer")

# Features

- View Location data from `CSV`, `XML`, `JSON`, and [`GeoJSON`](https://www.rfc-editor.org/rfc/rfc7946.html) Notebook 📓 cell ⌗ data output on the Leaflet 🌿 map 🗺️ with [clustered markers](https://github.com/RandomFractals/vscode-leaflet/issues/8#issuecomment-894707382), [location information popups](https://github.com/RandomFractals/vscode-leaflet/issues/28#issuecomment-894812944) and [hover tooltips](https://github.com/RandomFractals/vscode-leaflet/issues/30#issuecomment-894824576)
- View [Point](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.2), [LineString](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.4), [MultiLineString](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.5), [Polygon](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.6), and [MultiPolygon](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.7) `GeoJSON` features with interactive point, lines, regions, and `properties` info display on geometry hover and click
- [REST Book](https://github.com/RandomFractals/vscode-leaflet#rest-book-example) 📓 [TypeScript Notebook](https://github.com/RandomFractals/vscode-leaflet#typescript-notebook-example) 📓 [.NET Interactive Notebook](https://github.com/RandomFractals/vscode-leaflet#net-interactive-notebook-example) 📓 and [Pyolite](https://github.com/RandomFractals/vscode-leaflet#pyolite-notebook-example) 🐍 [Notebook Examples](https://github.com/RandomFractals/vscode-leaflet#%EF%B8%8F-examples) 📚
- View `JSON`, `CSV`, and `XML` data without Geo Location information in `JSON` format in a scrollable text container with [`code pre-wrap`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) for a quick copy/paste to other places:

![Leaflet Map 🗺️ Text Output](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-text-output.png?raw=true 
 "Leaflet Map 🗺️ Text Output")

# Supported Data Formats

Leaflet 🌿 Map 🗺️ Notebook 📓 cell ⌗ data output Renderer supports loading Location data from the following output formats:

| Data Mime Type | Location Data | Geo Location Processing Description |
| --- | --- | --- |
| `application/geo+json` | [Point](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.2), [LineString](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.4), [MultiLineString](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.5), [Polygon](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.6), [MultiPolygon](https://www.rfc-editor.org/rfc/rfc7946.html#section-3.1.7) | `GeoJSON` Location `Point` coordinates are displyaed as clustered markers using [`leaflet.markercluster`](https://github.com/Leaflet/Leaflet.markercluster) JavaScript library with custom marker cluster icons and config. Lines and polygons are added to the map and displayed via Leaflet 🌿 [GeoJSON Layer](https://leafletjs.com/reference-1.7.1.html#geojson). See our [leafletMap.js](https://github.com/RandomFractals/vscode-leaflet/blob/main/src/renderer/leafletMap.js) for more info about that setup. |
| `application/json` | Objects that contain geo location property pairs ending with: `latitude`/`longitude`, `lat/lng`, or `lat/lng`| Flat `JSON` data objects and arrays are processed by our custom [`GeoConverter`](https://github.com/RandomFractals/vscode-leaflet/blob/main/src/renderer/geoConverter.ts) to extract Location information and covert loaded dataset to `GeoJSON` for display on the map. |
| `text/csv` | `CSV` data with column names in the 1st header row and columns ending with: `latitude`/`longitude`, `lat/lng`, or `lat/lng` | `CSV` data is parsed with [d3-dsv](https://github.com/d3/d3-dsv) JavaScript library and converted to flat `JSON` data array and then to `GeoJSON` with our [`GeoConverter`](https://github.com/RandomFractals/vscode-leaflet/blob/main/src/renderer/geoConverter.ts) to display locations on the map. |
| `application/xml` or `text/xml` | `XML` data with root node children that contain attributes ending with: `latitude`/`longitude`, `lat/lng`, or `lat/lng` | `XML` data is parsed with [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser) to load it into `JSON` data objects array and then processed with our [`GeoConverter`](https://github.com/RandomFractals/vscode-leaflet/blob/main/src/renderer/geoConverter.ts) to display locations on the map. `XML` data support is very alpha and experimental at this point, and might be removed later. |
| `application/` `vnd.code.notebook.stdout` or `text/plain` | Location data as `string` in `CSV`, `XML`, `JSON` or `GeoJSON` data format as described above | Text data typically comes from display and [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/console/log) instructions in vscode notebooks. We try to parse text as `JSON` with [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse), as `CSV` with [d3-dsv.csvParse()](https://github.com/d3/d3-dsv#csvParse), and as `XML` with [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser). If those parse methods fail, or provided notebook cell text output contains no location data we can extract, we display text output in a custom scrollable text container with [`code pre-wrap`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code) for a quick copy/paste to other places. Otherwise, loaded data is converted to `GeoJSON` with our [`GeoConverter`](https://github.com/RandomFractals/vscode-leaflet/blob/main/src/renderer/geoConverter.ts) for locations display on the map. |

# 🗺️ Examples

Install and use [Data Table 🈸 for Notebooks 📚](https://marketplace.visualstudio.com/items?itemName=RandomFractalsInc.vscode-data-table)  built-in [Notebook 📓 Examples](https://github.com/RandomFractals/vscode-data-table#-examples) to view Leaflet Map 🗺️ with provided sample [Geo datasets](https://github.com/RandomFractals/vscode-data-table/tree/main/data). You can access built-in Data Table 🈸 Notebook 📓 Examples via `Data Table: Notebook Examples` command from `View -> Command Palette...`

![Data Table 🈸 Notebook Examples](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/data-table-notebook-examples.png?raw=true 
 "Data Table 🈸 Notebook Examples")

## .NET Interactive Notebook Example

1. Install [.NET Install Tool for Extension Authors](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-runtime) vscode extension

2. Install [.NET Interactive Notebooks](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.dotnet-interactive-vscode) 📚 vscode extension

3. Load [USA Airports](https://github.com/RandomFractals/vscode-leaflet/blob/main/notebooks/usa-airports-net.ipynb) .NET Interactive Notebook 📓

4. Run All cells ⌗:

![USA Airports .NET Interactive Notebook 📓](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-net-notebook.png?raw=true 
 "USA Airports .NET Interactive Notebook 📓")

## TypeScript Notebook Example

1. Install [TypeScript Notebooks](https://marketplace.visualstudio.com/items?itemName=donjayamanne.typescript-notebook) 📚 vscode extension

2. Download [USA State Capitals `GeoJSON`](https://github.com/RandomFractals/vscode-leaflet/tree/main/data/geojson/usa-state-capitals.geojson) data file

3. Load [USA State Capitals](https://github.com/RandomFractals/vscode-leaflet/blob/main/notebooks/usa-state-capitals-typescript.ipynb) TypeScript Notebook 📓

4. Run All cells ⌗ to view that `GeoJSON` data output in a Leaflet 🌿 Map 🗺️:

![USA State Capitals TypeScript Notebook 📓](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-typescript-notebook.png?raw=true 
 "USA State Capitals TypeScript Notebook 📓")

### REST Book Example

1. Install [REST Book](https://marketplace.visualstudio.com/items?itemName=tanhakabir.rest-book) 📓 vscode extension

2. Load [World Cities](https://github.com/RandomFractals/vscode-leaflet/blob/main/notebooks/world-cities.restbook) REST Book 📓

3. Run All cells ⌗

4. Click on `...` in the gutter of `GET` data output and change it to Leaflet Map 🗺️ renderer:

![World Cities REST Book 📓](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-renderer.png?raw=true 
 "World Cities REST Book 📓")

Also try [World Countries](https://github.com/RandomFractals/vscode-leaflet/blob/main/notebooks/world-countries.restbook) REST Book 📓 example:

![World Countries REST Book 📓](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-world-countries.png?raw=true 
 "World Countries REST Book 📓")

Or [USA States](https://github.com/RandomFractals/vscode-leaflet/blob/main/notebooks/usa-states.restbook) REST Book 📓 example:

![USA States REST Book 📓](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-usa-states-restbook.png?raw=true 
 "USA States REST Book 📓")

## Pyolite Notebook Example

1. Install [Pyolite](https://marketplace.visualstudio.com/items?itemName=joyceerhl.vscode-pyolite) 🐍 vscode extension

2. Load [Chicago Red Light Cameras](https://github.com/RandomFractals/vscode-leaflet/blob/main/notebooks/chicago-red-light-cameras-pyolite.ipynb) Pyolite Notebook 📓

3. Run Python code cell and click on `...` -> `Choose Output Mimetype` -> `text/plain` Leaflet Map to view red light camera locations on the map 🗺️: 

![Chicago Red Light Cameras Pyolite Notebook 📓](https://github.com/RandomFractals/vscode-leaflet/blob/main/docs/images/leaflet-map-pyolite-notebook.png?raw=true 
 "Chicago Red Light Cameras Pyolite Notebook 📓")

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
| [GeoJSON Snippets](https://marketplace.visualstudio.com/items?itemName=analytic-signal.snippets-geojson) | Create geospatial objects using GeoJSON snippets |
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
