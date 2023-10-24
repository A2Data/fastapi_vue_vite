import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 30000,
})

/** 请求拦截 */
request.interceptors.request.use(
  (config) => {
    // TODO 请求前的一些操作
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/** 响应拦截 */
request.interceptors.response.use(
  (response) => {
    // TODO 处理响应正常的结果(200系列状态码)
    return Promise.resolve(response?.data)
  },
  (error) => {
    // TODO 处理响应异常的结果
    return Promise.reject(error)
  }
)

export default request
