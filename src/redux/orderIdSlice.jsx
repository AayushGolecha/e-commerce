import { createSlice } from '@reduxjs/toolkit'

export const orderIdSlice = createSlice({
    name: 'Id',
    initialState: {
        value: 100000,
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
    },
})
export const { increment } = orderIdSlice.actions
export default orderIdSlice.reducer