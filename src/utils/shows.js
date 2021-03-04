// Modules
import axios from "axios";

// Variables
const ENDPOINT = process.env.VUE_APP_VIDEO_ENDPOINT;

export function fetchShows () {
    return axios.get(`${ ENDPOINT }/shows`);
}