<template>
  <div id="app">
    <countdown :until="until"/>
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import moment from 'moment';
import Countdown from './components/Countdown.vue';

export default {
  name: 'app',
  components: {
    // HelloWorld,
    Countdown,
  },
  data() {
    return {
      until: moment().add(10, 'seconds'),
    };
  },
};
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
