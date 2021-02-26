<template>
    <div v-if="show" class="container">
        <header>
            <h1>{{ show.title }}</h1>
        </header>
        <div id="video-view">
            <VideoPlayer :show-id=showId :episode-id=episodeId />
            <div id="user-container">
                <UserList />
            </div>
        </div>
        <div id="host-container" v-if="user.host">
            <button @click="prepareForViewers">Sync</button>
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
    import UserList from "../components/UserList";
    
    // Utils
    import { fetchShow } from "../utils/api";

    export default {
        name: "Player",
        props: [ "showId" ],
        components: {
            VideoPlayer,
            UserList
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
        computed: {
            user () {
                return this.$store.getters.user;
            }
        },
        methods: {
            switchToEpisode (episodeId) {
                this.episodeId = episodeId;
            },
            prepareForViewers () {
                this.$socket.emit("data", {
                    type: "content:sync",
                    showId: this.showId,
                    episodeId: this.episodeId,
                    time: 0
                });
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

    #user-container {
        position: absolute;
        right: -400px;
        top: 0;
    }

    #host-container {
        margin-top: 30px;
    }

    #host-container button {
        font-size: 30px;
    }

    #video-view {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
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