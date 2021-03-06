import Axios from 'axios'

const request = config => {
  const axios = Axios.create({

  baseURL: '',
    timeout: 5000,
  })
  // 拦截请求
  axios.interceptors.request.use(config => {
    return config;
  }, err => {
    return err;
  })

  // 拦截响应
  axios.interceptors.response.use(res => {
    return res.data;
  }, err => {
    return err
  })



  return axios (config)
}



export default request