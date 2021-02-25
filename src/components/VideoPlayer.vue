<template>
    <div id="video-container">
        <video :key="video" ref="video" width="1280" height="720" @timeupdate="updateProgressBar">
            <source :src="video" type="video/mp4">
        </video>
        <div id="video-overlay">
            <div id="video-controls">
                <div v-if="paused">
                    <button class="control-button" id="play" @click="togglePause()">
                        <ion-icon name="play"></ion-icon>
                    </button>
                </div>
                <div v-else>
                    <button class="control-button" id="pause" @click="togglePause()">
                        <ion-icon name="pause"></ion-icon>
                    </button>
                </div>
                <button class="control-button" id="fullscreen" @click="toggleFullscreen()">
                    <ion-icon name="expand"></ion-icon>
                </button>
            </div>
            <div id="timestamp-container">
                <p id="current-timestamp">{{ currentTimestamp() }}</p>
                <p id="duration-timestamp">{{ durationTimestamp() }}</p>
            </div>
            <div id="progress-container" @click="seekOnProgressBar">
                <div id="progress-bar" :style="`width: ${progressBarWidth}`"></div>
            </div>
        </div>
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
                progressBarWidth: "0%"
            };
        },
        computed: {
            video () {
                return `${process.env.VUE_APP_SERVER_DOMAIN}/shows/${this.showId}?ep=${this.episodeId}`;
            }
        },
        methods: {
            togglePause () {

                this.paused = !this.paused;
                
                if (this.paused) {
                    this.$refs.video.pause();
                } else {
                    this.$refs.video.play();
                }

            },
            toggleFullscreen () {
                this.$refs.video.requestFullscreen();
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
                this.updateProgressBar();
            },
            currentTimestamp () {
                return this.$refs?.video ? formatTime(this.$refs.video.currentTime) : "0:00";
            },
            durationTimestamp () {
                return this.$refs?.video ? formatTime(this.$refs.video.duration) : "0:00";
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

        }
    }
</script>

<style scoped>

    #video-container {
        position: relative;
        width: 1280px;
        height: 720px;
    }

    #video-container video {
        position: absolute;
        top: 0;
        left: 0;
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

    #video-controls {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .control-button {
        border: 0;
        background-color: #57acf7;
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
        height: 10px;
        width: 100%;
        background-color: rgba(0, 0, 0, .3);
        position: relative;
    }

    #progress-bar {
        height: 100%;
        background-color: #fff;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        transition: .3s width ease-out;
    }

    #timestamp-container {
        margin: 10px;
        margin-top: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #timestamp-container p {
        font-size: 20px;
        margin: 0;
    }

</style>