<template>
    <div class="container">
        <h3 class="show-title">{{ show.title }}</h3>
        <router-link
            :to="`/shows/${ show.id }`"
        >
            <a class="show-button"><ion-icon name="open-outline" /></a>
        </router-link>
    </div>
</template>

<script>
    
    export default {
        name: "ShowCard",
        props: [ "show" ]   
    }

</script>

<style scoped>

    .container {
        background-color: var(--container-background-color);
        width: 600px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    .show-title {
        margin-left: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .show-button {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>