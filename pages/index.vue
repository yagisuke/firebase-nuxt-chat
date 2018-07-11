<template>
  <section class="container">
    <div>
      <h1 class="title">Firebase Nuxt Chat!</h1>
      <h2 class="sub-title">This is FORM area!!</h2>
      <p v-if="notification">{{ notification }}</p>
      <form @submit.prevent="onSubmit">
        <div><textarea v-model="input.message" cols='30' rows='10' /></div>
        <button type="submit" :disabled="input.message.length <= 0">Submit</button>
      </form>
      <h2 class="sub-title">This is posted messages!!</h2>
      <ul>
        <li v-if="messages.length" v-for="(message, index) in messages" :key="index">
          {{ message }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      notification: '',
      input: {
        message: ''
      }
    }
  },
  created() {
    this.$store.dispatch('messages/set')
      .then(() => {
        this.messages = this.$store.state.messages.items
      })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('messages/add', { message: this.input.message })
      .then(() => {
        this.notification = '投稿が完了しました.'
        this.input.message = ''
      })
      .catch(() => {
        this.notification = '投稿が失敗しました.'
      })
      .finally(() => {
        setTimeout(() => {
          this.notification = ''
        }, 1000)
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.sub-title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  margin-top: 24px;
  font-weight: 300;
  font-size: 24px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
