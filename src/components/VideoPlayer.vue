<template>
    <div class="video-container">
        <video controls :key="video">
            <source :src="video" type="video/mp4">
        </video>
    </div>
</template>

<script>
    export default {
        name: "VideoPlayer",
        props: [ "showId", "episodeId" ],
        computed: {
            video () {
                return `${process.env.SERVER_DOMAIN}/shows/${this.showId}?ep=${this.episodeId}`;
            }
        }
    }
</script>

<style scoped>

</style>