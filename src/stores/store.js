// Modules
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        shows: null,
        room: null
    },
    mutations: {
        UPDATE_USER (state, user) {
            state.user = user;
        },
        UPDATE_SHOWS (state, shows) {
            state.shows = shows;
        },
        UPDATE_ROOM (state, room) {
            state.room = room;
        },
        UPDATE_ROOM_DATA (state, roomData) {
            if (state.room) state.room.data = roomData;
        }
    }
});