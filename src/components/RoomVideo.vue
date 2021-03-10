<template>
    <div v-if="data">
        <Video

            ref="video"

            :show-id="showId"
            :episode-id="episodeId"
            :timestamp="timestamp"
            :controls="isHost"

            @hook:mounted="initVideo()"
            @video-pause="syncPlayer()"
            @video-play="syncPlayer()"
            @video-seek="syncPlayer()"

        />
        <ShowEpisodeList
            :show-id="showId"
            :active-episode-id="episodeId"
        />
    </div>
    <div v-else>
        <h2 class="faded-text">No show has been selected yet</h2>
    </div>
</template>

<script>

    // Components
    import Video from "./Video";
    import ShowEpisodeList from "./ShowEpisodeList";

    export default {
        name: "RoomVideo",
        components: {
            Video,
            ShowEpisodeList
        },
        props: [ "data", "isHost" ],
        computed: {
            showId () {
                return this.data?.showId;
            },
            episodeId () {
                return this.data?.episodeId;
            },
            timestamp () {
                return this.data?.timestamp;
            }
        },
        methods: {
            syncPlayer () {
                this.$nextTick(() => {
                    if (this.isHost) {

                        const { video } = this.$refs;

                        const syncData = {
                            timestamp: video.getCurrentTime(),
                            paused: video.getPausedState()
                        };

                        this.$socket.emit("client:sync_player", syncData, ({ type, message }) => {
                            if (type !== "success") {
                                console.error(message);
                            }
                        })

                    }
                });
            },
            initVideo () {
                this.$nextTick(() => {

                    if (this.data?.timestamp) {
                        this.$refs.video.seekToTimestamp(this.data.timestamp);
                    }

                    this.sockets.subscribe("client:sync_player", ({ timestamp, paused }) => {
                        this.$nextTick(() => {

                            const { video } = this.$refs;
                            
                            if (video) {
                                
                                const timeDifference = video.getCurrentTime() - timestamp;

                                if (Math.abs(timeDifference) > 15) {
                                    video.seekToTimestamp(timestamp);
                                }

                                if (paused) {
                                    video.pause();
                                } else {
                                    video.play();
                                }
                            }

                        });
                    });

                    this.sockets.subscribe("client:join_room", () => {
                        if (this.isHost) this.syncPlayer();
                    });

                    setInterval(() => {
                        if (this.isHost) this.syncPlayer();
                    }, 10000);

                });
            }
        }
    }

</script>