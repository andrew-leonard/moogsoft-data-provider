const { sendMetricData } = require('./sendMetrics');
const { sendEvents } = require('./sendEvents');
const { sendCYOIMetrics } = require('./cyoiMetrics');
const { sendCYOIEvents } = require('./cyoiEvents');
const { createCredentials } = require('./credentials');
const { sendCommentsData } = require('./sendComments');
var argv = require('minimist')(process.argv.slice(2));

const API_KEY = 'b9b44430-89e3-4510-b748-f64529f4ca17' || argv['apiKey'];

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
argv['comments'] && sendCommentsData(API_KEY);
