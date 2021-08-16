/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Loosely based on https://github.com/eugeneYWang/GeoJSON.ts
 */
export class GeoConverter {

  // supported geometry object types
  // see GeoJSON spec: https://www.rfc-editor.org/rfc/rfc7946.html#section-1.4
  private geometryTypes = [
    'Point',
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeoJSON'
  ];

  // geometry object properties
  private geometryProperties: Array<any> = [];

  // default geo data conversion options
  defaultOptions: object = {
    doThrows: {
      invalidGeometry: false
    }
  };

  /**
   * Geo data conversion errors.
   */
  errors: object = {
    invalidGeometryError: this.invalidGeometryError
  };
  
  /**
   * Creates new Geo data converter instance.
   */
  constructor() {
  }

  /**
   * Converts array or data object to GeoJSON object.
   * @param objects Data objects to convert.
   * @param options Geo data conversion options.
   * @param callback Optional callback for data conversion.
   * @returns GeoJSON data object.
   */
  public toGeo(objects: [] | object, options: object, callback?: Function): any {
    let geoJson: any;

    // apply geo data conversion default settings
    let settings = this.applyDefaults(options, this.defaultOptions);
      
    // reset geometry fields
    this.geometryProperties.length = 0;
    this.setGeometry(settings);
    if (Array.isArray(objects)) {
      // create geo features collection
      geoJson = {type: 'FeatureCollection', features: []};
      objects.forEach(item => {
        const feature: any = this.getFeature(item, settings);
        if (feature.geometry?.type !== undefined) { // has geometry type and coordinates
          geoJson.features.push(feature);
        }
      });
      this.addOptionalProperties(geoJson, settings);
    } 
    else {
      // create geo data object from a single data object
      geoJson = this.getFeature(objects, settings);
      this.addOptionalProperties(geoJson, settings);
    }

    if (callback && typeof callback === 'function') {
      callback(geoJson);
    } 
    else {
      return geoJson;
    }
  }

  /**
   * Adds default settings to geo data parameters.
   * Does not overwrite any data properties.
   * Only adds additional defaults.
   * @param params Geo data parameters.
   * @param defaults Default settings.
   * @returns 
   */
  private applyDefaults(params: any, defaults: any): any {
    let settings: any = params || {};
    for (let setting in settings) {
      if (defaults.hasOwnProperty(setting) && !settings[setting]) {
        // add default setting
        settings[setting] = defaults[setting];
      }
    }
    return settings;
  }

  /**
   * Adds optional crs and bbox GeoJSON properties, if present.
   * @param geoJson Geo data object to update.
   * @param settings Geo data setttings.
   */
  private addOptionalProperties(geoJson: any, settings: any) {
    if (settings.crs && this.isValidCrs(settings.crs)) {
      if (settings.isPostgres) {
        geoJson.geometry.crs = settings.crs;
      } else {
        geoJson.crs = settings.crs;
      }
    }
    if (settings.bbox) {
      geoJson.bbox = settings.bbox;
    }
    if (settings.extraGlobal) {
      geoJson.properties = {};
      for (let key in settings.extraGlobal) {
        geoJson.properties[key] = settings.extraGlobal[key];
      }
    }
  }

  /**
   * Validates geo data CRS config structure.
   * @param crs Crs to validate.
   * @returns 
   */
  private isValidCrs(crs: any): boolean {
    if (crs.type === 'name') {
      if (crs.properties && crs.properties.name) {
        return true;
      } 
      else {
        throw new Error('Invalid CRS. Properties must contain "name" key.');
      }
    } 
    else if (crs.type === 'link') {
      if (crs.properties && crs.properties.href && crs.properties.type) {
        return true;
      } 
      else {
        throw new Error('Invalid CRS. Properties must contain "href" and "type" key.');
      }
    } 
    else {
      throw new Error('Invald CRS. Type attribute must be "name" or "link".');
    }
  }

  /**
   * Moves geometry settings to the `geometry` key for easier access.
   * @param settings Geometry data settings.
   */
  private setGeometry(settings: any): void {
    settings.geometry = {};
    for (let propertyName in settings) {
      if (settings.hasOwnProperty(propertyName) && 
        this.geometryTypes.indexOf(propertyName) >= 0) {
        settings.geometry[propertyName] = settings[propertyName];
        delete settings[propertyName];
      }
    }
    this.setGeometryProperties(settings.geometry);
  }

  /**
   * Adds fields with geometry data to geometry object properties.
   * Geometry properties are used when adding properties to geo features, 
   * so that no geometry fields are added to the geo properties collection.
   * @param geoSettings Geometry data settings.
   */
  private setGeometryProperties(geoSettings: any): void {
    for (let propertyName in geoSettings) {
      if (geoSettings.hasOwnProperty(propertyName)) {
        if (typeof geoSettings[propertyName] === 'string') {
          this.geometryProperties.push(geoSettings[propertyName]);
        }
        else if (typeof geoSettings[propertyName] === 'object') {
          // array of coordinates for Point object
          this.geometryProperties.push(geoSettings[propertyName][0]);
          this.geometryProperties.push(geoSettings[propertyName][1]);
        }
      }
    }

    if (this.geometryProperties.length === 0) {
      throw new Error("No geometry attributes specified.");
    }
  }

  /**
   * Creates a Feature object for the GeoJSON features collection.
   * @param item Data item object.
   * @param settings Geo data conversion settings.
   * @returns Feature object with geometry and data properties.
   */
  private getFeature(item: any, settings: any): object {
    let feature: any = {type: 'Feature'};
    feature['geometry'] = this.buildGeometry(item, settings);
    feature['properties'] = this.getDataProperties(item, settings);
    return feature;
  }

  /**
   * Creates data properties collection for the GeoJSON Feature object.
   * @param item Data item object.
   * @param settings Geo data conversion settings.
   * @returns Feature object with geometry and data properties.
   */
  private getDataProperties(item: any, settings: any): object {
    let data: any = {};
    // TODO: add include and extra data props support 
    // from: https://github.com/eugeneYWang/GeoJSON.ts/blob/master/geojson.ts#L343
    for (let propertyName in item) {
      if (item.hasOwnProperty(propertyName) && 
        this.geometryProperties.indexOf(propertyName) === -1 &&
        settings.exclude.indexOf(propertyName) === -1) {
        // add it to geometry feature data properties
        data[propertyName] = item[propertyName];
      }
    }
    return data;
  }

  /**
   * Checks for nested objects.
   * @param value Object value.
   * @returns 
   */
  private isNested(value: any) {
    return /^.+\..+$/.test(value);
  }

  /**
   * Creates geometry object for the geo data feature.
   * @param item Data item.
   * @param settings Geo data settings.
   * @returns Geometry data object.
   */
  private buildGeometry(item: any, settings: any): any {
    let geometry: any = {};
    for (let geometryType in settings.geometry) {
      let geometryProperty = settings.geometry[geometryType];
      if (typeof geometryProperty === 'string' && item.hasOwnProperty(geometryProperty)) {
        // string point: {Point: 'coords'}
        if (geometryType === 'GeoJSON') {
          geometry = item[geometryProperty];
        } 
        else {
          geometry['type'] = geometryType;
          geometry['coordinates'] = item[geometryProperty];
        }
      } 
      else if (typeof geometryProperty === 'object' && !Array.isArray(geometryProperty)) {
        /* polygons of form
        Polygon: {
          northeast: ['lat', 'lng'],
          southwest: ['lat', 'lng']
        }
        */
        let points: any = Object.keys(geometryProperty).map((key: string) => {
          let order = geometryProperty[key];
          let newItem = item[key];
          return this.buildGeometry(newItem, {geometry: {Point: order}});
        });
        geometry['type'] = geometryType;
        geometry['coordinates'] = [].concat(
          points.map((point: any) => point.coordinates)
        );
      } 
      else if (Array.isArray(geometryProperty) &&
        item.hasOwnProperty(geometryProperty[0]) &&
        item.hasOwnProperty(geometryProperty[1]) &&
        item.hasOwnProperty(geometryProperty[2])) {
        // point coordinates with alt: {Point: ['lat', 'lng', 'alt']}
        geometry['type'] = geometryType;
        geometry['coordinates'] = [
          Number(item[geometryProperty[1]]),
          Number(item[geometryProperty[0]]),
          Number(item[geometryProperty[2]])
        ];
      } 
      else if (Array.isArray(geometryProperty) &&
        item.hasOwnProperty(geometryProperty[0]) &&
        item.hasOwnProperty(geometryProperty[1])) {
        // point coordinates: {Point: ['lat', 'lng']}
        geometry['type'] = geometryType;
        geometry['coordinates'] = [Number(item[geometryProperty[1]]), Number(item[geometryProperty[0]])];
      } 
      else if (Array.isArray(geometryProperty) &&
        this.isNested(geometryProperty[0]) &&
        this.isNested(geometryProperty[1]) &&
        this.isNested(geometryProperty[2])) { 
        // nested point coordinates with alt: {Point: ['container.lat', 'container.lng', 'container.alt']}
        let coordinates = [];
        for (let i = 0; i < geometryProperty.length; i++) {
          // i.e. 0 and 1
          var paths = geometryProperty[i].split('.');
          var itemClone = item;
          for (var j = 0; j < paths.length; j++) {
            if (!itemClone.hasOwnProperty(paths[j])) {
              return false;
            }
            // iterate deeper into the object
            itemClone = itemClone[paths[j]];
          }
          coordinates[i] = itemClone;
        }
        geometry['type'] = geometryType;
        geometry['coordinates'] = [
          Number(coordinates[1]),
          Number(coordinates[0]),
          Number(coordinates[2])
        ];
      }      
      else if (Array.isArray(geometryProperty) &&
        this.isNested(geometryProperty[0]) &&
        this.isNested(geometryProperty[1])) {
        // nested point coordinates: {Point: ['container.lat', 'container.lng']}
        let coordinates = [];
        for (let i = 0; i < geometryProperty.length; i++) {
          // i.e. 0 and 1
          let paths = geometryProperty[i].split(".");
          let itemClone = item;
          for (let j = 0; j < paths.length; j++) {
            if (!itemClone.hasOwnProperty(paths[j])) {
              return false;
            }
            // iterate deeper into the object
            itemClone = itemClone[paths[j]];
          }
          coordinates[i] = itemClone;
        }
        geometry['type'] = geometryType;
        geometry['coordinates'] = [Number(coordinates[1]), Number(coordinates[0])];
      }
      else if (Array.isArray(geometryProperty) &&
        geometryProperty[0].constructor.name === 'Object' &&
        Object.keys(geometryProperty[0])[0] === 'coordinates') {
        // coordinates point: {Point: [{coordinates: [lat, lng]}]}
        geometry['type'] = geometryType;
        geometry['coordinates'] = [
          Number(item.coordinates[geometryProperty[0].coordinates.indexOf('lng')]),
          Number(item.coordinates[geometryProperty[0].coordinates.indexOf('lat')])
        ];
      }
    }

    if (settings.doThrows && 
      settings.doThrows.invalidGeometry && 
      !this.isValidGeometry(geometry)) {
      throw this.invalidGeometryError(item, settings);
    }

    return geometry;
  }

  
  /**
   * Generates invalid geometry error.
   * @param args Geometry data arguments.
   */
   invalidGeometryError(...args: any[]): Error {
    let errorArgs = (1 <= args.length) ? [].slice.call(args, 0) : [];
    let item = errorArgs.shift();
    let params = errorArgs.shift();
    throw Error(`Invalid Geometry: item: ${JSON.stringify(item, null, 2)}
      \n params: ${JSON.stringify(params, null, 2)}`);
  }

  /**
   * Validates geometry object.
   * @param geometry Geometry object to validate.
   * @returns 
   */
  isValidGeometry(geometry: any): boolean {
    if (!geometry || !Object.keys(geometry).length) {
      return false;
    }
    return true;
  };

  /**
   * Adds data contained in the `extra` parameter to geo data properties.
   * @param properties Geo data properties to update.
   * @param extra Extra properties to add.
   * @returns Updated geo data properties.
   */
  private addExtraProperties(properties: any, extra: any) {
    for (var key in extra) {
      if (extra.hasOwnProperty(key)) {
        properties[key] = extra[key];
      }
    }
    return properties;
  }
}
