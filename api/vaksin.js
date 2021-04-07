import { db } from '../lib/firebase'

function isSourceDefined (doc) {
  return typeof doc.source === 'string' && doc.source.length
}

function convertToJSON (documentSnapshot) {
  const data = documentSnapshot.data()
  return {
    ...data,
    published_at: data.published_at.toDate(),
    id: documentSnapshot.id
  }
}

export async function get () {
  const snapshots = await db
    .collection('vaccination_content')
    .orderBy('order', 'ASC')
    .get()

  if (snapshots.empty) {
    return []
  }
  return snapshots
    .docs
    /**
     * Convert FirebaseFirestore.DocumentSnapshot to POJO
     */
    .map(convertToJSON)
    /**
     * Only shows document whose source is not nil or empty
     */
    .filter(isSourceDefined)
}
