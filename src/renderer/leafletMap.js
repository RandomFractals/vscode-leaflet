/* eslint-disable curly */
const htl = require('htl');
const L = require('leaflet');
const markerCluster = require('leaflet.markercluster');

// OSM and CartoDB map attribution
const attribution = `&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy;
<a href=\"http://cartodb.com/attributions\">CartoDB</a>`;

// default base map tiles url
const tiles = // 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png')
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

// create custom svg map marker
const markerSvg = `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178">
  <path fill="{markerColor}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10"
    d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/>
  <circle cx="74" cy="75" r="{markerCircleRadius}" 
    fill="{markerCircleColor}" stroke="#636c7d" stroke-width="6" />
</svg>`;

const markerSettings = {
  markerColor: '#2966cf',
  markerCircleColor: '#fff',
  markerCircleRadius: 32
};

const markerIcon = L.divIcon({
	className: "leaflet-data-marker",
  html: L.Util.template(markerSvg, markerSettings), //.replace('#','%23'),
  iconAnchor  : [12, 32],
  iconSize    : [25, 30],
  popupAnchor : [0, -28]
});

// set default marker icon
L.Marker.prototype.options.icon = markerIcon;

/**
 * Creates leaflet map.
 * @param {*} geoData GeoJSON data to map.
 * @param {*} mapContainer Leaflet map container.
 * @returns Leaflet map.
 */
export function createMap(geoData, mapContainer) {
  // create leaflet map
  let map = L.map(mapContainer).setView([24.48, 4.48], 1.5); // approximate world map center and zoom for 480px high map

  // add tiles layer with attributions
  let tileLayer = L.tileLayer(tiles, {
    attribution: attribution,
    detectRetina: false,
    noWrap: false,
    subdomains: 'abc'
  }).addTo(map);

  // add markers
  let markers = L.markerClusterGroup({
    maxClusterRadius: 80,
    // disable all marker cluster defaults:
		// spiderfyOnMaxZoom: false, showCoverageOnHover: false, zoomToBoundsOnClick: false,
    iconCreateFunction: function(cluster) {
      return L.divIcon({
        className: 'marker-cluster',
        iconSize: L.point(24, 24),
        html: `<b>${cluster.getChildCount()}</b>`
      });
    }
  });

  // create geo layer
  let geoLayer = L.geoJson(geoData, {
    onEachFeature: function (feature, layer) {
      const data = feature.properties;
      const html = `<div class="map-popup"><h2>TODO</h2></div>`;
      layer.bindPopup(html);
      layer.bindTooltip(`TODO`, {sticky: true});
    }
  });

  markers.addLayer(geoLayer);
  map.addLayer(markers);
  // map.fitBounds(markers.getBounds());

  return map;
}
