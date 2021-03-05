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

    :root {
        --background-color: #16151D;
        --container-background-color: #333142;
        --primary-color: #555177;
        --text-color: #FFF;
    }

    body {
        background: var(--background-color);
    }

    #app, body {
        margin: 0;
    }

    #app, button, h1, h2, h3, p, a, span, input {
        font-family: "Varela Round", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: var(--text-color);
    }

    button, input {
        background-color: var(--primary-color);
        transition: .2s background-color ease-out;
        border: 0px;
        padding: 5px;
        border-radius: 10px;
        outline: none;
    }

    button:hover {
        background-color: rgba(85, 81, 119, .5);
    }

    a {
        text-decoration: none;
    }

    input {
        text-align: left;
    }

</style>