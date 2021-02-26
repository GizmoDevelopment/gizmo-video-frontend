// Modules
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        UPDATE_USER (state, user) {
            state.user = user;
        }
    },
    getters: {
        user: state => {
            return state.user;
        }
    }
});