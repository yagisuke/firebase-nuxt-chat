import firebase, { CollectionRef } from '~/plugins/firebase'

export const state = () => ({
  items: []
})

export const mutations = {
  add(state, payload) {
    state.items.push({
      message: payload.message,
      uid: payload.uid
    })
  }
}

export const getters = {}

export const actions = {
  listen(context) {
    return CollectionRef.orderBy('createdAt').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const { message, uid } = change.doc.data()
          context.commit('add', { message, uid })
        }
      })
    }, () => {})
  },
  async add(context, { message, uid }) {
    return await CollectionRef.add({
        message,
        uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  }
}
