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
            <StretchableInput
                message-input
                placeholder="Send a message..."
                :enabled="allowMessageSending"
                size="16"
                button="paper-plane-outline"
                stretch="true"
                default-width="200"
                max-length="400"
                clear-after-submit="true"
                @submit="sendMessage"
            />
        </div>
    </div>
</template>

<script>

    // Components
    import ChatMessage from "./ChatMessage";
    import StretchableInput from './StretchableInput';
    
    export default {
        name: "RoomChat",
        props: [ "messages" ],
        components: {
            ChatMessage,
            StretchableInput
        },
        data () {
            return {
                allowMessageSending: true
            };
        },
        methods: {
            sendMessage (messageContent) {
                if (this.$store.state.room) {

                    this.allowMessageSending = false

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
        justify-content: center;
        align-items: center;
    }
    
    #message-input-container >>> div {
        width: 100%;
    }

</style>