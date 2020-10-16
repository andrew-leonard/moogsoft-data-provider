const axios = require('axios');

exports.sendMetricData = function(apiKey) {
    
    const sendFn = async function(params) {
        const { metric, key, source, tags, value, unit } = params;
        // console.log(`Value for metric ${metric} is ${value}`);
        try {
            await axios({
                method: 'post',
                url: 'https://api.dev.moogsoft.cloud/express/v1/integrations/metrics',
                data: {
                    metric,
                    key,
                    source,
                    tags,
                    data: value,
                    unit,
                },
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
        value: 10,
    }, {
        source: 'machine-1',
        metric: 'm1',
        tags: {
            keys: 'none',
        },
        value: 50,
    }, {
        source: 'i-v-12345',
        metric: 'three',
        value: 5
    }, {
        source: 'i-v-12345',
        metric: 'three',
        value: 5
    }, {
        source: 'macbook',
        metric: 'storage',
        unit: 'gb',
        value: 50
    }, {
        source: 'cpu',
        metric: 'percentile',
        unit: '%',
        value: 20
    }, {
        source: 'upup',
        metric: 'positive',
        value: 100,
        unit: '+'
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