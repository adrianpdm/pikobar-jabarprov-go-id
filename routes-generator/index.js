import {
  slufigyDocumentRoute,
  slugifyArticleRoute,
  slugifyInfographicRoute
} from '../lib/slugify'

async function createQuery(collectionName, timestampKey = 'published_at') {
  const shouldFetchAll = !!process.env.FIREBASE_FETCH_ALL;
  const lastDeployTimestamp = process.env.LAST_DEPLOY;

  console.log({ shouldFetchAll, lastDeployTimestamp });
  
  const firebase = await import('../lib/firebase-server').then(m => m ? m.default || m : null)
  if (!firebase) {
    throw new Error('[firebase-server]: module not found')
  }

  const collection = firebase.db.collection(collectionName);
  if (shouldFetchAll) {
    return collection.get();
  }
  return collection
    .where(timestampKey, '>=', lastDeployTimestamp)
    .get();
}

export default async function () {
  const infographics = await createQuery('infographics', 'published_date').then((docs) => {
    if (!docs.empty) {
      return docs.docs.map((doc) => {
        const data = doc.data()
        return slugifyInfographicRoute(doc.id, data.title)
      })
    }
    return []
  })

  const articles = await createQuery('articles').then((docs) => {
    if (!docs.empty) {
      return docs.docs.map((doc) => {
        const data = doc.data()
        return slugifyArticleRoute(doc.id, data.title)
      })
    }
    return []
  })

  const documents = await createQuery('documents').then((docs) => {
    if (!docs.empty) {
      return docs.docs.map((doc) => {
        const data = doc.data()
        return slufigyDocumentRoute(doc.id, data.title)
      })
    }
    return []
  })

  return [
    ...infographics,
    ...articles,
    ...documents
  ]
}
