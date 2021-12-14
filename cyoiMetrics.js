const axios = require('axios');

exports.sendCYOIMetrics = function(apiKey) {
    const url = 'https://api.dev.moogsoft.cloud/express/v1/integrations/custom/661ef5c042ac/ts';

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
    }, {
        source: 'i-v-12345',
        metric: 'three',
        value: 5
    }, {
        source: 'i-v-12345',
        metric: 'three',
        number: 5
    }, {
        source: 'macbook',
        metric: 'storage',
        unit: 'gb',
        number: 50
    }, {
        source: 'cpu',
        metric: 'percentile',
        unit: '%',
        number: 20
    }, {
        source: 'upup',
        metric: 'positive',
        number: 100,
        unit: '+'
    }, {
        source: 'a',
        metric: 'dc',
        number: 5,
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
    }, 10000);
}