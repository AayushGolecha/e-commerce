import axios from 'axios'

export const getData = async () => {
    const response = await axios.get('https://6673e38f75872d0e0a942914.mockapi.io/fake')
    return response.data
}

export const getProduct = async (id) => {
    const response = await axios.get(`https://6673e38f75872d0e0a942914.mockapi.io/fake/${id}`)
    return response.data
}

export const postUserData = async ( fullname, email, password) => {
    await axios.post('https://66879c5a0bc7155dc018520b.mockapi.io/user-data', { fullname, email, password})
}

export const getUserData = async () => {
    const response = await axios.get('https://66879c5a0bc7155dc018520b.mockapi.io/user-data')
    return response.data
}

export const postOrdersData = async ( orders) => {
    await axios.post('https://6687aac40bc7155dc01892d8.mockapi.io/Orders-data', { orders })
}