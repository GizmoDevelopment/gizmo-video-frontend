// Modules
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        shows: {},
        room: null
    },
    mutations: {
        UPDATE_USER (state, user) {
            state.user = user;
        },
        UPDATE_SHOWS (state, shows) {
            state.shows = shows;
        },
        ADD_SHOW (state, show) {
            state.shows[show.id] = show;
        },
        UPDATE_ROOM (state, room) {
            state.room = room;
        },
        UPDATE_ROOM_DATA (state, roomData) {
            if (state.room) state.room.data = roomData;
        }
    }
});