const axios = require('axios');
const randomWords = require('random-words');

exports.createGroups = function(apiKey, count = 5) {
    const sendFn = async function() {
        try {
            console.log('posting');
            await axios({
                method: 'post',
                url: 'https://api.dev.moogsoft.cloud/v1/groups',
                data: {
                    name: randomWords(),
                },
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    apiKey: apiKey,
                },
            });
        } catch (e) {
            if (e.response.status === 403) {
                console.error('API Key invalid. Get new one from your instance');
                process.exit();
            }
            console.log('caught an error: ', e);
        }
    }
    for (let i = 0; i < count; i += 1) {
        sendFn();
    }
}