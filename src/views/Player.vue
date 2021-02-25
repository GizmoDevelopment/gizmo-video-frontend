<template>
    <div v-if="show" class="container">
        <header>
            <h1>{{ show.title }}</h1>
        </header>
        <VideoPlayer :show-id=showId :episode-id=episodeId />
        <h2>Episodes</h2>
        <div class="episode-list">
            <div v-for="(episode, index) in show.episodes" :key=index>
                <button class="episode-button" @click="switchToEpisode(index)">{{ index }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    
    // Components
    import VideoPlayer from "../components/VideoPlayer";
    
    // Utils
    import { fetchShow } from "../utils/show";

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
            }
        },
        async mounted () {
            this.show = await fetchShow(this.showId);
        },
        methods: {
            switchToEpisode (episodeId) {
                this.episodeId = episodeId;
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

</style>