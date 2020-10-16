const axios = require('axios');
const randomWords = require('random-words');

exports.sendEvents = function(apiKey) {

    const sendFn = async function(event) {
        try {
            await axios({
                method: 'post',
                url: 'https://api.dev.moogsoft.cloud/express/v1/integrations/events',
                data: event,
                headers: {
                    apiKey,
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            if (e.response.status === 403) {
                console.error('API Key invalid. Get new one from your instance');
                process.exit();
            }
            console.log('caught an error: ', e);
        }
    }

    // TODO: Add config option for number of events
    const numEvents = 10;
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
        console.log('words length: ', words);
        const singleEvent = {
            source: randomWords(),
            description: randomWords({exactly: 1, wordsPerString: words }),
            check: randomWords(),
            severity: severities[Math.floor(Math.random() * 5)],
            service: randomWords(),
        }
        events.push(singleEvent);
    }

    setInterval(() => {
        events.forEach(evt => {
            sendFn(evt);
        }) ;
    }, 5000);
}
