<template>
    <div id="container" v-if="show">
        <h2>{{ show.title }}</h2>
        <div id="episode-container">
            <button
                class="episode-entry"
                v-for="(_, episode) in show.episodes"
                :key="episode"
                @click="changeToEpisode(episode)"
            >
                {{ episode }}
            </button>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Show",
        props: [ "showId" ],
        computed: {
            show () {
                return this.$store.state.shows?.[this.showId];
            }
        },
        methods: {
            changeToEpisode (episodeId) {

                const state = this.$store.state;

                if (state.room && state.user.id === state.room.host.id) {
                    this.$socket.emit("client:update_room", {
                        showId: this.showId,
                        episodeId
                    }, ({ type, message }) => {
                        if (type === "success") {
                            this.$router.push(`/rooms/${ state.room.id }`);
                        } else {
                            console.error(message);
                        }                     
                    });
                }
            }
        }
    }

</script>

<style scoped>

    #episode-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .episode-entry {
        border-radius: 100%;
        padding: 6px;
        padding-left: 15px;
        padding-right: 15px;
        font-size: 30px;
        margin-left: 5px;
        margin-right: 5px;
    }

</style>