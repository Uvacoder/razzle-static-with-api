import { createClient, createCache } from '@gerhardsletten/react-fetching-library'

function createMyClient() {
  const cache = createCache(
    (action) => {
      return action.method === 'GET'
    },
    (response) => {
      return new Date().getTime() - response.timestamp < 100000
    }
  )
  const client = createClient({
    cacheProvider: cache,
  })
  return client
}

export default createMyClient
