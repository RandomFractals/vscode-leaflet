/* eslint-disable @typescript-eslint/naming-convention */
import type {OutputItem} from 'vscode-notebook-renderer';
import {GeoConverter} from './geoConverter';
import {csvParse} from 'd3-dsv';
const xmlParser = require('fast-xml-parser');

/**
 * OutputLoader loads data from notebook cell output item.
 */
export class OutputLoader {

  private geoConverter: GeoConverter;

  /**
   * Creates new OutputLoader instance.
   * @param outputData Notebook cell output item.
   * @param mimeType Notebook cell output mime type.
   */
  constructor (private outputData: OutputItem, private mimeType: string) {
    this.geoConverter = new GeoConverter();
  }
    
  /**
   * Gets data output.
   */
  getData(): any {
    // try getting JSON data first
    const objectData = this.getJsonData(this.outputData);
    if (objectData !== undefined) {
      if (objectData.features) {
        // console.log('leaflet.map:data:format: GeoJSON');
        // already in geoJSON data format for map display
        return objectData;
      }
      else {
        // try to convert it to GeoJSON data format for map display
        return this.getGeoData(objectData);
      }
    }

    // try parsing text data
    let textData: string = this.outputData.text();
    if (textData.length > 0) {
      console.log('leaflet.map:data:text:', textData.substring(0, Math.min(80, textData.length)), '...');

      // load JSON data
      const jsonData = this.getJsonData(textData);
      let outputData: any;
      if (jsonData !== undefined) {
        outputData = jsonData;
      }
      else if (textData.startsWith('<?xml version="1.0"')) {
        // parse XML data
        outputData = this.xmlParse(textData);
      }
      else if (this.isCsv(textData)) {
        // parse CSV data
        outputData = csvParse(textData);
      }
      else if (textData !== '{}' && !textData.startsWith('<Buffer ')) { // empty object or binary data
        outputData = textData;
      }

      if (outputData && typeof outputData !== 'string') {
        // convert it to Geo data for display on the map
        return this.getGeoData(outputData);
      }
      return textData;
    }

    // TODO: try loading binary Apache Arrow data
    // console.log('leaflet.map:data:output', this.outputData);
    const dataArray: Uint8Array = this.outputData.data();
    console.log(dataArray);
    if (dataArray.length > 0 ) {
      console.log(`leaflet.map:dataType: ${dataArray.constructor}`);
      // return aq.fromArrow(dataArray);
    }
    
    return this.outputData;
  }

  /**
   * Gets JSON object or data array,
   * CSV rows data array, or undefined 
   * for plain text and binary data types.
   * @param data Notebook cell output data value.
   */
  getJsonData(data: any): any {
    // console.log('leaflet.map:data:json:', data);
    try {
      if (typeof data === 'string') {
        // try parsing JSON string
        const textData: string = this.patchJson(data);
        const objectData: any = JSON.parse(textData);
        if (Array.isArray(objectData)) {
          console.log('leaflet.map:data:format: JSON array');
          return objectData;
        }
        else {
          console.log('leaflet.map:data:format: JSON');
          return objectData;
        }
      }

      // try getting json data object
      // console.log('leaflet.map:data:json:', data);
      let jsonData: any = data.json();
      if (jsonData.data) {
        // use data object from REST response
        jsonData = jsonData.data;
      }

      if (jsonData.features) {
        console.log('leaflet.map:data:format: GeoJSON');
        return jsonData;
      }

      if (Array.isArray(jsonData)) {
        console.log('leaflet.map:data:format: JSON array');
        return jsonData;
      }

      if (typeof jsonData === 'string') {
        if (this.isCsv(jsonData)) {
          // parse CSV data for JSON response from REST Book
          // see: https://github.com/tanhakabir/rest-book/issues/114
          return csvParse(jsonData);
        }
        else if (jsonData.startsWith('<?xml version="1.0"')) {
          // try to parse XML data as the last resort
          return this.xmlParse(jsonData);
        }    
      }
    }
    catch (error: any) {
      console.log('leaflet.map:data: JSON.parse error:\n', error.message);
    }
    return undefined;
  }

  /**
   * Patches garbled JSON string.
   * @param data JSON data string.
   * @returns Patched up JSON string.
   */
  patchJson(data: string): string {
    // patch garbled json string
    const escapedQuoteRegEx = /\\\\"/g;
    const objectStartRegEx = /"{/g; 
    const objectEndRegEx = /}"/g;
    const xRegEx = /\\xa0/g;
    const newLineRegEx = /\\n/g;
    let textData: string = data.replace(escapedQuoteRegEx, '"');
    textData = textData.replace(objectStartRegEx, '{');
    textData = textData.replace(objectEndRegEx, '}');
    textData = textData.replace(xRegEx, ' ');
    textData = textData.replace(newLineRegEx, '');
    if (textData.startsWith("'") && textData.endsWith("'")) {
      // strip out start/end single quotes from notebook cell output
      textData = textData.substr(1, textData.length-2);
    }
    // console.log('leaflet.map:data:text:', textData.substring(0, Math.min(300, textData.length)), '...');
    return textData;
  }

  /**
   * Checks if text content is in CSV format.
   * @param text Text content to check.
   */
  isCsv(text: string): boolean {
    if (text === undefined || text.length === 0) {
      return false;
    }
    
    // get text lines
    const maxLines: number = 10;
    const lines: string[] = text.trimEnd().split('\n', maxLines);
    const minRows: number = Math.min(lines.length, maxLines);

    if (lines.length > 0) {
      console.log('leaflet.map:data:lines:', lines);
      const columns: string[] = lines[0].split(',');
      const columnCount = columns.length;

      if (columnCount > 1) {
        console.log('leaflet.map:data:columns:', columns);
        // check columns for garbled json
        for (let k =0; k < columnCount; k++) {
          let columnName: string = columns[k];
          if (columnName.startsWith('[') || columnName.startsWith('{')) {
            return false;
          }
        }

        // do naive check for some commas in the first 9 rows
        for (let i = 1; i < minRows; i++) {
          const columnValues: string[] = lines[i].split(',');
          // console.log(`data.table:row[${i}]`, columnValues);
          if (columnValues.length < columnCount) {
            return false;
          }
        }
        console.log('leaflet.map:data:format: CSV');
        return true;
      }
    }
    return false;
  }

  /**
   * Parses xml data.
   * @param xml Xml data string.
   */
  xmlParse(xml: string): any {
    let jsonData = {};
    const xmlParserOptions = {
      attributeNamePrefix : '',
      textNodeName : 'value',
      ignoreAttributes : false,
      ignoreNameSpace : true,
      allowBooleanAttributes : true,
      parseNodeValue : true,
      parseAttributeValue : true,
      trimValues: true,
      // parseTrueNumberOnly: false,
      // arrayMode: false, //"strict"
    };
    try {
      jsonData = xmlParser.parse(xml, xmlParserOptions); // , true); // validate xml
      console.log('leaflet.map:data:format: XML');
      // console.log(JSON.stringify(jsonData, null, 2));
    }
    catch(error: any) {
      console.log('leaflet.map:data: XML parse error:\n', error.message);
    }
    return jsonData;
  }

  /**
   * Gets geo data in GeoJSON format.
   * @param data Data object.
   */
  getGeoData(data: any): any {
    let geoData = data;
    try {
      geoData = this.geoConverter.toGeo(data, {
        Point: ['latitude', 'longitude'],
        removeInvalidGeometries: true,
        exclude: [
          'geometry.bbox',
          'geometry.type',
          'geometry.coordinates'
        ]    
      });
    }
    catch(error: any) {
      console.log('leaflet.map:data: GeoJSON parse error:\n', error);
    }
    return geoData;
  }
}
