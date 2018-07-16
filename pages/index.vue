<template>
  <section class="container">
    <div>
      <h1 class="title">Firebase Nuxt Chat!</h1>
      <button v-if="!user.login" @click.prevent="doLogin">Login</button>
      <button v-if="user.login" @click.prevent="doLogout">Logout</button>
      <div v-if="user.login">
        <h2 class="sub-title">This is FORM area!!</h2>
        <p v-if="notification">{{ notification }}</p>
        <form @submit.prevent="onSubmit">
          <div><textarea v-model="input.message" cols='30' rows='10' /></div>
          <button type="submit" :disabled="input.message.length <= 0">Submit</button>
        </form>
      </div>
      <h2 class="sub-title">This is posted messages!!</h2>
      <ul>
        <li v-if="messages.length" v-for="(item, index) in messages" :key="index">
          {{ item.uid }}: {{ item.message }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import firebase from '~/plugins/firebase'
const auth = firebase.auth()

export default {
  data() {
    return {
      notification: '',
      messages: [],
      input: {
        message: ''
      },
      user: {
        uid: 'nobody',
        login: false
      }
    }
  },
  mounted() {
    this.$store.dispatch('messages/listen')
      .then(() => {
        this.messages = this.$store.state.messages.items
      })

    auth.onAuthStateChanged((user) => {
      this.user.login = user ? true : false
      this.user.uid = user ? user.uid : 'nobody'
    })
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('messages/add', {
        message: this.input.message,
        uid: this.user.uid
      })
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
    },
    doLogin() {
      auth.signInAnonymously()
    },
    doLogout() {
      auth.signOut()
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
