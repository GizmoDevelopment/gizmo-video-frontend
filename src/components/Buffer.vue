<template>
    <h2 class="buffer">XD</h2>
</template>

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