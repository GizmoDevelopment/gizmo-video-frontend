<template>
    <div v-if="shows">
        <h1>Shows</h1>
        <div id="show-container">
            <div v-for="show in shows" :key="show.id">
                <ShowCard :show="show" />
            </div>
        </div>
    </div>
    <div v-else>
        <Buffer />
    </div>
</template>

<script>

    // Components
    import ShowCard from "../components/ShowCard";
    import Buffer from "../components/Buffer";

    // Utils
    import { fetchShows } from "../utils/shows";

    export default {
        name: "ShowList",
        components: {
            ShowCard,
            Buffer
        },
        data () {
            return {
                shows: null
            };
        },
        async mounted () {

            const shows = this.$store.state.shows;

            if (shows) {
                this.shows = shows;
            } else {

                const freshShows = (await fetchShows()).data;

                this.shows = freshShows;
                this.$store.commit("UPDATE_SHOWS", freshShows);
            }

        }
    }

</script>

<style scoped>

    #show-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

</style>