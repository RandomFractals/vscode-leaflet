/* eslint-disable curly */
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
  markerCircleRadius: 24
};

const markerIcon = L.divIcon({
	className: 'leaflet-pin-marker',
  html: L.Util.template(markerSvg, markerSettings),
  iconAnchor  : [8, 32],
  iconSize    : [24, 42],
  popupAnchor : [2, -32]
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
  // console.log(`leaflet.map:data:`, geoData);

  // create leaflet map
  let map = L.map(mapContainer).setView([24.48, 4.48], 1.5); // approximate world map center and zoom for 480px high map

  // add tiles layer with attributions
  L.tileLayer(tiles, {
    attribution: attribution,
    detectRetina: false,
    noWrap: false,
    subdomains: 'abc'
  }).addTo(map);

  // create geo layer for polygons and polylines
  const geoLayer = L.geoJson(geoData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(createLocationInfoHtml(feature));
      layer.bindTooltip(createLocationTooltipHtml(feature), {sticky: true});
      layer.on({
        mouseover: function(e) {
          // highlight selected geo layer
          const layer = e.target;
          layer.setStyle({
            color: '#ffbd33',
            fillOpacity: 0.5,
            weight: 1
          });
          layer.bringToFront();
        },
        mouseout: function(e) {
          // reset highlighted region styles and info display
          geoLayer.resetStyle(e.target);
        },
        click: function(e) {
          const layer = e.target;
          // zoom to selected geo layer
          // map.fitBounds(layer.getBounds());
        }
      });    
    },
    filter: function(feature, layer) {
      return (feature.geometry.type !== 'Point');
    },
    style: {
      color: '#d3d3d3',
      fillColor: '#ffbd33',
      fillOpacity: 0.4,
      opacity: 1,
      weight: 1
    }
  }).addTo(map);
  
  // create marker cluster group
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

  // create locations layer
  let locations = L.geoJSON(geoData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup(createLocationInfoHtml(feature));
      layer.bindTooltip(createLocationTooltipHtml(feature), {sticky: true});
    },
    filter: function(feature, layer) {
      return (feature.geometry.type === 'Point');
    },
  });

  // add location markers
  markers.addLayer(locations);
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
