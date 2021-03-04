<template>
    <div>
        <video
            ref="video"
            :controls="isHost"
            width="1280"
            height="720"
            @pause="syncPlayer()"
            @play="syncPlayer()"
            @seeked="syncPlayer()"
        >
            <source :src="videoSource" type="video/mp4">
        </video>
    </div>
</template>

<script>

    export default {
        name: "VideoPlayer",
        props: [ "data", "isHost" ],
        data () {
            return {
                ready: false
            };
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
            
            this.sockets.subscribe("client:sync_player", ({ timestamp, paused }) => {

                const { video } = this.$refs;

                const timeDifference = video.currentTime - timestamp;

                if (timeDifference > 5 || timeDifference < 5) {
                    video.currentTime = timestamp;
                }
                
                if (paused) {
                    video.pause();
                } else {
                    video.play();
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
            }, 7000);

        }
    }

</script>

<style scoped>

    #autoplay-prompt {
        width: 1280px;
        height: 720px;
        background-color: #333142;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #autoplay-prompt * {
        user-select: none;
    }

</style>