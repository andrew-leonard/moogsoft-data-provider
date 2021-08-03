const axios = require('axios');
const randomWords = require('random-words');

exports.sendEvents = function(apiKey, count = 10) {

    const sendFn = async function(event) {
        try {
            // console.log(`event: ${JSON.stringify(event)}`);
            await axios({
                method: 'post',
                url: 'https://api.dev.moogsoft.cloud/v1/integrations/events',
                data: event,
                headers: {
                    'Accept': 'application/json',
                    apiKey: apiKey,
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            if (e.response.status === 403) {
                console.error('API Key invalid. Get new one from your instance');
                process.exit();
            }
            console.log('caught an error: ', e);;
        }
    }

    const numEvents = count;
    const events = [];
    const severities = [
        'clear',
        'minor',
        'major',
        'warning',
        'critical'
    ];
    for (let i = 0; i < numEvents; i += 1) {
        const words = Math.floor(Math.random() * 10) + 5;
        const tags = {
            'animal': 'cow',
            'noise': 'moo',
            'www': 'www.mywwwurl.com',
            'http': 'http://moogsoft.com',
            'camelCase': 'cc'
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
        events.forEach(evt => sendFn(evt));
    }

    send();
    setInterval(() => send(), 10000);
}
