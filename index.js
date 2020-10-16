const { sendMetricData } = require('./sendMetrics');
const { sendEvents } = require('./sendEvents');
const API_KEY = 'andrew_!d98a123b-e496-433e-b998-fc87db930db8';

sendMetricData(API_KEY);
sendEvents(API_KEY);

