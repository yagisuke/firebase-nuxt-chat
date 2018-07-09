<template>
  <section class="container">
    <div>
      <h1 class="title">Firebase Nuxt Chat!</h1>
      <p v-if="notification">{{ notification }}</p>
      <form @submit.prevent="onSubmit">
        <div><textarea v-model="input.message" cols='30' rows='10' /></div>
        <button type="submit" :disabled="input.message.length <= 0">Submit</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      notification: '',
      input: {
        message: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('message/add', { message: this.input.message })
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
        }, 3000)
      })
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.is-disabled {
}
</style>
