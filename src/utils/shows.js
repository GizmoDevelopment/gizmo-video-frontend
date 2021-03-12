// Modules
import axios from "axios";

// Variables
const ENDPOINT = process.env.VUE_APP_VIDEO_ENDPOINT;

export async function fetchShows () {
    return (await axios.get(`${ ENDPOINT }/shows`)).data;
}

export async function getShow (id) {
    return (await (axios.get(`${ ENDPOINT }/shows/${ id }`)))?.data;
}