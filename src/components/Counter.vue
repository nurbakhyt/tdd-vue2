<template>
  <div>
    <span
      class="count"
      v-text="count"
    />

    <button @click="count++">Increment</button>
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
