import firebase, { CollectionRef } from '~/plugins/firebase'

export const state = () => ({
  items: []
})

export const mutations = {
  add(state, message) {
    state.items.push(message)
  }
}

export const getters = {}

export const actions = {
  listen(context) {
    return CollectionRef.orderBy('createdAt').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          context.commit('add', change.doc.data().message)
        }
      })
    })
  },
  async add(context, { message }) {
    return await CollectionRef.add({
        message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  }
}
