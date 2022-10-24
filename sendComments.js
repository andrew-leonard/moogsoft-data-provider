const axios = require('axios');
const randomWords = require('random-words');

exports.sendCommentsData = function(apiKey) {
    const sendFn = async function(incidentId) {
        try {
            const res = await axios({
                method: 'POST',
                url: `https://api.dev.moogsoft.cloud/express/v1/incidents/${incidentId}/comments`,
                data: {
                    'comment': randomWords({ exactly: 15, join: ' ' }),
                    'isResolvingStep': false,
                },
                headers: {
                    apiKey,
                    'Content-Type': 'application/json'
                }
            });
        } catch(e) {
            if (e.response.status === 400) {
                return;
            }
            if (e.response.status === 403) {
                console.error('API Key invalid. Create a new one in your instance.');
                process.exit();
            }
        }
        
    }
    // send comment to incident IDs 1 to 100
    for (let incidentId = 1; incidentId <= 100; incidentId++) {
        sendFn(incidentId);
    }
    process.exit();
}