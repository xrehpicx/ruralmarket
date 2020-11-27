import axios from 'axios'
import products from './products.json'

const endpoint = window.location.origin + '/api'

export function getProducts() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(products)
        }, 200)
    })
}
export async function login(auth) {
    return (await axios.post(endpoint + '/login', auth)).data
}

export async function signup(auth) {
    return (await axios.post(endpoint + '/signup', auth)).data
}