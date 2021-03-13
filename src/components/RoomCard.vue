<template>
    <div class="room-container" v-if="ready">
        <div class="room-information">
            <h1>{{ room.name }}</h1>
            <div class="room-data" v-if="room.data">
                <ion-icon name="play"></ion-icon>
                {{ formatRoomData() }}
            </div>
            <router-link
                :to="`/rooms/${ room.id }`"
                tag="button"
            >
                Join
            </router-link>
        </div>
        <div class="room-users">
            <div v-for="user in room.users" :key="user.id">
                <img
                    class="room-user-avatar"
                    draggable="false"
                    :src="user.avatar"
                    :style="user.id === room.host.id ? 'border: 3px solid var(--primary-color);' : ''"
                >
            </div>
        </div>
    </div>
</template>

<script>

    // Utils
    import { getShow } from "../utils/shows";

    export default {
        name: "RoomCard",
        props: [ "room" ],
        data () {
            return {
                ready: false
            };
        },
        methods: {
            formatRoomData () {
                if (this.room.data) {

                    const
                        { data } = this.room,
                        show = this.$store.state.shows[this.room.data.showId];

                    return `${ show.title } (EP ${ data.episodeId })`;
                } else {
                    return "Nothing";
                }
            }
        },
        async mounted () {
            
            const { data } = this.room;

            if (data) {
                if (this.$store.state.shows[data?.showId]) {
                    this.ready = true
                } else {

                    const show = await getShow(data.showId);
                    this.$store.commit("ADD_SHOW", show);
                    this.ready = true;

                }
            } else {
                this.ready = true
            }

        }
    }

</script>

<style scoped>

    .room-container {
        background-color: var(--container-background-color);
        width: 600px;
        border-radius: 15px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px;
    }

    .room-information {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-right: 15px;
    }

    .room-information h1 {
        margin: 0;
        margin-bottom: 10px;
    }

    .room-information button {
        font-size: 2em;
        margin-top: 20px;
    }

    .room-data {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-style: italic;
        font-size: 1.3em;
    }

    .room-data ion-icon {
        background-color: var(--background-color);
        border-radius: 100%;
        font-size: 1em;
        padding: 5px;
        margin-right: 10px;
    }

    .room-users {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .room-user-avatar {
        border-radius: 100%;
        width: 40px;
        height: 40px;
        margin-left: -10px;
    }

    .room-user-host {
        border: 3px solid var(--primary-color);
    }

</style>