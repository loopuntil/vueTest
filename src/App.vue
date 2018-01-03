<template>
  <div id="app">
    <!--
    <img src="./assets/logo.png">
    -->
    <!--router-view ，顧名思義就是透過router產生view在這個標籤，實際上也是-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
