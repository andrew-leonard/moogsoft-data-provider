/**
 * Sets up a number of credentials in the system
 */

const axios = require("axios")

exports.createCredentials = async function(apiKey, count = 20) {
    for (let i = 0; i < count; i += 1) {
        const url = 'https://api.dev.moogsoft.cloud/express/v1/config'
        const payload = {
            component: 'bearer_credential',
            encrypt: true,
            owner: `test${i}`,
            tenant: 'andrew', // Change to be your tenant 
            attributes: {
                token: `token${i}`,
                created_by: 'andrew@moogsoft.com'
            }
        }
        try {
            await axios({
                method: 'post',
                url,
                data: payload,
                headers: {
                    apiKey,
                    'Content-Type': 'application/json'
                }
            })
        } catch(e) {
            if (e.response.status === 403) {
                console.error('API Key invalid. Get new one from your instance');
                process.exit();
            }
            console.log('caught an error creating credential: ', e);
        }
    }
    console.log(`created ${count} set of credentials`);
}