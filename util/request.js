import axios from 'axios'

export const API_URL = 'http://127.0.0.1:8010'

export const IMAGE_URL = "http://127.0.0.1:8011/img/"

const Request = axios.create({
    baseURL: API_URL
})

Request.interceptors.response.use(res => res.data)

export default Request