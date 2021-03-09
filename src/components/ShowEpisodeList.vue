<template>
    <div id="episode-container" v-if="episodes">
        <button
            :class="`episode-entry ${ activeEpisodeId === episode ? 'active-episode-entry' : '' }`"
            v-for="(_, episode) in episodes"
            :key="episode"
            @click="changeToEpisode(episode)"
        >
            {{ episode }}
        </button>
    </div>
</template>

<script>

    export default {
        name: "ShowEpisodeList",
        props: [ "showId", "activeEpisodeId" ],
        data () {
            return {
                episodes: null
            };
        },
        methods: {
            changeToEpisode (episodeId) {

                const state = this.$store.state;

                if (state.room && state.user.id === state.room?.host?.id) {
                    this.$socket.emit("client:update_room_data", {
                        showId: this.showId,
                        episodeId
                    }, ({ type, message }) => {
                        if (type === "success") {
                            if (this.$route.name === "Show") {
                                this.$router.push(`/rooms/${ state.room.id }`);
                            } else {
                                this.$store.commit("UPDATE_ROOM_DATA", message.data);
                            }
                        } else {
                            console.error(message);
                        }                     
                    });
                } else {
                    this.$emit("episode-change", episodeId);
                }
            }
        },
        mounted () {
            
            const shows = this.$store.state.shows;

            if (shows) {
                this.episodes = shows[this.showId].episodes;
            }
        }
    }

</script>

<style scoped>

    #episode-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 25px;
        margin-bottom: 25px;
    }

    .episode-entry {
        border-radius: 100%;
        padding: 10px;
        width: 40px;
        height: 40px;
        font-size: 20px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .active-episode-entry {
        border: 3px solid var(--text-color);
    }

</style>