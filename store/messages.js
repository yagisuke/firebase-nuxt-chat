import firebase, { CollectionRef } from '~/plugins/firebase'

export const state = () => ({
  items: []
})

export const mutations = {
  set(state, messages) {
    state.items = messages
  },
  add(state, message) {
    state.items.push(message)
  }
}

export const getters = {}

export const actions = {
  async set(context) {
    return await CollectionRef.orderBy('createdAt').get()
      .then((snapshot) => {
        let messages = []
        snapshot.forEach((doc) => {
          messages.push(doc.data().message)
        })
        context.commit('set', messages)
      })
  },
  async add(context, { message }) {
    return await CollectionRef.add({
        message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        context.commit('add', message)
      })
  },
}
