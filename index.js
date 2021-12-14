const { sendMetricData } = require('./sendMetrics');
const { sendEvents } = require('./sendEvents');
const { sendCYOIMetrics } = require('./cyoiMetrics');
const { sendCYOIEvents } = require('./cyoiEvents');
const { createCredentials } = require('./credentials');
const API_KEY = '';

// sendMetricData(API_KEY);
sendEvents(API_KEY, 10);
// sendCYOIMetrics(API_KEY);
// sendCYOIEvents(API_KEY);
// createCredentials(API_KEY, 50);


