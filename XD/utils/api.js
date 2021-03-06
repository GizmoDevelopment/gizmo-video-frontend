// Modules
const axios = require("axios");

// Variables
const ENDPOINT = process.env.VUE_APP_API_ENDPOINT;

export async function fetchShow (showId) {
    try {

        const res = await axios.get(`${ENDPOINT}/shows/${showId}`);
        return res.data;

    } catch (err) {
        console.error(err);
        return null;
    }
}