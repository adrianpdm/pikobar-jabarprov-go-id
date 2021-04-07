import * as firebaseAdmin from 'firebase-admin'

const SDK_CREDENTIAL = JSON.parse(process.env.FIREBASE_SDK_CONFIG);
let ADMIN_CREDENTIAL = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);
ADMIN_CREDENTIAL = {
  ...ADMIN_CREDENTIAL,
  private_key: ADMIN_CREDENTIAL.private_key.replace(/\\n/g, '\n'),
};

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
