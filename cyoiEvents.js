const axios = require('axios');
const randomWords = require('random-words');

exports.sendCYOIEvents = function(apiKey, batchSize = 60) {
    const url = 'https://api.dev.moogsoft.cloud/express/v1/integrations/custom/661ef5c042ac/batch';

    if (!url || !apiKey) {
        console.log('cannot send to CYOI. Need to add in api key and specific endpoint url');
        return;
    }

    const sendFn = async function(payload) {
        try {
            await axios({
                method: 'post',
                url,
                data: payload,
                headers: {
                    apiKey,
                    'Content-Type': 'application/json'
                }
            });
        } catch(e) {
            if (e.response.status === 403) {
                console.error('API Key invalid. Get new one from your instance');
                process.exit();
            }
            console.log('caught an error: ', e);
        }
    }

    const events = [];
    const severities = [
        'clear',
        'minor',
        'major',
        'warning',
        'critical'
    ];
    for(let i = 0; i < batchSize; i += 1) {
        const words = Math.floor(Math.random() * 100) + 5;
        const tags = {
            'animal': 'cow',
            'noise': 'moo',
            'www': 'www.mywwwurl.com',
            'http': 'http://moogsoft.com',
            'camelCase': 'cc',
            'under_score': 'underscore',
        };
        const location = {
            street: 'battery st',
            city: 'SF',
            region: 'us-west-2',
        };
        const singleEvent = {
            source: randomWords(),
            description: randomWords({exactly: 1, wordsPerString: words }).toString(),
            check: randomWords(),
            severity: severities[Math.floor(Math.random() * 5)],
            service: randomWords(),
            tags,
            location,
        }
        events.push(singleEvent);
    }

    const send = () => {
        sendFn(events);
        console.log(`Sent batch of ${batchSize} events`);
    }

    send();
    setInterval(() => send, 60000);
}