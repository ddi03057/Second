//ajax통신 공통정의
import axios from 'axios'

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 300000
})

Axios.interceptors.request.use(
  config => {
    //요청을 보내기 전에 수행할 로직
    return config;
  },
  error => {
      return Promise.reject(error)
  }
)

Axios.interceptors.response.use(
  response => {
    //응답에 대한로직
    const res = response.data;
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


export default Axios
