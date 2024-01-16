import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://localhost:3600/api',
    headers: {
        'Authorization': localStorage.getItem('token') || ''
    }
})