<template>
  <div id="app" v-if="connected">
    <router-view />
  </div>
  <div v-else>
    <h1 align="center">Connecting...</h1>
  </div>
</template>

<script>

  export default {
    name: "App",
    data () {
      return {
        connected: false
      };
    },
    mounted () {

      const token = this.$cookies.get("gizmoUserKey");

      if (token) {

        const socket = io(process.env.API_ENDPOINT);

        socket.emit("auth", {
          token
        });

        socket.on("auth:success", () => {
          this.connected = true;
        });

        socket.on("response", data => {
          console.error(data);
        })

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
  }

  button:hover {
    background-color: rgba(121, 34, 202, .5);
  }

</style>
