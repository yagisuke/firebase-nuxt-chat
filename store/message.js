import { messageCollection } from '~/plugins/firebase'

export const state = () => ({
  messages: []
})

export const mutations = {
  add(state, text) {
    state.messages.push(text)
  }
}

export const getters = {}

export const actions = {
  add(context) {
    messageCollection.add({
      message: 'test'
    })
    .then(doc => {
      console.log(`${doc.id} added!`)
      context.commit('add', 'test')
    })
    .catch(e => {
      console.log(e)
    })
  }
}
