<template>
  <div>
    <!-- Viewing the question -->
    <div v-if="! editing">
      <h1 v-text="question.title"/>
      <div
        v-text="question.body"
        class="body"
      />

      <button
        id="edit"
        @click="editing = true"
      >
        Edit
      </button>
    </div>

    <!-- Editing the question -->
    <div v-if="editing">
      <input
        type="text"
        name="title"
        v-model="form.title"
      >
      <textarea
        v-model="form.body"
        name="body"
      />

      <button
        id="cancel"
        @click="cancel"
      >
        Cancel
      </button>

      <button
        id="update"
        @click="update"
      >
        Update
      </button>
    </div>

    <p v-if="feedback">Your question has been updated.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Question',
  props: ['dataQuestion'],
  data() {
    return {
      question: this.dataQuestion,
      form: {
        title: this.dataQuestion.title,
        body: this.dataQuestion.body,
      },
      editing: false,
      feedback: false,
    };
  },
  methods: {
    update() {
      this.question.title = this.form.title;
      this.question.body = this.form.body;

      axios.post('/questions/1', this.form)
        .then(() => {
          // console.log(data);
          this.feedback = true;
        });

      this.editing = false;
    },
    cancel() {
      this.question = this.dataQuestion;
      this.editing = false;
    },
  },
};
</script>

<style>

</style>
