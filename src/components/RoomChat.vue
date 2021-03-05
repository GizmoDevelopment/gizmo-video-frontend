<template>
    <div id="chat-container">
        <div id="message-container">

        </div>
    </div>
</template>

<script>
    
    export default {
        name: "RoomChat",
        props: [ "messages" ] 
    }

</script>

<style scoped>

    #chat-container {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 350px;
        height: 500px;
        background-color: var(--container-background-color);
    }

    #message-container {

    }

</style>