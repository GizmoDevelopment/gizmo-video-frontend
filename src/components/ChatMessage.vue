<template>
    <transition name="fade">
        <div class="message-container" v-if="visible">
            <img class="message-author-avatar" :src="message.author.avatar" draggable="false">
            <div class="message-content">
                <p class="message-text">{{ message.content }}</p>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: "ChatMessage",
        props: [ "message" ],
        data () {
            return {
                visible: true
            };
        },
        computed: {
            activeTime () {
                
                const { content } = this.message;

                return content.length > 50
                    ? content.length * 80
                    : 7000;
            }
        },
        mounted () {
            setTimeout(() => {
                this.visible = false;
            }, this.activeTime);
        }
    }

</script>

<style scoped>

    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .message-container {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-start;
        align-items: center;
    }

    .message-content {
        position: relative;
        background-color: var(--container-background-color);
        border-radius: 10px;
        padding: 6px;
        padding-right: 10px;
        padding-left: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        margin-right: 15px;
        height: 100%;
        max-width: 100%;
    }

    .message-content:before {
        content: "";
        position: absolute;
        right: -5px;
        width: 0;
        height: 0;
        top: calc(50% - 15px);
        border: 15px solid transparent;
        border-left-color: var(--container-background-color);
        border-right: 0;
    }

    .message-author-avatar {
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }

    .message-text {
        font-size: 15px;
        text-align: left;
        margin: 0;
        word-wrap: break-word;
        word-break: break-all;
    }

</style>