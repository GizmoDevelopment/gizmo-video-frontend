<template>
    <div>
        <div v-if="data">
            <video

                ref="video"
                width="1280"
                height="720"

                :controls="isHost"
                :src="videoSource"

                @pause="syncPlayer()"
                @play="syncPlayer()"
                @seeked="syncPlayer()"

            >
            </video>
            <ShowEpisodeList
                :showId="data.showId"
            />
        </div>
        <div v-else>
            <h2 class="faded-text">No show has been selected yet</h2>
        </div>
    </div>
</template>

<script>

    // Components
    import ShowEpisodeList from "../components/ShowEpisodeList";

    export default {
        name: "VideoPlayer",
        props: [ "data", "isHost" ],
        components: {
            ShowEpisodeList
        },
        computed: {
            user () {
                return this.$store.state.user;
            },
            videoSource () {
                return `${ process.env.VUE_APP_VIDEO_ENDPOINT }/shows/${ this.data?.showId }/episodes/${ this.data?.episodeId }/stream`;
            },
            video () {
                return this.$refs.video;
            }
        },
        methods: {
            syncPlayer () {
                if (this.isHost) {

                    const { video } = this.$refs;

                    if (video) {
                        
                        const syncData = {
                            timestamp: video.currentTime,
                            paused: video.paused
                        };

                        this.$socket.emit("client:sync_player", syncData, ({ type, message}) => {
                            if (type !== "success") {
                                console.error(message);
                            }
                        });
                    }
                }
            }
        },
        mounted () {

            if (this.data?.timestamp) {
                this.$refs.video.currentTime = this.data.timestamp;
            }
            
            this.sockets.subscribe("client:sync_player", ({ timestamp, paused }) => {

                const { video } = this.$refs;

                if (video) {
                    
                    const timeDifference = video.currentTime - timestamp;

                    if (timeDifference > 15 || timeDifference < 15) {
                        video.currentTime = timestamp;
                    }
                    
                    if (paused) {
                        video.pause();
                    } else {
                        video.play();
                    }
                }

            });

            this.sockets.subscribe("client:join_room", () => {
                if (this.isHost) {
                    this.syncPlayer();
                }
            });

            setInterval(() => {
                if (this.isHost) {
                    this.syncPlayer();
                }
            }, 10000);

        }
    }

</script>

<style scoped>

</style>