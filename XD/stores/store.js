// Modules
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        shows: null
    },
    mutations: {
        UPDATE_USER (state, user) {
            state.user = user;
        },
        UPDATE_SHOWS (state, shows) {
            state.shows = shows;
        }
    },
    getters: {
        user: state => {
            return state.user;
        },
        shows: state => {
            return state.shows;
        }
    }
});