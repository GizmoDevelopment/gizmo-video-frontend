<template>
    <div id="container">
        <div class="user-entry" v-for="user in users" :key="user.id">
            <img :class="isHost(user) ? 'crown' : ''" :src="user.avatar" draggable="false" />
        </div>
    </div>
</template>

<script>

    export default {
        name: "RoomUserList",
        props: [ "host", "users" ],
        methods: {
            isHost (user) {
                return user.id === this.host.id;
            }
        }
    }

</script>

<style scoped>

    #container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .user-entry img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        margin-left: -15px;
    }

    .crown {
        border: 3px solid #716c95;
        clip-path: none !important;
    }

</style>