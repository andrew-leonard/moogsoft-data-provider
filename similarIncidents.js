const axios = require('axios');
const randomWords = require('random-words');

exports.similarIncidents = function(apiKey) {

    const sendFn = async function(event) {
        try {
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
                console.error('API Key invalid. Get new one from your instance.');
                process.exit();
            }
            console.log('Caught an error: ', e);
        }
    }

    const severities = [
        'minor',
        'major',
        'warning',
        'critical'
    ];

    const sources = [
        'dilithiumSensor',
        'filterMonitor',
        'shieldAware',
        'commsCheck'];

    const comparisonKeyValues = [
        {
            check: 'propulsion',
            class: 'engineering',
            manager: 'warpCore',
            type: 'dilithium'
        },
        {
            check: 'oxygen',
            class: 'lifeSupport',
            manager: 'filter',
            type: 'occluded'
        },
        {
            check: 'defense',
            class: 'shields',
            manager: 'deflectors',
            type: 'signal'
        },
        {
            check: 'communication',
            class: 'subspace',
            manager: 'array',
            type: 'capacity'
        },
        {
            check: 'simulation',
            class: 'holodeck',
            manager: 'projector',
            type: 'power'
        },
        {
            check: 'lifeSupport',
            class: 'replicator',
            manager: 'materializer',
            type: 'overheating'
        }
    ];

    const eventData = {
        description: 'CPU spike to 75%',
        time: Math.floor(Date.now() / 1000),
        alias: 'alias',
        location: {
          geo_coordinates: { lat: 42.3665325, long: -71.0501863 },
          region: 'us-west-1'
        },
        manager_id: '1234',
        tags: {
            'jira-ticket': 'RGB-2654',
            'error-code': 'x0F391',
            'default-sprint': 'dazzling-wright',
            'scrum-team': 'spifftacular-brainiacs'
        }
    };

    function generateEvents(eventCount, sourceIndex, compKeyIndex) {
        const events = [];
        for (count = 0; count <= eventCount; count++) {
            events.push({
                source: sources[sourceIndex],
                severity: severities[Math.floor(Math.random() * 4)],
                service: randomWords(
                    {exactly: 1, wordsPerString: 1 }
                ).toString(),
                ...eventData,
                ...comparisonKeyValues[compKeyIndex],
            });
        };
        return events;
    };
    
    const events = [
        ...generateEvents(10, 0, 0),
        ...generateEvents(7, 1, 1),
        ...generateEvents(10, 2, 2),
        ...generateEvents(3, 2, 3),
        ...generateEvents(7, 3, 4),
        ...generateEvents(4, 3, 5)
    ]

    events.forEach(event => sendFn(event));
};
