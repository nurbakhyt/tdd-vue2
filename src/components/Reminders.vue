<template>
  <div>
    <input
      type="text"
      class="new-reminder"
      v-model="newReminder"
    >

    <button @click="add">
      Add Reminder
    </button>

    <ul v-if="reminders.length > 0">
      <li
        v-for="(reminder, idx) in reminders"
        :key="idx"
      >
        {{ reminder }}
        <button
          class="delete"
          @click="remove(reminder)"
        >
          Remove
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Reminders',
  data() {
    return {
      newReminder: '',
      reminders: [],
    };
  },
  methods: {
    add() {
      this.reminders.push(this.newReminder);

      this.newReminder = '';
    },
    remove(item) {
      this.reminders.splice(item, 1);
    },
  },
};
</script>

<style scoped>

</style>
