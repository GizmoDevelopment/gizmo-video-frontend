<template>
  <div id="app" v-if="connected">
    <router-view />
  </div>
  <div v-else>
    <h1 align="center">{{ response }}</h1>
  </div>
</template>

<script>

  export default {
    name: "App",
    data () {
      return {
        connected: false,
        response: "Connecting..."
      };
    },
    sockets: {
      response (data) {
        console.error(data);
        this.response = data;
      },
      disconnect () {
        this.connected = false;
      }
    },
    mounted () {

      this.sockets.subscribe("auth:success", user => {
        this.$store.commit("UPDATE_USER", user);
        this.connected = true;
      });

      const token = this.$cookies.get("gizmoUserKey");

      if (token) {

        this.$socket.emit("auth", { token });

      } else {
        console.error("No user token cookie");
      }

    }
  }

</script>

<style>

  body {
    background: #16151D;
  }

  #app, body {
    margin: 0;
  }

  #app, button, h1, h2, h3, p {
    font-family: "Varela Round", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #FFF;
  }

  button {
    background-color: #7922ca;
    transition: .2s background-color ease-out;
    border: 0px;
    padding: 5px;
    border-radius: 10px;
  }

  button:hover {
    background-color: rgba(121, 34, 202, .5);
  }

</style>
