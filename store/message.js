import { CollectionRef } from '~/plugins/firebase'
import { resolve } from 'uri-js';

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
  async add(context, { message }) {
    return await CollectionRef.add({ message })
      .then(() => {
        context.commit('add', message)
      })
      .catch(() => {
        throw new Error('Error writing document.')
      })
  }
}
