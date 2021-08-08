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
	className: 'leaflet-pin-marker',
  html: L.Util.template(markerSvg, markerSettings),
  iconAnchor  : [10, 32],
  iconSize    : [25, 42],
  popupAnchor : [0, -30]
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
        iconSize: L.point(20, 20),
        html: `<b>${cluster.getChildCount()}</b>`
      });
    }
  });

  // create geo layer
  let geoLayer = L.geoJson(geoData, {
    onEachFeature: function (feature, layer) {
      layer.bindPopup(createLocationInfoHtml(feature));
      layer.bindTooltip(createLocationTooltipHtml(feature), {sticky: true});
    }
  });

  markers.addLayer(geoLayer);
  map.addLayer(markers);
  // map.fitBounds(markers.getBounds());

  return map;
}

/**
 * Creates location info html.
 * @param {*} location Geo location with properties.
 * @returns Location info html.
 */
function createLocationInfoHtml(location) {
  let locationInfoHtml = '<div class="map-popup">';
  if (location.properties) {
    const properties = Object.keys(location.properties);
    if (properties.length > 0) {
      locationInfoHtml += '<table class="location-info"><tbody>';
      properties.map(propertyName => {
        locationInfoHtml += `<tr><td><b>${propertyName}</b></td><td>${location.properties[propertyName]}</td></tr>`;
      });
      locationInfoHtml += '</tbody></table></div>';
    }    
  }
  else {
    locationInfoHtml += '<h4>No location info provided</h4></div>';
  }
  return locationInfoHtml;
}

/**
 * Creates location tootlip html.
 * @param {*} location Geo location with properties.
 * @returns Location tooltip html.
 */
 function createLocationTooltipHtml(location) {
  let locationTooltipHtml = '<div class="location-info-tooltip">';
  if (location.properties) {
    const properties = Object.keys(location.properties);
    const propertyCount = properties.length;
    if ( propertyCount > 0) {
      for (let i=0; i < 4 && i < propertyCount; i++) {
        let propertyName = properties[i];
        locationTooltipHtml += `<span><b>${propertyName}</b>: ${location.properties[propertyName]}</span><br />`;
      }
      if (propertyCount >= 4) {
        locationTooltipHtml += '<span><b>...</b></span>';
      }
      locationTooltipHtml += '</div>';
    }    
  }
  else {
    locationTooltipHtml += '<h4>No location info</h4></div>';
  }
  return locationTooltipHtml;
}
