<template>
    <div id="chat-container">
        <div id="message-container">
            <div class="chat-message" v-for="message in messages" :key="message.id">
                <ChatMessage
                    :message="message"
                />
            </div>
        </div>
        <div id="message-input-container">
            <input
                ref="messageInput"
                id="message-input"
                type="text"
                placeholder="Send a message..."
                :disabled="!allowMessageSending"
                @keydown.enter.prevent="sendMessage"
                @keydown="resizeInput"
                @change="resizeInput"
                @blur="resizeInput"
                :style="`width: ${ inputWidth }px;`"
            >
        </div>
    </div>
</template>

<script>

    // Components
    import ChatMessage from "./ChatMessage";
    
    export default {
        name: "RoomChat",
        props: [ "messages" ],
        components: {
            ChatMessage
        },
        data () {
            return {
                allowMessageSending: true,
                inputWidth: 200
            };
        },
        methods: {
            sendMessage () {

                const
                    { messageInput } = this.$refs,
                    messageContent = messageInput.value;

                if (this.$store.state.room && messageContent.trim().length > 0) {

                    this.allowMessageSending = false
                    messageInput.blur();
                    messageInput.value = "";

                    this.$socket.emit("client:send_message", {
                        roomId: this.$store.state.room.id,
                        content: messageContent.slice(0, 400)
                    }, ({ type, message }) => {
                        if (type === "success") {
                            this.allowMessageSending = true;
                        } else {
                            console.error(message);
                        }
                    });
                }
            },
            resizeInput ({ target }) {
                if (target.value.length > 20) {
                    this.inputWidth = 200 + ((target.value.length - 20) * 8);
                } else {
                    this.inputWidth = 200;
                }
            }
        }
    }

</script>

<style scoped>

    #chat-container {
        position: fixed;
        right: 0;
        bottom: 0;
        width: 400px;
        height: 600px;
        margin-bottom: 10px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
    }

    #message-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        flex: 1;
        overflow-y: hidden;
    }

    .chat-message {
        margin-bottom: 10px;
        width: 100%;
    }

    #message-input-container {
        height: 50px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    #message-input {
        font-size: 15px;
        transition: .15s width linear;
        position: absolute;
    }

</style>