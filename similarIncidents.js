const axios = require("axios");
const randomWords = require("random-words");

exports.similarIncidents = function(apiKey) {

    const sendFn = async function(event) {
        try {
            await axios({
                method: "post",
                url: "https://api.dev.moogsoft.cloud/v1/integrations/events",
                data: event,
                headers: {
                    "Accept": "application/json",
                    apiKey: apiKey,
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            if (e.response.status === 403) {
                console.error("API Key invalid. Get new one from your instance.");
                process.exit();
            }
            console.log("Caught an error: ", e);
        }
    }

    const severities = [
        "minor",
        "major",
        "warning",
        "critical"
    ];

    const sources = [
        "dilithiumSensor",
        "filterMonitor",
        "shieldAware",
        "commsCheck"
    ];

    const comparisonKeyValues = [
        {
            "check": "propulsion",
            "class": "engineering",
            "manager": "warpCore",
            "type": "dilithium"
        },
        {
            "check": "oxygen",
            "class": "lifeSupport",
            "manager": "filter",
            "type": "occluded"
        },
        {
            "check": "defense",
            "class": "shields",
            "manager": "deflectors",
            "type": "signal"
        },
        {
            "check": "communication",
            "class": "subspace",
            "manager": "array",
            "type": "capacity"
        },
        // {
        //     "check": "simulation",
        //     "class": "holodeck",
        //     "manager": "projector",
        //     "type": "power"
        // },
        // {
        //     "check": "lifeSupport",
        //     "class": "replicator",
        //     "manager": "materializer",
        //     "type": "overheating"
        // }
    ];

    function generateEvents(eventCount, sourceIndex, compKeyIndex) {
        const events = [];
        for (count = 0; count < eventCount; count++) {
            events.push({
                "source": sources[sourceIndex],
                "severity": severities[Math.floor(Math.random() * 4)],
                "service": randomWords({ exactly: 1, wordsPerString: 1 }).toString(),
                "description": randomWords({
                    exactly: 1,
                    wordsPerString: 1
                }).toString(),
                "time": Math.floor(Date.now() / 1000),
                ...comparisonKeyValues[compKeyIndex],
            });
        };
        return events;
    };
    
    const events = [
        ...generateEvents(10, 0, 0),  // incident A
        ...generateEvents(8, 1, 0),   // incident A
        ...generateEvents(10, 2, 1),  // incident B
        ...generateEvents(2, 2, 2),   // incident B
        ...generateEvents(10, 3, 1),  // incident C
        ...generateEvents(2, 3, 3)    // incident C
    ]

    console.log("Creating similar incidents...")
    events.forEach(event => sendFn(event));
};
