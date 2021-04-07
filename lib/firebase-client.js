import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/analytics'
import 'firebase/remote-config'

const config = JSON.parse(process.env.FIREBASE_SDK_CONFIG);

if (!firebase.apps.length) {
  firebase.initializeApp(config)
  firebase.firestore().enablePersistence().catch(() => {
    //
  })
}

const db = firebase.firestore()
const storage = firebase.storage()
const analytics = firebase.analytics()
const remoteConfig = firebase.remoteConfig()
remoteConfig.settings = {
  minimumFetchIntervalMillis: process.env.NODE_ENV === 'production' ? 3600000 : 3600
}
remoteConfig.defaultConfig = ({
  fetchTimeoutMillis: 1000 * 60 * 5,
  download_app_url: '#',
  download_app_via_web_enabled: 'false'
})
const { Timestamp, GeoPoint, FieldValue } = firebase.firestore

let _msg = null
if (firebase.messaging.isSupported()) {
  _msg = firebase.messaging()
  _msg.usePublicVapidKey(config.publicVapidKey)
  _msg.onMessage((payload) => {
    console.log({ payload })
  })
}
const messaging = _msg

export {
  db,
  storage,
  analytics,
  messaging,
  remoteConfig,
  Timestamp,
  GeoPoint,
  FieldValue
}
