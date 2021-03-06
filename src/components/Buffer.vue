<template>
    <h2 class="buffer">{{ getRandomEmoticon() }}</h2>
</template>

<script>

    export default {
        name: "Buffer",
        methods: {
            getRandomEmoticon () {
                
                const emoticons = [
                    ":p",
                    ":3",
                    "x3",
                    ":D",
                    ":s"
                ];

                return emoticons[Math.floor(Math.random() * emoticons.length)] || ":p";
            }
        }
    }

</script>

<style scoped>

    .buffer {
        animation: 1s linear rotate infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

</style>