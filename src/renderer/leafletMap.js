/* eslint-disable curly */
const htl = require('htl');
const html = htl.html;
const L = require('leaflet');

export function createMap(geoData, mapContainer) {
  // create leaflet map with attributions
  let map = L.map(mapContainer).setView([41.85, -87.68], 10); // Chicago origins
  let osmLayer = L.tileLayer( // 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png')
    'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, &copy; <a href=\"http://cartodb.com/attributions\">CartoDB</a>',
    detectRetina: false,
    maxZoom: 18,
    minZoom: 10,
    noWrap: false,
    subdomains: 'abc'
  }).addTo(map);

  const markerStyles = html`
    <style type="text/css">
      div.popup p { 
      margin: 4px 0;
      font-size: 14px;
    }
  </style>`;

  // red dot marker
  const marker = {
    radius: 6,
    fillColor: "#ff4e3b",
    color: "#ff0000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  
  // map markers
  const pointToLayer = function (feature, latlng) {
    return L.circleMarker(latlng, marker);
  };

  // add markers
  let geoLayer = L.geoJson(geoData, {
    pointToLayer: pointToLayer,
    onEachFeature: function (feature, layer) {
      const data = feature.properties;
      const html = `<div class="popup"><h2>TODO</h2></div>`;
      layer.bindPopup(html);
      layer.bindTooltip(`TODO`, {sticky: true});
    }
  });

  map.addLayer(geoLayer);
  // map.fitBounds(markers.getBounds());

  return map;
}
