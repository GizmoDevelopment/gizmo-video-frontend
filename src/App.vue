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
        --background-color: #191a1b;
        --container-background-color: #27292B;
        --primary-color: #511fa1;
        --text-color: #FFF;
    }

    body {
        background: var(--background-color);
    }

    #app, body {
        margin: 0;
    }

    #app, button, h1, h2, h3, p, a, span, input {
        font-family: "Poppins", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var(--text-color);
    }

    button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    button, input {
        background-color: var(--container-background-color);
        transition: .2s background-color ease-in-out;
        border: 0px;
        padding: 5px;
        border-radius: 10px;
        outline: none;
    }

    input:focus, button:hover {
        background-color: var(--primary-color);
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

    ion-icon {
        pointer-events: none;
    }

</style>