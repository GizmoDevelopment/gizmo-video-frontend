<template>
    <div v-if="show" class="container">
        <header>
            <h1>{{ show.title }}</h1>
        </header>
        <VideoPlayer :show-id=showId :episode-id=episodeId />
        <div id="host-container" v-if="isHost()">
            <button @click="prepareForViewers">Prepare</button>
        </div>
        <h2>Episodes</h2>
        <div class="episode-list">
            <div v-for="(_, episode) in show.episodes" :key=episode>
                <button :class="'episode-button ' + `${ episodeId == episode && 'active-episode' }`" @click="switchToEpisode(episode)">{{ episode }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    
    // Components
    import VideoPlayer from "../components/VideoPlayer";
    
    // Utils
    import { fetchShow } from "../utils/api";

    export default {
        name: "Player",
        props: [ "showId" ],
        components: {
            VideoPlayer
        },
        data () {
            return {
                episodeId: 1,
                show: null
            };
        },
        async mounted () {
            this.show = await fetchShow(this.showId);
        },
        methods: {
            switchToEpisode (episodeId) {
                this.episodeId = episodeId;
            },
            prepareForViewers () {
                this.$socket.emit("content:prepare", {
                    showId: this.showId,
                    episodeId: this.episodeId
                });
            },
            isHost () {
                return this.$store.state?.user?.host;
            }
        }
    }

</script>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .episode-list {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
    }

    .episode-button {
        border-radius: 100%;
        border: 0;
        padding: 10px;
        font-size: 20px;
        padding-left: 15px;
        padding-right: 15px;
        margin-left: 5px;
        margin-right: 5px;
    }

    .active-episode {
        background-color: #360c5e !important;
    }

    .active-episode:hover {
        background-color: rgba(54, 12, 94, .5) !important;
    }

</style>