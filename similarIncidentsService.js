const axios = require("axios");

const getCEGroups = async (apiKey) => {
    try {
        const res = await axios({
            method: "get",
            url: "https://api.dev.moogsoft.cloud/v2/correlation/groups?inline-definitions=true",
            headers: {
                Accept: "application/json",
                apiKey: apiKey
            }
        });
        return res?.data;
    } catch (e) {
        if (e.response?.status === 403) {
            console.error("API Key invalid. Get new one from your instance.");
            process.exit();
        }
        console.log("Caught an error: ", e);
    };
};

const editCEGroup = async (apiKey, id, params) => {
    try {
        const res = await axios({
            method: "patch",
            url: `https://api.dev.moogsoft.cloud/v2/correlation/groups/${id}`,
            data: params,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                apiKey: apiKey
            }
        });
        return res?.data;
    } catch (e) {
        if (e.response.status === 403) {
            console.error("API Key invalid. Get new one from your instance.");
            process.exit();
        }
        console.log("Caught an error: ", e);
    };
};

const createNewDef = async (apiKey, params) => {
    try {
        const res = await axios({
            method: "post",
            url: `https://api.dev.moogsoft.cloud/v2/correlation/definitions`,
            data: params,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                apiKey: apiKey
            }
        });
        return res?.data;
    } catch (e) {
        if (e.response.status === 403) {
            console.error("API Key invalid. Get new one from your instance.");
            process.exit();
        }
        console.log("Caught an error: ", e);
    };
};

module.exports = { getCEGroups, editCEGroup, createNewDef };
