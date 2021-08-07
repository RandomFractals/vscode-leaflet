/* eslint-disable curly */
const htl = require('htl');
const html = htl.html;
const L = require('leaflet');
const markerCluster = require('leaflet.markercluster');

const attribution = `&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy;
<a href=\"http://cartodb.com/attributions\">CartoDB</a>`;

const tiles = // 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png')
  'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';

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
