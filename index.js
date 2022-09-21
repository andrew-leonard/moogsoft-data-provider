const { sendMetricData } = require('./sendMetrics');
const { sendEvents } = require('./sendEvents');
const { sendCYOIMetrics } = require('./cyoiMetrics');
const { sendCYOIEvents } = require('./cyoiEvents');
const { createCredentials } = require('./credentials');
var argv = require('minimist')(process.argv.slice(2));

const API_KEY = '' || argv['apiKey'];

if (!API_KEY) {
    console.error('needs api key');
    process.exit();
} 

// use arguments

argv['metrics'] && sendMetricData(API_KEY);
argv['events'] && sendEvents(API_KEY, 5);
argv['cyoiMetrics'] && sendCYOIMetrics();
argv['cyoiEvents'] && sendCYOIEvents(API_KEY);
argv['credentials'] && createCredentials(API_KEY, 10);
