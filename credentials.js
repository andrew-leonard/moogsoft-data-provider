/**
 * Sets up a number of credentials in the system
 */

const axios = require("axios")

exports.createCredentials = async function(apiKey, count = 5) {
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
    console.log(`created ${count} set of bearer credentials`);

    for (let i = 0; i < count; i += 1) {
        const url = 'https://api.dev.moogsoft.cloud/express/v1/config'
        const payload = {
            component: 'aws_credential',
            encrypt: true,
            owner: `test-aws-${i}`,
            tenant: 'andrew', // Change to be your tenant 
            attributes: {
                aws_account_id: i,
                aws_external_id: 'external-id-test-1-abc',
                created_by: 'andrew@moogsoft.com',
                aws_role_name: `role${i}`
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
            console.log('caught an error creating aws credential: ', e);
        }
        console.log(`created ${count} set of aws credentials`);
    }
}