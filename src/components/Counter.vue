<template>
  <div>
    <span
      class="count"
      v-text="count"
    />

    <button
      class="increment"
      @click="count++"
    >Increment</button>

    <button
      v-show="count > 0"
      class="decrement"
      @click="count > 0 && count--"
    >Decrement</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style scoped>

</style>
