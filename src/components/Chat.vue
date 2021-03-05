<template>
    <div id="container">
        <div id="user-container">
            <div v-for="user in room.users" :key="user.id" class="chat-user-entry">
                <img class="chat-user-entry-avatar" :src="user.avatar" draggable="false">
                <span class="chat-user-entry-name">{{ user.uid }}</span>
            </div>
        </div>
        <div id="chat-container">

        </div>
    </div>
</template>

<script>

    export default {
        name: "Chat",
        props: [ "room" ]
    }

</script>

<style scoped>

    #container {
        background-color: var(--container-background-color);
        width: 80%;
    }

    #user-container {
        width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .chat-user-entry {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        padding: 5px;
    }

    .chat-user-entry * {
        margin-left: 5px;
    }

    .chat-user-entry-avatar {
        width: 30px;
        height: 30px;
        border-radius: 100%;
    }

    .chat-user-entry-name {
        font-size: 22px;
    }

    #chat-container {
        width: 70%;
        height: 500px;
    }

</style>