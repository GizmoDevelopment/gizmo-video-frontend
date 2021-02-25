<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

  export default {
    name: "App",
  }

</script>

<style>

  body {
    background: #16151D;
  }

  #app, body {
    margin: 0;
  }

  #app, button {
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
