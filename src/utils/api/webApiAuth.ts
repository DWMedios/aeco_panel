import WebApi from './webApi'

class WebApiAuth {
  static getAuth() {
    return WebApi.ApisType({ url: '/company', method: 'GET' })
  }

  static getCompanies() {
    return WebApi.ApisType({ url: '/company', method: 'GET' })
  }
}

export default WebApiAuth
