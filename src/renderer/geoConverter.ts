/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Loosely based on https://github.com/eugeneYWang/GeoJSON.ts
 */
export class GeoConverter {

  // supported geometry object types
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
  default: object = {
    doThrows: {
      invalidGeometry: false
    }
  };

  /**
   * Creates new Geo data converter instance.
   */
  constructor() {
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
   * Geo data conversion errors.
   */
  errors: object = {
    invalidGeometryError: this.invalidGeometryError
  };

  /**
   * Validates geometry object.
   * @param geometry Geometry object to validate.
   * @returns 
   */
  isGeometryValid(geometry: any): boolean {
    if (!geometry || !Object.keys(geometry).length) {
      return false;
    }
    return true;
  };

  /**
   * Converts array or data object to GeoJSON object.
   * @param objects Data objects to convert.
   * @param params Geo data conversion options.
   * @param callback Optional callback for data conversion.
   * @returns GeoJSON data object.
   */
  public toGeo(objects: [] | object, params: object, callback?: Function): any {
    let geoJson: any;

    // apply geo data conversion default settings
    let settings = this.applyDefaults(params, this.default);
      
    // reset geometry fields
    this.geometryProperties.length = 0;
    this.setGeometry(settings);
    if (Array.isArray(objects)) {
      // create geo features collection
      geoJson = {type: 'FeatureCollection', features: []};
      objects.forEach(item => geoJson.features.push(this.getFeature(item, settings)));
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
   * Moves geometry parameters to the `geom` key for easier access.
   * @param params Geo data parameters.
   */
  private setGeometry(params: any): void {
    params.geom = {};
    for (let param in params) {
      if (params.hasOwnProperty(param) && this.geometryTypes.indexOf(param) !== -1) {
        params.geom[param] = params[param];
        delete params[param];
      }
    }
    this.setGeometryProperties(params.geom);
  }

  /**
   * Adds fields with geometry data to geometry object properties.
   * Geometry properties are used when adding properties to geo features, 
   * so that no geometry fields are added to the geo properties collection.
   * @param params Geo data parameters.
   */
  private setGeometryProperties(params: any): void {
    for (let param in params) {
      if (params.hasOwnProperty(param)) {
        if (typeof params[param] === 'string') {
          this.geometryProperties.push(params[param]);
        }
        else if (typeof params[param] === 'object') {
          // array of coordinates for Point object
          this.geometryProperties.push(params[param][0]);
          this.geometryProperties.push(params[param][1]);
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
   * @param params Geo data conversion settings.
   * @returns Feature object with geometry and data properties.
   */
  private getFeature(item: any, params: any): object {
    let feature: any = {type: 'Feature'};
    feature['geometry'] = this.buildGeometry(item, params);
    feature['properties'] = this.getDataProperties(item, params);
    return feature;
  }

  /**
   * Creates data Properties collection for the GeoJSON Feature object.
   * @param item Data item object.
   * @param params Geo data conversion settings.
   * @returns Feature object with geometry and data properties.
   */
  private getDataProperties(item: any, params: any): object {
    let data: any = {};
    // TODO: add include, exclude, and extra data props support 
    // from: https://github.com/eugeneYWang/GeoJSON.ts/blob/master/geojson.ts#L343
    for (let propertyName in item) {
      if (item.hasOwnProperty(propertyName) && 
        this.geometryProperties.indexOf(propertyName) === -1) {
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
   * @param params Geo data params.
   * @returns Geometry data object.
   */
  private buildGeometry(item: any, params: any): any {
    let geometry: any = {};
    for (let geometryType in params.geom) {
      let val = params.geom[geometryType];
      // Geometry parameter specified as: {Point: 'coords'}
      if (typeof val === 'string' && item.hasOwnProperty(val)) {
        if (geometryType === 'GeoJSON') {
          geometry = item[val];
        } 
        else {
          geometry['type'] = geometryType;
          geometry['coordinates'] = item[val];
        }
      } 
      else if (typeof val === 'object' && !Array.isArray(val)) {
        /* handle polygons of form
          Polygon: {
            northeast: ['lat', 'lng'],
            southwest: ['lat', 'lng']
          }
          */
        let points: any = Object.keys(val).map((key: string) => {
          let order = val[key];
          let newItem = item[key];
          return this.buildGeometry(newItem, {geom: {Point: order}});
        });
        geometry['type'] = geometryType;
        geometry['coordinates'] = [].concat(
          points.map((point: any) => point.coordinates)
        );
      } 
      else if (Array.isArray(val) &&
        item.hasOwnProperty(val[0]) &&
        item.hasOwnProperty(val[1]) &&
        item.hasOwnProperty(val[2])) {
        // geometry parameter specified as: {Point: ['lat', 'lng', 'alt']}
        geometry['type'] = geometryType;
        geometry['coordinates'] = [
          Number(item[val[1]]),
          Number(item[val[0]]),
          Number(item[val[2]])
        ];
      } 
      else if (Array.isArray(val) &&
        item.hasOwnProperty(val[0]) &&
        item.hasOwnProperty(val[1])) {
        // geometry parameter specified as: {Point: ['lat', 'lng']}
        geometry['type'] = geometryType;
        geometry['coordinates'] = [Number(item[val[1]]), Number(item[val[0]])];
      } 
      else if (Array.isArray(val) &&
        this.isNested(val[0]) &&
        this.isNested(val[1]) &&
        this.isNested(val[2])) { 
        // geometry parameter specified as: {Point: ['container.lat', 'container.lng', 'container.alt']}
        let coordinates = [];
        for (let i = 0; i < val.length; i++) {
          // i.e. 0 and 1
          var paths = val[i].split('.');
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
      else if (Array.isArray(val) &&
        this.isNested(val[0]) &&
        this.isNested(val[1])) {
        // geometry parameter specified as: {Point: ['container.lat', 'container.lng']}
        let coordinates = [];
        for (let i = 0; i < val.length; i++) {
          // i.e. 0 and 1
          let paths = val[i].split(".");
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
      else if (Array.isArray(val) &&
        val[0].constructor.name === 'Object' &&
        Object.keys(val[0])[0] === 'coordinates') {
        // geometry parameter specified as: {Point: [{coordinates: [lat, lng]}]}
        geometry['type'] = geometryType;
        geometry['coordinates'] = [
          Number(item.coordinates[val[0].coordinates.indexOf('lng')]),
          Number(item.coordinates[val[0].coordinates.indexOf('lat')])
        ];
      }
    }

    if (params.doThrows && params.doThrows.invalidGeometry && !this.isGeometryValid(geometry)) {
      throw this.invalidGeometryError(item, params);
    }

    return geometry;
  }

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
