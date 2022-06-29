const { sendMetricData } = require('./sendMetrics');
const { sendEvents } = require('./sendEvents');
const { sendCYOIMetrics } = require('./cyoiMetrics');
const { sendCYOIEvents } = require('./cyoiEvents');
const { createCredentials } = require('./credentials');
const API_KEY = ''; 

// To send data uncomment the method you wish to use

// sendMetricData(API_KEY);
// sendEvents(API_KEY, 3);
// sendCYOIMetrics();
// sendCYOIEvents(API_KEY);
// createCredentials(API_KEY, 10);
