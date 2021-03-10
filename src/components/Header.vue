<template>
    <div id="navigation-container-spacer">
        <header>
            <div id="navigation-container">
                <router-link
                    to="/shows"
                >
                    <span class="navigation-label">Shows</span>
                </router-link>
                <router-link
                    to="/rooms"
                >
                    <span class="navigation-label">Rooms</span>
                </router-link>
            </div>
            <div id="user-container" v-if="user">
                <p id="user-name">{{ user.uid }}</p>
                <img id="user-avatar" :src="user.avatar" draggable="false">
            </div>
        </header>
    </div>
</template>

<script>
    
    export default {
        name: "Header",
        computed: {
            user () {
                return this.$store.state.user;
            }
        }
    }

</script>

<style scoped>

    #navigation-container-spacer, header {
        width: 100%;
        height: 50px;
    }

    header {
        position: fixed;
        background-color: var(--primary-color);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        z-index: 5;
    }

    a {
        outline: none;
    }

    .navigation-label {
        position: relative;
        text-decoration: none;
    }

    .navigation-label::after {
        content: "";
        position: absolute;
        background-color: var(--text-color);
        width: 0;
        height: 1px;
        left: 50%;
        bottom: -1px;
        transition: .2s width ease-in-out, .2s left ease-in-out;
    }

    .navigation-label:hover::after {
        width: 100%;
        left: 0;
    }

    #navigation-container {
        margin-left: 10px;
    }

    #navigation-container * {
        margin-right: 10px;
    }

    #navigation-container,
    #user-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    #user-container * {
        margin-right: 10px;
    }

    #user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 100%;
    }

</style>