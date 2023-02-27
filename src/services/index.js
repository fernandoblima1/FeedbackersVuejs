import axios from 'axios'
import AuthService from './auth'
import UsersService from './users'
import FeedbacksService from './feedbacks'
import router from '../router/index'
import { setGlobalLoading } from '../store/global'

const APT_ENVS = {
    production: 'https://backend-treinamento-vue3.vercel.app',
    development: '',
    local: 'http://localhost:3000'
}

const httpClient = axios.create({
    baseURL: APT_ENVS.production
})

httpClient.interceptors.request.use((config) => {
    setGlobalLoading(true)
    const token = window.localStorage.getItem('token')
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  
    return config
  }, (error) => {
    return Promise.reject(error)
  })
  
  httpClient.interceptors.response.use((response) => {
    setGlobalLoading(false)
    return response
  }, (error) => {
    const canThrowAnError = error.status === 0 || error.status === 500 // error.request.status === 0 || error.request.status === 500;
  
    if (canThrowAnError) {
      setGlobalLoading(false)
      throw new Error(error.message)
    }
  
    if (error.status === 401) {
      router.push({ name: 'home'})
    }
    setGlobalLoading(false)
    return error
  })
export default {
    auth: AuthService(httpClient),
    users: UsersService(httpClient),
    feedbacks: FeedbacksService(httpClient)
}