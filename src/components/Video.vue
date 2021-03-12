<template>
    <div id="video-container" v-if="showId && episodeId">
        <video

            ref="video"
            playsinline

            :src="videoSource"
            :controls="controls"

            @pause="$emit('video-pause')"
            @play="$emit('video-play')"
            @seeked="$emit('video-seek')"

        >
            <!--<track

                default

                label="English"
                kind="subtitles"
                srclang="en"

                :src="subtitlesSource"

            >-->
        </video>
    </div>
</template>

<script>

    export default {
        name: "Video",
        props: [ "showId", "episodeId", "controls" ],
        computed: {
            videoEndpoint () {
                return `${ process.env.VUE_APP_VIDEO_ENDPOINT }/shows/${ this.showId }/episodes/${ this.episodeId }`;
            },
            videoSource () {
                return `${ this.videoEndpoint }/stream`;
            },
            subtitlesSource () {
                return `${ this.videoEndpoint }/subtitles`;
            }
        },
        methods: {
            seekToTimestamp (timestamp) {
                this.$refs.video.currentTime = timestamp;
            },
            play () {
                this.$refs.video.play();
            },
            pause () {
                this.$refs.video.pause();
            },
            getCurrentTime () {
                return this.$refs.video.currentTime;
            },
            getPausedState () {
                return this.$refs.video.paused;
            }
        }
    }

</script>

<style scoped>

    #video-container {
        display: flex;
        width: 1280px;
        height: 720px;
    }

    #video-container video {
        width: 100%;
        height: 100%;
    }

</style>