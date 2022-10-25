const axios = require('axios');
const randomWords = require('random-words');

exports.sendCommentsData = function(apiKey) {
    const sendFn = async function(incidentId) {
        try {
            const res = await axios({
                method: 'POST',
                url: `https://api.dev.moogsoft.cloud/express/v1/incidents/${incidentId}/comments`,
                data: {
                    comment: randomWords({
                        min: 5,
                        max: 15,
                        join: ' ',
                    }),
                    isResolvingStep: false,
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    apiKey: apiKey,
                },
            });
            console.log(`Added comment to incident #${incidentId}.`)
        } catch(e) {
            if (e.response.status === 400) return; // no such incidentId
            if (e.response.status === 403) {
                console.error('API Key invalid. Create a new one in your instance.');
                process.exit();
            }
            console.log('An error occurred: ', e.response.statusText);
        };
    };

    // change below values if you want a different ID range
    const minIdVal = 1;
    const maxIdVal = 15;

    // send a comment to incident IDs between range
    for (let incidentId = minIdVal; incidentId <= maxIdVal; incidentId++) {
        sendFn(incidentId);
    }
}