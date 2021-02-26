<template>
    <div
        id="video-container"
        ref="videoContainer"
        @mouseenter="overlayVisiblity = true"
        @mouseleave="overlayVisiblity = false"
    >
        <div
            id="video-hitbox"
            @click="togglePause"
        ></div>
        <video
            :key="video"
            ref="video"
            @timeupdate="updateProgressBar"
            @pause="paused = true"
            @play="paused = false"
            @seeking="updateProgressBar"
        >
            <source :src="video" type="video/mp4">
        </video>
        <transition name="fade">
            <div
                v-if="overlayVisiblity"
                id="video-overlay"
            >
                <div id="timestamp-container">
                    <p id="current-timestamp">{{ currentTimestamp() }}</p>
                    <p id="duration-timestamp">{{ durationTimestamp() }}</p>
                </div>
                <div id="controls-container">
                    <div id="video-controls">
                        <div v-if="paused">
                            <button class="control-button" id="play" @click="togglePause">
                                <ion-icon name="play"></ion-icon>
                            </button>
                        </div>
                        <div v-else>
                            <button class="control-button" id="pause" @click="togglePause">
                                <ion-icon name="pause"></ion-icon>
                            </button>
                        </div>
                        <button class="control-button" id="fullscreen" @click="toggleFullscreen">
                            <ion-icon name="expand"></ion-icon>
                        </button>
                    </div>
                    <div id="progress-container" @click="seekOnProgressBar">
                        <div id="progress-bar" :style="`width: ${progressBarWidth}`"></div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    // Utils
    import { formatTime } from "../utils/essentials";

    export default {
        name: "VideoPlayer",
        props: [ "showId", "episodeId" ],
        data () {
            return {
                paused: true,
                progressBarWidth: "0%",
                overlayVisiblity: false
            };
        },
        computed: {
            video () {
                return `${process.env.VUE_APP_API_ENDPOINT}/shows/${this.showId}?ep=${this.episodeId}`;
            },
            user () {
                return this.$store.getters.user;
            }
        },
        methods: {
            togglePause () {
                
                if (this.user?.host) {
                    this.$socket.emit("data", {
                        type: `content:${ this.paused ? "play" : "pause" }`,
                        showId: this.showId,
                        episodeId: this.episodeId
                    });
                }

                if (this.paused) {
                    this.$refs.video.play();
                } else {
                    this.$refs.video.pause();
                }

            },
            toggleFullscreen () {
                this.$refs.videoContainer.requestFullscreen();
            },
            updateProgressBar () {
                
                const {
                    duration,
                    currentTime
                } = this.$refs.video;

                this.progressBarWidth = (100 / duration) * currentTime + "%";
            },
            seekOnProgressBar ({ layerX }) {

                const video = this.$refs.video;

                video.currentTime = (layerX / video.clientWidth) * video.duration;
                this.syncWithClients();

            },
            currentTimestamp () {
                return this.$refs?.video ? formatTime(this.$refs.video.currentTime) : "00:00";
            },
            durationTimestamp () {
                return this.$refs?.video ? formatTime(this.$refs.video.duration) : "00:00";
            },
            syncWithClients () {
                if (this.user?.host) {
                    this.$socket.emit("data", {
                        type: "content:sync",
                        showId: this.showId,
                        episodeId: this.episodeId,
                        time: this.$refs.video.currentTime
                    });
                }
            }
        },
        mounted () {
            
            window.addEventListener("keypress", e => {
                switch (e.code) {
                    case "Space":
                        this.togglePause();
                        break;
                    default:
                }
            });

            this.sockets.subscribe("content:play", ({ showId, episodeId }) => {
                console.log(this.showId == showId, this.episodeId == episodeId, !this.user?.host)
                if (this.showId == showId && this.episodeId == episodeId && !this.user?.host) {
                    this.$refs.video.play();
                }
            });

            this.sockets.subscribe("content:pause", ({ showId, episodeId }) => {
                if (this.showId == showId && this.episodeId == episodeId && !this.user?.host) {
                    this.$refs.video.pause();
                }
            });

            this.sockets.subscribe("content:sync", ({ time = 0, showId, episodeId }) => {

                if (this.showId != showId) {
                    return;
                }

                if (this.episodeId != episodeId) {
                    return;
                }

                if (this.user?.host) {
                    return;
                }

                this.$refs.video.currentTime = time;
                console.log("synced");
            });

        }
    }
</script>

<style scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    #video-container {
        position: relative;
        width: 1280px;
        height: 720px;
    }

    #video-hitbox {
        position: absolute;
        width: 100%;
        height: calc(100% - 50px);
        z-index: 3;
    }

    #video-container video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    #video-overlay {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }

    #controls-container {
        background-color: rgba(34, 34, 34, .6);
    }

    #video-controls {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 10px;
    }

    .control-button {
        border: 0;
        width: 50px;
        height: 50px;
        border-radius: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .control-button ion-icon {
        font-size: 30px;
    }

    #fullscreen {
        position: absolute;
        right: 10px;
    }

    #progress-container {
        position: relative;
        height: 20px;
        width: 100%;
    }

    #progress-bar {
        position: absolute;
        bottom: 0;
        height: 10px;
        background-color: #fff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        transition: .3s width ease-out;
    }

    #timestamp-container {
        margin: 5px;
        margin-top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #timestamp-container p {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
    }

</style>