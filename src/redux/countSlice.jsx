import { createSlice } from '@reduxjs/toolkit'

export const countSlice = createSlice({
    name: 'count',
    initialState: {
        value: 0,
    },
    reducers: {
        add: (state) => {
            state.value += 1
        },
        decrease: (state) => {
            state.value -= 1
        },
        logout: (state) => {
            state.value = 0
        },
        reduce: (state) => {
            const cart = JSON.parse(localStorage.getItem('carts'))
            let totalItems = 0
            if (cart != null) {
                for (let i = 0; i < cart.length; i++) {
                    let item = cart[i]
                    totalItems += item.Quantity
                }
            }
            state.value = totalItems
        },
        pay: (state) => {
            state.value = 0
        }
    },
})
export const { add, decrease, logout, reduce, pay } = countSlice.actions
export default countSlice.reducer