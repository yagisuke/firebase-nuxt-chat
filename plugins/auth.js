import firebase from '~/plugins/firebase'

export const authInstance = firebase.auth()

function auth() {
  console.log('start listening auth...')
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      resolve(user || false)
    })
  })
}

export default auth
