const axios = require('axios');

exports.sendMetricData = function(apiKey) {
    
    const sendFn = async function(params) {
        const { metric, key, source, tags, value, unit } = params;
        // console.log(`Value for metric ${metric} is ${value}`);
        try {
            const resp = await axios({
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
        value: 2.4,
    }, {
        source: 'machine-1',
        metric: 'm1',
        tags: {
            keys: 'none',
        },
        value: 50.000000123,
    }, {
        source: 'i-v-12345',
        metric: 'three',
        value: 5.786
    }, {
        source: 'i-v-56789',
        metric: 'three',
        value: 50
    }, {
        source: 'macbook',
        metric: 'storage',
        unit: 'gb',
        value: 50.000000001
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
    }, {
        source: 'abc#def',
        metric: 'badname',
        value: 5,
        unit: '+'
    }, {
        source: 'local',
        metric: 'small',
        value: 0.00023
    }, {
        source: 'abc',
        metric: 'test-counter',
        value: 1,
        tags: {
            counter: true,
        }
    }];

    metrics.forEach(m => sendFn(m));
    setInterval(() => {
        // change the value for each
        metrics.forEach(m => {
            const isCounter = m.tags?.counter === true;
            if (isCounter) {
                m.value += 1;
            }
            const clone = Object.assign({}, m);
            if (!isCounter) {
                const randomValue = Math.floor(Math.random() * 10 + 1);
                const shouldChange = randomValue === 3 ? true : false;
                if(shouldChange) {
                    clone.value = clone.value * 5;
                }
            }
            
            sendFn(clone)
        });
    }, 10000);
}