import { ApiParams } from '../../interfaces/api'
import { fetchRequest } from './fetch'

class WebApi {
  static ApisType<T>({
    url,
    method = 'POST',
    body = {},
    headers = {},
  }: ApiParams): Promise<T> {
    const options = {
      url,
      method,
      body: method !== 'GET' ? body : undefined,
      headers: headers ? headers : {},
    }

    return fetchRequest<T>(options)
  }
}

export default WebApi
