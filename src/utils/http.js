import axios from 'axios'

// 创建 Axios 实例
const request = axios.create({
  baseURL: '/api', // 设置基本URL
  timeout: 30000, // 设置请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // TODO: 可以在请求前执行一些操作，如添加请求头、处理请求参数等
    return config
  },
  (error) => {
    // 请求错误时的处理逻辑
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // TODO: 处理响应正常的结果（例如处理成功的状态码）
    return Promise.resolve(response?.data)
  },
  (error) => {
    // 响应错误时的处理逻辑
    return Promise.reject(error)
  }
)

export default request
