const axios = require('axios');

exports.sendCYOIMetrics = function() {
    const url = 'https://api.dev.moogsoft.cloud/express/v1/integrations/custom/661ef5c042ac/m';
    const apiKey = 'e8317615-26b5-49fc-8c7e-bd3694aa3772';
    if (!url || !apiKey) {
        console.log('cannot send to CYOI. Need to add in api key and specific endpoint url');
        return;
    }

    const sendFn = async function(payload) {
        // const { metric, key, source, tags, value, unit } = params;
        // console.log(`Value for metric ${metric} is ${value}`);
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

    const metrics = [{
        source: '10.1.0.1',
        metric: 'stable',
        key: 'k1',
        tags: {
            env: 'node',
            owner: 'andrew'
        },
        number: 10,
    }, {
        source: 'machine-1',
        metric: 'm1',
        tags: {
            keys: 'none',
        },
        number: 50,
    }];

    metrics.forEach(m => sendFn(m));
    setInterval(() => {
        // change the value for each
        metrics.forEach(m => {
            const clone = Object.assign({}, m);
            const randomValue = Math.floor(Math.random() * 10 + 1);
            const shouldChange = randomValue === 3 ? true : false;
            if(shouldChange) {
                clone.value = clone.value * 5;
            }
            sendFn(clone)
        });
    }, 5000);
}