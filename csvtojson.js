const csvToJson = require('convert-csv-to-json');

let fileInputName = 'myntra_products_catalog.csv'; 
let fileOutputName = 'jsonFormat.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
