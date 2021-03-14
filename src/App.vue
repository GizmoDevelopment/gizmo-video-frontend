<template>
    <div id="app" v-if="connected">
        <Header />
        <router-view />
    </div>
    <div v-else>
        <h2 align="center">{{ connectionStatus }}</h2>
    </div>
</template>

<script>

    // Components
    import Header from "./components/Header";

    export default {
        name: "App",
        components: {
            Header
        },
        data () {
            return {
                connected: false,
                connectionStatus: "Connecting..."
            }
        },
        mounted () {
            
            const token = this.$cookies.get("gizmoUserKey");

            if (token) {
                this.$socket.emit("client:authenticate", { token }, ({ type, message }) => {
                    if (type === "success") {
                        this.$store.commit("UPDATE_USER", message);
                        this.connected = true;
                    } else {
                        this.connectionStatus = message;
                    }
                });
            } else {
                this.connectionStatus = "Try logging into the Gizmo website again.";
            }

            Notification.requestPermission().then(result => {
                console.log(result);
            });

        }
    }

</script>

<style>

    /*:root {
        --background-color: #1a161d;
        --container-background-color: #4e3b8b;
        --primary-color: #795bdd;
        --text-color: #FFF;
    }*/

    :root {
        --background-color: #1F242A;
        --container-background-color: #282C35;
        --container-hover-color: #4d546480;
        --primary-color: #8D39FF;
        --primary-hover-color: rgba(141, 57, 255, .5);
        --text-color: #FFF;
    }

    body {
        background: var(--background-color);
    }

    #app, body {
        margin: 0;
    }

    #app, button, h1, h2, h3, p, a, span, input {
        font-family: "Calibri", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var(--text-color);
    }

    button, input {
        transition: .2s background-color ease-in-out;
        border: 0px;
        padding: 5px;
        border-radius: 10px;
        outline: none;
    }

    input {
        background-color: var(--container-background-color);
        padding-left: 10px;
        padding-right: 10px;
    }

    input:focus {
        background-color: var(--container-hover-color);
    }

    button:hover {
        background-color: var(--primary-hover-color);
        cursor: pointer;
    }

    button {
        background-color: var(--primary-color);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding-left: 25px;
        padding-right: 25px;
    }

    a {
        text-decoration: none;
    }

    input {
        text-align: left;
    }

    .faded-text {
        color: rgba(255, 255, 255, .5);
    }

    .no-margin {
        margin: 0;
    }

    ion-icon {
        pointer-events: none;
    }

</style>