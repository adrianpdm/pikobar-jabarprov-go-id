import * as firebaseAdmin from 'firebase-admin'

const ADMIN_CREDENTIAL = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);
const SDK_CREDENTIAL = JSON.parse(process.env.FIREBASE_SDK_CONFIG);

const admin = firebaseAdmin.default || firebaseAdmin
const appConfig = {
  credential: admin.credential.cert(ADMIN_CREDENTIAL),
  databaseURL: SDK_CREDENTIAL.databaseURL
}
let _app
if (!admin.apps.length) {
  _app = admin.initializeApp(appConfig)
}
const app = _app
const db = admin.firestore()
const storage = admin.storage()
const { Timestamp, GeoPoint, FieldValue } = admin.firestore
const messaging = null
export {
  app,
  db,
  storage,
  messaging,
  Timestamp,
  GeoPoint,
  FieldValue
}
