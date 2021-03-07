<template>
    <div id="container" v-if="show">
        <h2>{{ show.title }}</h2>
        <ShowEpisodeList
            :show-id="showId"
        />
    </div>
</template>

<script>

    // Components
    import ShowEpisodeList from "../components/ShowEpisodeList";

    export default {
        name: "Show",
        props: [ "showId" ],
        components: {
            ShowEpisodeList
        },
        computed: {
            show () {
                return this.$store.state.shows?.[this.showId];
            }
        }
    }

</script>