import WebApi from './webApi'

class WebApiAeco {
  static getCompany() {
    return WebApi.ApisType({ url: '/company', method: 'GET' })
  }
}

export default WebApiAeco
