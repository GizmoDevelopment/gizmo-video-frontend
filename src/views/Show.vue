<template>
    <div id="container" v-if="show">
        <p></p>
        <h2 class="no-margin">{{ show.title }}</h2>
        <h3 class="faded-text no-margin">{{ episodeTitle }}</h3>
        <Video
            controls
            :show-id="showId"
            :episode-id="episodeId"
        />
        <ShowEpisodeList
            :show-id="showId"
            :active-episode-id="episodeId"
            @episode-change="changeToEpisode"
        />
    </div>
</template>

<script>

    // Components
    import ShowEpisodeList from "../components/ShowEpisodeList";
    import Video from "../components/Video";

    export default {
        name: "Show",
        props: [ "showId" ],
        data () {
            return {
                episodeId: 1
            };
        },
        components: {
            ShowEpisodeList,
            Video
        },
        computed: {
            show () {
                return this.$store.state.shows?.[this.showId];
            },
            episodeTitle () {
                return this.$store.state.shows[this.showId]?.episodes[this.episodeId]?.title;
            }
        },
        methods: {
            changeToEpisode (episodeId) {
                this.episodeId = episodeId;
            }
        }
    }

</script>

<style scoped>

    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>