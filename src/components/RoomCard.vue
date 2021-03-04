<template>
    <div class="container">
        <h3 class="room-title">{{ room.name }}</h3>
        <router-link
            :to="`/rooms/${ room.id }`"
        >
            <a class="room-button"><ion-icon name="open-outline" /></a>
        </router-link>
    </div>
</template>

<script>

    export default {
        name: "RoomCard",
        props: [ "room" ]
    }

</script>

<style scoped>

    .container {
        background-color: #333142;
        width: 600px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 10px;
        margin-bottom: 10px;
    }

    .room-title {
        margin-left: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .room-button {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>