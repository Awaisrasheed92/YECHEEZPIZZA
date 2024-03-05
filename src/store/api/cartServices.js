import http from './http-common'

const add = (id, data) => {
    return http.post(`cart/add/${id}`,data,{
        headers: {
            'Content-Type': 'application/json',
            'jwt': localStorage.getItem('')
        }
    }
     )
}