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
    const severities = [
        'minor',
        'major',
        'warning',
        'critical'
    ];
    // for (let i = 0; i < numEvents; i += 1) {
    //     const words = Math.floor(Math.random() * 100) + 5;
    //     const tags = { 
    //         'animal': 'cow',
    //         'noise': 'moo',
    //         'www': 'www.mywwwurl.com',
    //         'http': 'http://moogsoft.com',
    //         'camelCase': 'cc',
    //         'under_score': 'underscore',
    //     };
    //     const location = {
    //         street: 'battery st',
    //         city: 'SF',
    //         region: 'us-west-2',
    //     };
    //     const singleEvent = {
    //         source: randomWords(),
    //         description: randomWords({exactlyg: 1, wordsPerString: words }).toString(),
    //         check: randomWords(),
    //         severity: severities[Math.floor(Math.random() * 5)],
    //         service: randomWords(),
    //         tags,
    //         location,
    //     }
    //     events.push(singleEvent);
    // }

    const services = [
        ["ecommerce", "webhosts", "database", "storage", "SSO", "network", "telecom", "site builder", "email", "pki" ],
        ["monitoring", "hadoop", "webhosts", "database", "security", "SEO", "site builder", "billing", "Kafka", "pki"],
        ["monitoring", "hadoop", "webhosts", "database", "security", "SEO", "site builder", "billing", "Kafka", "pki"],
        ["hadoop", "ecommerce", "webhosts", "Cloudwatch", "database", "security", "SSO", "network", "Mongodb", "gateway"],
        ["database", "site builder", "Kafka", "Oncall", "pki", "Firewall", "Load Balancer", "Proxy", "Metrics"],
        ["SEO", "site builder", "Kafka", "pki", "EKS", "EMR", "Load Balancer", "ECS", "Aurora"],
    ];

    const checks = ['cpu', 'disk', 'switch'];

    const usbankTags = [
        'rtamnaj9c01337.us.bank-dns.comBGPADJCHANGE*10.99.66.144',
        'rtamnaj9c01337.us.bank-dns.comBGPADJCHANGE*10.99.71.17',
        'rtamnaj9c01337.us.bank-dns.comBGPADJCHANGE*10.99.84.114',
    ];

    const send = () => {
        const events = [];
        for (let i = 0; i < numEvents; i += 1) {
            const words = Math.floor(Math.random() * 100) + 5;
            const tags = { 
                'animal': 'cow',
                'noise': randomWords(),
                'www': 'www.mywwwurl.com',
                'http': 'http://moogsoft.com',
                'camelCase': 'cc',
                'under_score': 'underscore',
                // labels: ['l1', 'l2'],
                // Identifier: usbankTags[i],
                // 'amex.spike.broke.es': 'abc'
                // 'html': '<script>alert("hey")</script>'
            };
            
            // In case needing to add lots of tags
            // const onekTags = randomWords(1000);
            // onekTags.forEach((t) => tags[t] = t);

            const location = {
                street: 'battery st',
                city: 'SF',
                region: 'us-west-2',
                postcode: 'AB12 CDE'
            };
            const singleEvent = {
                source: randomWords(),
                description: randomWords({exactly: 1, wordsPerString: words }).toString(),
                check: checks[i] || 'test',
                severity: severities[Math.floor(Math.random() * 4)],
                service: [randomWords()],
                tags,
                location,
            }
            events.push(singleEvent);
        }
        events.forEach(evt => sendFn(evt));
        console.log(`Batch of ${count} events sent to MOC`);
    }

    send();
    setInterval(() => send(), 10000);
}
