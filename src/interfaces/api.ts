type method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface ApiParams {
  url: string
  method?: method
  headers?: Record<string, string>
  body?: object
}
