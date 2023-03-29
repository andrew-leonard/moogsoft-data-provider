const axios = require("axios");
const randomWords = require("random-words");

// This will only generate similar incidents when using the default
// "similar sources" correlation definition and only when using the default
// similarity calculation which uses the comparison key: check, class, manager, type

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
        "commsCheck",
        "hologramStream",
        "cptJeanLucPicard"
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
        {
            "check": "simulation",
            "class": "holodeck",
            "manager": "projector",
            "type": "power"
        },
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

    // All of Incident B's alerts are similar to the alerts in Incident A
    // Incidents C and D will have similar alerts in common, and some unique alerts
    // Incidents E and F will be 100% similar
    
    const events = [
        ...generateEvents(10, 0, 0),  // incident A
        ...generateEvents(8, 1, 0),   // incident B
        ...generateEvents(15, 2, 1),  // incident C
        ...generateEvents(1, 2, 2),   // incident C
        ...generateEvents(15, 3, 1),  // incident D
        ...generateEvents(1, 3, 3),   // incident D
        ...generateEvents(10, 4, 4),  // incident E
        ...generateEvents(10, 5, 4)   // incident F
    ]

    console.log("Creating similar incidents...")
    events.forEach(event => sendFn(event));
};
