const { sendMetricData } = require('./sendMetrics');
const { sendEvents } = require('./sendEvents');
const { sendCYOIMetrics } = require('./cyoiMetrics');
const API_KEY = 'trevor_!00a7a8eb-ba90-4661-8de8-cca0a59ce3a7';

sendMetricData(API_KEY);
sendEvents(API_KEY);
sendCYOIMetrics();


