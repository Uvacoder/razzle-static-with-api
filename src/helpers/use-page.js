import { useQuery } from '@gerhardsletten/react-fetching-library'
import config from '../config'

function usePage(path) {
  const action = {
    method: 'GET',
    endpoint: `${config.api}?path=${path}`,
  }
  return useQuery(action, true)
}

export default usePage
