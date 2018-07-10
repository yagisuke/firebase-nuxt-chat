import { CollectionRef } from '~/plugins/firebase'

export const state = () => ({
  items: []
})

export const mutations = {
  init(state, messages) {
    state.items = messages
  },
  add(state, message) {
    state.items.push(message)
  }
}

export const getters = {}

export const actions = {
  async init(context) {
    return await CollectionRef.get()
      .then((snapshot) => {
        let messages = []
        snapshot.forEach((doc) => {
          messages.push(doc.data().message)
        })
        context.commit('init', messages)
      })
  },
  async add(context, { message }) {
    return await CollectionRef.add({ message })
      .then(() => {
        context.commit('add', message)
      })
  },
}
