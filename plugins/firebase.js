import firebase from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: process.env.APIKEY,
      authDomain: process.env.AUTHDOMAIN,
      databaseURL: process.env.DATABASEURL,
      projectId: process.env.PROJECTID,
      storageBucket: process.env.STORAGEBUCKET,
      messagingSenderId: process.env.MESSAGINGSENDERID
    }
  )
}
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })
export const CollectionRef = db.collection('messages')
export default firebase
